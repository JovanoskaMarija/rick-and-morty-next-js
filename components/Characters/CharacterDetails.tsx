import { ICharacterDetail } from "../../pages/api/character/type"
import { useRouter } from "next/router"

interface IDetails {
  character: ICharacterDetail
}

function CharacterDetails({ character }: IDetails) {
  const router = useRouter()

  function handleBackBtnCLick() {
    router.push("/")
  }

  function handleLocationClick() {
    const locationURL = character.location.url.replace(
      "https://rickandmortyapi.com/api",
      ""
    )
    router.push(locationURL)
  }

  function handleEpisodeClick(id: string) {
    router.push("/episode/" + id)
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
      <div className="flex flex-row justify-center m-8 md:m-auto lg:m-auto md:flex-row lg:flex-row align-center">
        <div className="self-center">
          <img
            src={character?.image}
            alt={`${character?.name}`}
            className="w-full m-auto rounded-xl"
          />
        </div>
        <div className="flex flex-col justify-center ml-1 md:ml-4 lg:ml-4 align-center">
          <span className="mb-4 text-2xl font-bold text-slate-50">
            {character?.name}
          </span>
          <div>
            <div className="flex flex-col md:flex-row lg:flex-row items-baseline mb-0.5 text-base text-slate-50">
              <span className="italic text-gray-300 ">Gender </span>
              <span className="ml-2 font-medium text-slate-50">
                {character?.gender} ({character?.status})
              </span>
            </div>

            <div className="flex flex-col md:flex-row lg:flex-row items-baseline mb-0.5 text-base text-slate-50">
              <span className="italic text-gray-300">Species </span>
              <span className="ml-2 font-medium text-slate-50">
                {character?.species}
              </span>
            </div>

            <div className="flex flex-col md:flex-row lg:flex-row items-baseline mb-0.5 text-base text-slate-50">
              <span className="italic text-gray-300">Created at </span>
              <span className="ml-2 font-medium text-slate-50">
                {new Date(character?.created).toLocaleString()}
              </span>
            </div>

            <div className="flex flex-col md:flex-row lg:flex-row items-baseline mb-0.5 text-base text-slate-50">
              <span className="italic text-gray-300">Last location </span>
              <button
                onClick={handleLocationClick}
                className="p-button-text p-button-plain"
              >
                <span className="ml-2 font-medium text-slate-50">
                  {character?.location?.name}
                </span>
              </button>
            </div>

            {character.episode.length > 0 && (
              <div className="flex flex-wrap justify-start mr-2 text-slate-50 w-96">
                <span className="italic text-gray-300 ">
                  Episodes ({character?.episode.length}){" "}
                </span>
                {character.episode.map((episode, index) => {
                  const episodeId = episode.replace(
                    "https://rickandmortyapi.com/api/episode/",
                    ""
                  )

                  return (
                    <button
                      key={index}
                      onClick={() => handleEpisodeClick(episodeId)}
                      className="w-28"
                    >
                      <span className="m-2 font-medium">
                        Episode {episodeId}
                      </span>
                    </button>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default CharacterDetails
