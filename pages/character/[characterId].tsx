import { GetServerSideProps } from "next/types";
import instance from "../../api/instance";
import CharacterDetails from "../../components/Characters/CharacterDetails";

function CharacterDetailsPage(props: any) {
  return (
    <div>
      <CharacterDetails character={props.character} />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { characterId } = context.query;
  const response = await instance.get(`character/${characterId}`);
  const data = await response.data;

  return {
    props: {
      character: data,
    },
  };
};

export default CharacterDetailsPage;
