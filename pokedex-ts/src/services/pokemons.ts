import axios from 'axios';

const baseUrl = '/api/pokemons';

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
  const request = axios.get(`/pokemons/query?name=${encodeURIComponent(name)}`);
  const response = await request;
  return response.data;
}

const pokemonService = {
  getAll,
  getPokemon,
  update,
  queryName,
};

export default pokemonService;
