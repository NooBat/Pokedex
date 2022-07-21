import { React, useState, useEffect } from 'react';
import axios from 'axios';

import PokemonCard from './components/PokemonCard';

const App = () => {
  const [pokedex, setPokedex] = useState([]);
  const [searchHistory, setSearchHistory] = useState([]);

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
            };

            return card;
          })
        );
      });
  }, []);

  const handleSearch = (event) => {
    const searchEntry = event.target.value;

    setPokedex
  };

  return (
    <div>    
      <input type='text' onChange={handleSearch}/>
      {pokedex.map((pokemon) => (
        <div key={pokemon.id}>
          <PokemonCard card={pokemon} />
        </div>
      ))}
    </div>
  );
};

export default App;
