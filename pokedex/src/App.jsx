import { React, useState, useEffect } from 'react';
import axios from 'axios';

import PokemonCard from './components/PokemonCard';

const App = () => {
  const [pokedex, setPokedex] = useState([]);
  // const [searchHistory, setSearchHistory] = useState([]);

  useEffect(() => {
    axios
      .get('https://pokeapi.co/api/v2/pokemon/?limit=100')
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

  const handleSearch = (event) => {
    if (event.target.value.length === 0) {
      setPokedex(pokedex.map((pokemon) => {
        const newPokemon = {
          ...pokemon,
          show: true,
        };

        return newPokemon;
      }));
    } else {
      const searchEntry = event.target.value;
  
      setPokedex(pokedex.map((pokemon) => {
        const newPokemon = {
          ...pokemon,
          owned: true || pokemon.name.indexOf(searchEntry.toLowerCase()) !== -1,
        };
  
        return newPokemon;
      }));
    }
  };

  const pokedexToShow = pokedex.filter((pokemon) => pokemon.owned === true);

  return (
    <div>    
      <input type='text' onChange={handleSearch}/>
      <h1>Pokemon Owned</h1>
      {pokedexToShow.map((pokemon) => (
        <div key={pokemon.id}>
          <PokemonCard card={pokemon} />
        </div>
      ))}
    </div>
  );
};

export default App;
