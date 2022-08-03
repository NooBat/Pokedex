import { React } from 'react';

import PokemonBar from '../components/PokemonBar';

const MainPage = ({ pokemonToShow }) => (
  <div className='pt-[15vh] w-full h-fit pb-[5vh]'>
    <h1 className='text-center mx-auto mb-[5vh] font-bold font-merriweather text-6xl'>
      Pokémon Owned
    </h1>
    {pokemonToShow.map((pokemon) => (
      <PokemonBar key={pokemon.id} pokemon={pokemon} />
    ))}
  </div>
);

export default MainPage;
