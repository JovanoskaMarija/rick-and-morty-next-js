import type { GetServerSideProps } from "next"
import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/router"
import { ICharacterData, ICharactersData } from "./api/character/type"
import Card from "../components/Characters/CharacterCard"
import { getCharactersList } from "./api/character"

interface IList {
  data: ICharactersData
}

function Home({ data }: IList) {
  const router = useRouter()
  const [characters, setCharacters] = useState<ICharacterData[] | []>([])
  const [newCharacters, setNewCharacters] = useState<ICharacterData[] | []>([])
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
            pathname: "",
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
      setNewCharacters(data.results)
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
    if (newCharacters.length) {
      const newCharactersData = [...characters, ...newCharacters]

      setCharacters(newCharactersData)
      setNewCharacters([])
    }
  }, [characters, newCharacters])

  if (error) {
    return (
      <div className="px-2 py-8 italic font-medium text-orange-700">
        {error}
      </div>
    )
  }

  return (
    <div className="grid mx-auto 2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-2 md:gris-col-1 md:justify-center">
      {characters &&
        characters.map((character, i) => {
          return i === characters.length - 1 && page !== lastPage ? (
            <div
              key={`${character.id} - ${character.name}`}
              ref={setLastElement}
            >
              <Card character={character} />
            </div>
          ) : (
            <div key={`${character.id} - ${character.name}`}>
              <Card character={character} />
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

  const results = await getCharactersList(page)

  return {
    props: {
      data: results,
    },
  }
}

export default Home
