import instance from "../axiosInstance.ts"

export async function getEpisodesList(page: number) {
  let episodes = null

  try {
    const results = await instance.get(`episode?page=${page}`)

    episodes = await results.data
  } catch {
    episodes = null
  }

  return episodes
}

export async function getEpisode(episodeId: string) {
  const response = await instance.get(`episode/${episodeId}`)

  return response.data
}
