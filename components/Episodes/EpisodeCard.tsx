import Link from "next/link"
import { IEpisode } from "../../pages/api/episode/type"

interface ICard {
  episode: IEpisode
}

function Card({ episode }: ICard) {
  return (
    <Link
      href={{
        pathname: `/episode/${episode.id}`,
      }}
      passHref
    >
      <a>
        <div className="box-border flex flex-col h-auto p-4 m-4 rounded-lg shadow-lg md:h-52 lg:h-52 justify-evenly md:max-w-xl md:justify-self-center bg-card">
          <div className="block mb-0 text-xl font-bold text-slate-50 min-h-14 md:h-16 lg:h-16 2xl:h-16">
            {episode.name}
          </div>
          <div>
            <div className="flex flex-row items-baseline mb-0.5 text-base">
              <span className="mr-2 text-gray-300">Episode </span>
              <span className="font-medium text-slate-50">
                {episode.episode}
              </span>
            </div>

            <div className="flex flex-row items-baseline mb-0.5 text-base">
              <span className="mr-2 text-gray-300">Air date </span>
              <span className="font-medium text-slate-50">
                {episode.air_date}
              </span>
            </div>

            <div className="flex flex-row items-baseline mb-0.5 text-base">
              <span className="mr-2 text-gray-300">Created at </span>
              <span className="font-medium text-slate-50">
                {new Date(episode.created).toLocaleDateString()}
              </span>
            </div>

            <div className="flex flex-row items-baseline mb-0.5 text-base">
              <span className="mr-2 text-gray-300">Characters </span>
              <span className="font-medium text-slate-50">
                {episode.characters.length}
              </span>
            </div>
          </div>
        </div>
      </a>
    </Link>
  )
}

export default Card
