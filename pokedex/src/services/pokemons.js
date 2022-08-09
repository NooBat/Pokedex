import axios from 'axios';

const baseUrl = '/api/pokemons';

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const getPokemon = (id) => {
  const request = axios.get(`${baseUrl}/${id}`);
  return request.then((response) => response.data);
};

const update = (id, newPokemon) => {
  const request = axios.put(`${baseUrl}/${id}`, newPokemon);
  return request.then((response) => response.data);
};

export default {
  getAll,
  getPokemon,
  update,
};
