import { React, useState, useEffect } from 'react';
import axios from 'axios';
import { Route, Routes, useMatch } from 'react-router-dom';

import LoadingPage from './pages/LoadingPage';
import NavigationBar from './components/NavigationBar';
import PokemonList from './pages/PokemonList';
import PokemonPage from './pages/PokemonPage';

const App = () => {
  const [pokedex, setPokedex] = useState([]);

  const match = useMatch('/pokemons/:id');


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
              id: index + 1,
              name: pokemon.name,
              url: pokemon.url,
              form: `https://img.pokemondb.net/artwork/${pokemon.name}.jpg`,
              owned: true,
            };

            return card;
          })
        );
      });
  }, []);

  const handleClickOwned = (id) => {
    setPokedex(
      pokedex.map((pokemon) =>
        pokemon.id === id ? { ...pokemon, owned: true } : pokemon
      )
    );
  };

  const pokemonToShow = pokedex.filter((pokemon) => pokemon.owned === true);
  const chosenPokemon = match && pokedex.length
    ? pokedex.find((pokemon) => pokemon.id === Number(match.params.id))
    : null;

  return (
    <div className='h-screen w-screen'>
      <NavigationBar pokedex={pokedex} />
      <Routes>
        <Route
          path='/'
          element={<PokemonList pokemonToShow={pokemonToShow} />}
        />
        <Route
          path='/pokemons/:id'
          element={
            chosenPokemon
            ? <PokemonPage
                pokemon={chosenPokemon}
                handleClickOwned={handleClickOwned}
              />
            : <LoadingPage />
          }
        />
      </Routes>
    </div>
  );
};

export default App;
