import axios from 'axios';

const baseUrl = '/api/pokemons';

interface Move {
  id: number,
  name: string,
  level: number,
}

interface Stats {
  hp: number,
  attack: number,
  defense: number,
  special_attack: number,
  special_defense: number,
  speed: number,
}

interface Pokemon {
  id: number,
  name: string,
  form: string,
  owned: boolean,
  types: string[],
  baseExp: number,
  height: string,
  weight: string,
  moves: Move[],
  stats: Stats,
}

const getAll = async () => {
  const request = axios.get<Pokemon[]>(baseUrl);
  const response = await request;
  return response.data;
};

const getPokemon = async (id: number) => {
  const request = axios.get(`${baseUrl}/${id}`);
  const response = await request;
  return response.data;
};

const update = async (id: number, newPokemon: Pokemon) => {
  const request = axios.put(`${baseUrl}/${id}`, newPokemon);
  const response = await request;
  return response.data;
};

const queryName = async (name: string) => {
  const request = axios.get(`${baseUrl}?name=${encodeURIComponent(name)}`);
  const response = await request;
  return response.data;
};

const pokemonService = {
  getAll,
  getPokemon,
  update,
  queryName,
};

export default pokemonService;
