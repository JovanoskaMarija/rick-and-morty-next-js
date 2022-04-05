import { GetServerSideProps } from "next/types"
import CharacterDetails from "../../components/Characters/CharacterDetails"
import { ICharacterDetail } from "../api/character/type"
import { getCharacter } from "../api/character"

interface ICharacter {
  character: ICharacterDetail
}

function CharacterDetailsPage({ character }: ICharacter) {
  return (
    <div>
      <CharacterDetails character={character} />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { characterId } = context.query
  const response = await getCharacter(characterId as string)

  return {
    props: {
      character: response,
    },
  }
}

export default CharacterDetailsPage
