import { GetServerSideProps } from "next/types"
import EpisodeDetails from "../../components/Episodes/EpisodeDetails"
import { getEpisode } from "../api/episode"
import { IEpisode } from "../api/episode/type"

interface IEpisodeDetail {
  episode: IEpisode
}

function EpisodeDetailsPage({ episode }: IEpisodeDetail) {
  return (
    <div>
      <EpisodeDetails episode={episode} />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { episodeId } = context.query
  const response = await getEpisode(episodeId as string)

  return {
    props: {
      episode: response,
    },
  }
}

export default EpisodeDetailsPage
