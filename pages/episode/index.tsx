import type { GetServerSideProps } from "next"
import Card from "../../components/Episodes/EpisodeCard"
import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/router"
import { IEpisode, IEpisodesData } from "../api/episode/type"
import { getEpisodesList } from "../api/episode"

interface IList {
  data: IEpisodesData
}

function Episodes({ data }: IList) {
  const router = useRouter()
  const [episodes, setEpisodes] = useState<IEpisode[] | []>([])
  const [newEpisodes, setNewEpisodes] = useState<IEpisode[] | []>([])
  const [error, setError] = useState<string>("")

  const [page, setPage] = useState<number>(
    router.query.page ? parseInt(router.query.page as string) : 1
  )
  const [lastPage, setLastPage] = useState<number | null>(null)
  const [lastElement, setLastElement] = useState<HTMLDivElement | null>(null)

  const observer = useRef<IntersectionObserver>()

  useEffect(() => {
    observer.current = new IntersectionObserver((entries) => {
      const first = entries[0]
      if (first.isIntersecting) {
        const nextPage = page + 1
        setPage(nextPage)
        router.push(
          {
            pathname: "/episode",
            query: { page: nextPage },
          },
          undefined,
          { scroll: false }
        )
      }
    })
  }, [page, router])

  useEffect(() => {
    if (!data) {
      setError("There is nothing here")
    }
    if (data) {
      setLastPage(data.info.pages)
      setNewEpisodes(data.results)
    }
  }, [data])

  useEffect(() => {
    const currentElement = lastElement
    const currentObserver = observer.current

    if (currentElement) {
      currentObserver?.observe(currentElement)
    }

    return () => {
      if (currentElement) {
        currentObserver?.unobserve(currentElement)
      }
    }
  }, [lastElement])

  useEffect(() => {
    if (newEpisodes.length) {
      const newLocationsData = [...episodes, ...newEpisodes]

      setEpisodes(newLocationsData)
      setNewEpisodes([])
    }
  }, [episodes, newEpisodes])

  if (error) {
    return (
      <div className="px-2 py-8 italic font-medium text-orange-700">
        {error}
      </div>
    )
  }

  return (
    <div className="grid mx-auto 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-col-2 md:justify-center sm:grid-col-1">
      {episodes &&
        episodes.map((episode, i) => {
          return i === episodes.length - 1 && lastPage && page !== lastPage ? (
            <div key={`${episode.id} - ${episode.name}`} ref={setLastElement}>
              <Card episode={episode} />
            </div>
          ) : (
            <div key={`${episode.id} - ${episode.name}`}>
              <Card episode={episode} />
            </div>
          )
        })}
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  let page = 1
  if (context.query.page) {
    page = parseInt(context.query.page as string)
  }

  const results = await getEpisodesList(page)

  return {
    props: {
      data: results,
    },
  }
}

export default Episodes
