import { React } from 'react';

import PokemonBar from '../components/PokemonBar';

const PokemonList = ({ pokemonToShow }) => (
  <div className="mt-[15vh] w-full h-full">
    <h1 className="text-center mx-auto mb-[5vh] font-bold font-merriweather text-6xl">Pokémon Owned</h1>
    {pokemonToShow.map((pokemon) => (
      <PokemonBar key={pokemon.id} pokemon={pokemon} />
    ))}
  </div>
);

export default PokemonList;
