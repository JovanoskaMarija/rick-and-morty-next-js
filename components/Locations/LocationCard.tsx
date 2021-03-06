import { ILocation } from "../../pages/api/location/type"
import Link from "next/link"

interface ICard {
  location: ILocation
}

function Card({ location }: ICard) {
  return (
    <Link
      href={{
        pathname: `/location/${location.id}`,
      }}
      passHref
    >
      <a>
        <div className="box-border flex flex-col h-auto p-4 m-4 rounded-lg shadow-lg md:h-52 lg:h-52 justify-evenly md:max-w-xl md:justify-self-center bg-card">
          <div className="block mb-0 text-xl font-bold text-slate-50 min-h-14 md:h-16 lg:h-16 2xl:h-16">
            {location.name}
          </div>
          <div>
            <div className="flex flex-row items-baseline mb-0.5 text-base">
              <span className="mr-2 text-gray-300">Type </span>
              <span className="font-medium text-slate-50">{location.type}</span>
            </div>

            <div className="flex flex-row items-baseline mb-0.5 text-base">
              <span className="mr-2 text-gray-300">Dimension </span>
              <span className="font-medium text-slate-50">
                {location.dimension}
              </span>
            </div>

            <div className="flex flex-row items-baseline mb-0.5 text-base">
              <span className="mr-2 text-gray-300">Residents </span>
              <span className="font-medium text-slate-50">
                {location.residents.length}
              </span>
            </div>

            <div className="flex flex-row items-baseline mb-0.5 text-base">
              <span className="mr-2 text-gray-300">Created at </span>
              <span className="font-medium text-slate-50">
                {new Date(location.created).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
      </a>
    </Link>
  )
}

export default Card
