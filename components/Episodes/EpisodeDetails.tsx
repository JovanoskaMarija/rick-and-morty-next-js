import { useRouter } from "next/router"
import { IEpisode } from "../../pages/api/episode/type"

interface IDetails {
  episode: IEpisode
}

function EpisodeDetails({ episode }: IDetails) {
  const router = useRouter()

  function handleBackBtnCLick() {
    router.push("/episode")
  }

  function handleCharacterClick(id: string) {
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
            {episode.name}
          </span>
          <div>
            <div className="flex flex-col md:flex-row lg:flex-row items-baseline mb-0.5 text-base text-slate-50">
              <span className="italic text-gray-300 ">Episode </span>
              <span className="ml-2 font-medium text-slate-50">
                {episode.episode}
              </span>
            </div>

            <div className="flex flex-col md:flex-row lg:flex-row items-baseline mb-0.5 text-base text-slate-50">
              <span className="italic text-gray-300 ">Air date </span>
              <span className="ml-2 font-medium text-slate-50">
                {episode.air_date}
              </span>
            </div>

            <div className="flex flex-col md:flex-row lg:flex-row items-baseline mb-0.5 text-base text-slate-50">
              <span className="italic text-gray-300 ">Created at </span>
              <span className="ml-2 font-medium text-slate-50">
                {new Date(episode.created).toLocaleDateString()}
              </span>
            </div>

            {episode.characters.length > 0 && (
              <div className="flex flex-col md:flex-row lg:flex-row items-baseline mb-0.5 text-base text-slate-50">
                <span className="italic text-gray-300 ">
                  Characters ({episode?.characters.length})
                </span>
                <div className="flex flex-wrap justify-start ml-2 text-slate-50">
                  {episode.characters.map((character, index) => {
                    const characterId = character.replace(
                      "https://rickandmortyapi.com/api/character/",
                      ""
                    )

                    return (
                      <button
                        key={index}
                        onClick={() => handleCharacterClick(characterId)}
                        className="w-28"
                      >
                        <span className="m-2 font-medium">
                          Resident {characterId}
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

export default EpisodeDetails
