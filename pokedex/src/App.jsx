import { React, useState, useEffect } from 'react';
import axios from 'axios';

import PokemonCard from './components/PokemonCard';
import SearchBar from './components/SearchBar';

const App = () => {
  const [pokedex, setPokedex] = useState([]);

  useEffect(() => {
    axios
      .get('https://pokeapi.co/api/v2/pokemon/?limit=10000')
      .then((response) => {
        const pokemons = response.data.results.filter(
          (pokemon) => pokemon.name.indexOf('-') === -1
        );

        setPokedex(
          pokemons.map((pokemon, index) => {
            const card = {
              id: index,
              name: pokemon.name,
              url: pokemon.url,
              form: `https://img.pokemondb.net/artwork/${pokemon.name}.jpg`,
              owned: false,
            };

            return card;
          })
        );
      });
  }, []);

  const pokedexToShow = pokedex.filter((pokemon) => pokemon.owned === true);

  return (
    <div>    
      <SearchBar pokedex={pokedex} />
      <h1 className="text-center">Pokemon Owned</h1>
      {pokedexToShow.map((pokemon) => (
        <div key={pokemon.id}>
          <PokemonCard card={pokemon} />
        </div>
      ))}
    </div>
  );
};

export default App;
