export interface IEpisodesData {
  results: IEpisode[]
  info: {
    pages: number
    next: string | null
  }
}

export interface IEpisode {
  id: number
  name: string
  air_date: string
  episode: string
  characters: string[]
  url: string
  created: string
}
