import type { GetServerSideProps } from "next"
import Card from "../../components/Locations/LocationCard"
import { useEffect, useRef, useState } from "react"
import { ILocation, ILocationsData } from "../api/location/type"
import { useRouter } from "next/router"
import { getLocationsList } from "../api/location"

interface IList {
  data: ILocationsData
}

function Locations({ data }: IList) {
  const router = useRouter()
  const [locations, setLocations] = useState<ILocation[] | []>([])
  const [newLocations, setNewLocations] = useState<ILocation[] | []>([])
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
            pathname: "/location",
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
      setNewLocations(data.results)
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
    if (newLocations.length) {
      const newLocationsData = [...locations, ...newLocations]

      setLocations(newLocationsData)
      setNewLocations([])
    }
  }, [locations, newLocations])

  if (error) {
    return (
      <div className="px-2 py-8 italic font-medium text-orange-700">
        {error}
      </div>
    )
  }

  return (
    <div className="grid mx-auto 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-col-2 md:justify-center sm:grid-col-1">
      {locations &&
        locations.map((location, i) => {
          return i === locations.length - 1 && lastPage && page !== lastPage ? (
            <div key={`${location.id} - ${location.name}`} ref={setLastElement}>
              <Card location={location} />
            </div>
          ) : (
            <div key={`${location.id} - ${location.name}`}>
              <Card location={location} />
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

  const results = await getLocationsList(page)

  return {
    props: {
      data: results,
    },
  }
}

export default Locations
