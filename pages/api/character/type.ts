export interface ICharactersData {
  results: ICharacterData[];
  info: {
    pages: number;
    next: string | null;
  };
}

export interface ICharacterData {
  created: string;
  episode: string[];
  gender: string;
  id: number;
  image: string;
  location: { name: string; url: string };
  name: string;
  origin: { name: string; url: string };
  species: string;
  status: string;
  type: string;
  url: string;
}

export interface ICharacter {
  id: number;
  name: string;
  image: string;
  gender: string;
  species: string;
  status: string;
  origin: {};
  episodes: number;
}

export interface ICharacterDetail {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
}
