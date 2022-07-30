import { React } from 'react';

const PokemonPage = ({ pokemon, handleClickOwned }) => (
  <button type='button' onClick={() => handleClickOwned(pokemon.id)}>
    Hello {pokemon.name}
  </button>
);

export default PokemonPage;
