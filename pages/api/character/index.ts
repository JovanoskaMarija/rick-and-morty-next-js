import instance from "../axiosInstance.ts"

export async function getCharactersList(page: number) {
  let characters = null

  try {
    const response = await instance.get(`character?page=${page}`)

    characters = {
      info: response.data.info,
      results: response.data.results,
    }
  } catch {
    characters = null
  }

  return characters
}

export async function getCharacter(characterId: string) {
  const response = await instance.get(`character/${characterId}`)

  return response.data
}
