import Image from "next/image"

import { ICharacterData } from "../../pages/api/character/type"
import Link from "next/link"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircle } from "@fortawesome/free-solid-svg-icons"

interface ICard {
  character: ICharacterData
}

function Card({ character }: ICard) {
  function getCharacterStatusColorIcon(status: string) {
    if (status === "Alive") return "green"
    if (status === "Dead") return "red"
    if (status === "unknown") return "yellow"
  }

  const firstEp = character.episode[0].replace(
    "https://rickandmortyapi.com/api/episode/",
    ""
  )

  const lastEp = character.episode[character.episode.length - 1].replace(
    "https://rickandmortyapi.com/api/episode/",
    ""
  )
  return (
    <Link
      href={{
        pathname: `/character/${character.id}`,
      }}
      passHref
    >
      <a>
        <div className="flex flex-col m-4 rounded-r-lg shadow-lg md:flex-row md:max-w-xl md:justify-self-center">
          <div
            className="w-full h-40 md:h-auto lg:h-auto md:w-48 md:rounded-none sm:rounded-none"
            style={{
              position: "relative",
            }}
            title={character.name}
          >
            <Image
              src={character.image}
              alt={`${character.name}`}
              layout="fill"
              objectFit="cover"
              priority
              className="m-2 md:rounded-l h-60 sm:rounded-none"
            />
          </div>
          <div className="flex flex-col justify-between w-full p-4 leading-normal border-b border-l border-r rounded-b md:rounded-none md:rounded-r lg:rounded-none lg:rounded-r bg-card border-card lg:border-l-0 lg:border-t ">
            <div className="mb-2">
              <div className="mb-0 text-xl font-bold text-slate-50 h-14">
                <p>{character.name}</p>
              </div>
              <div className="flex flex-row items-baseline mb-0.5 text-sm text-gray-300">
                <FontAwesomeIcon
                  icon={faCircle}
                  className="w-2.5 mr-2"
                  style={{
                    color: getCharacterStatusColorIcon(character.status),
                  }}
                />
                <span>
                  {character.status} - {character.gender} - {character.species}
                </span>
              </div>
            </div>

            <div className="flex flex-row items-baseline mb-0.5 text-base text-slate-50">
              <span className="mr-2 text-gray-300">First seen in </span>{" "}
              <span className="font-medium text-slate-50">
                Episode {firstEp}
              </span>
            </div>

            <div className="flex flex-row items-baseline mb-0.5 text-base text-slate-50">
              <span className="mr-2 text-gray-300">Last seen in </span>{" "}
              <span className="font-medium text-slate-50">
                Episode {lastEp}
              </span>
            </div>

            <div className="flex flex-row items-baseline h-10 mb-0.5 text-base text-slate-50">
              <span className="mr-2 text-gray-300">Location</span>{" "}
              <span className="font-medium text-slate-50">
                {character.location.name}
              </span>
            </div>
          </div>
        </div>
      </a>
    </Link>
  )
}

export default Card
