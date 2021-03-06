import { ILocationDetail } from "../../pages/api/location/type"
import { useRouter } from "next/router"

interface IDetails {
  location: ILocationDetail
}

function LocationDetails({ location }: IDetails) {
  const router = useRouter()

  function handleBackBtnCLick() {
    router.push("/location")
  }

  function handleResidentClick(id: string) {
    router.push("/character/" + id)
  }
  return (
    <>
      <button
        onClick={handleBackBtnCLick}
        className="p-2 text-white hover:text-gray-300 focus:text-gray-300 focus:outline-none"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
      </button>
      <div className="flex flex-col justify-center m-8 md:m-auto lg:m-auto align-center md:w-1/2">
        <div>
          <span className="h-16 mb-4 text-2xl font-bold text-slate-50">
            {location.name}
          </span>
          <div>
            <div className="flex flex-col md:flex-row lg:flex-row items-baseline mb-0.5 text-base text-slate-50">
              <span className="italic text-gray-300 ">Type </span>
              <span className="ml-2 font-medium text-slate-50">
                {location.type}
              </span>
            </div>

            <div className="flex flex-col md:flex-row lg:flex-row items-baseline mb-0.5 text-base text-slate-50">
              <span className="italic text-gray-300 ">Dimension </span>
              <span className="ml-2 font-medium text-slate-50">
                {location.dimension}
              </span>
            </div>

            <div className="flex flex-col md:flex-row lg:flex-row items-baseline mb-0.5 text-base text-slate-50">
              <span className="italic text-gray-300 ">Created </span>
              <span className="ml-2 font-medium text-slate-50">
                {new Date(location.created).toLocaleString()}
              </span>
            </div>

            {location.residents.length > 0 && (
              <div className="flex flex-col md:flex-row lg:flex-row items-baseline mb-0.5 text-base text-slate-50">
                <span className="italic text-gray-300 ">
                  Residents ({location?.residents.length})
                </span>
                <div className="flex flex-wrap justify-start ml-2 text-slate-50">
                  {location.residents.map((resident, index) => {
                    const residentId = resident.replace(
                      "https://rickandmortyapi.com/api/character/",
                      ""
                    )

                    return (
                      <button
                        key={index}
                        onClick={() => handleResidentClick(residentId)}
                        className="w-28"
                      >
                        <span className="m-2 font-medium ">
                          Resident {residentId}
                        </span>
                      </button>
                    )
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default LocationDetails
