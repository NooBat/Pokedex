import { React, useState, useEffect } from 'react';
import axios from 'axios';
import { Route, Routes, useMatch } from 'react-router-dom';

import LoadingPage from './pages/LoadingPage';
import MainPage from './pages/MainPage';
import PokemonPage from './pages/PokemonPage';

import NavBar from './components/NavBar';

import ContextProvider from './contexts/Context';

const App = () => {
  const [pokedex, setPokedex] = useState([]);
  const match = useMatch('/pokemons/:id');

  useEffect(() => {
    axios
      .get('https://pokeapi.co/api/v2/pokemon/?limit=1000')
      .then((response) => {
        const pokemons = response.data.results.filter(
          (pokemon) => pokemon.name.indexOf('-') === -1
        );

        setPokedex(
          pokemons.map((pokemon) => {
            const stringId = pokemon.url.slice(34, -1);

            const newPokemon = {
              id: Number(stringId),
              name: pokemon.name,
              url: pokemon.url,
              form: `https://img.pokemondb.net/artwork/${pokemon.name}.jpg`,
              owned:
                Boolean(localStorage.getItem(stringId)) &&
                JSON.parse(localStorage.getItem(stringId)),
            };

            localStorage.setItem(
              String(newPokemon.id),
              String(newPokemon.owned)
            );

            return newPokemon;
          })
        );
      });
  }, []);

  const handleClickOwned = (id) => {
    setPokedex(
      pokedex.map((pokemon) =>
        pokemon.id === id ? { ...pokemon, owned: !pokemon.owned } : pokemon
      )
    );
    localStorage.setItem(
      String(id),
      String(!pokedex.find((pokemon) => pokemon.id === id).owned)
    );
  };

  const pokemonToShow = pokedex.filter((pokemon) => pokemon.owned === true);
  const chosenPokemon =
    match && pokedex.length
      ? pokedex.find((pokemon) => pokemon.id === Number(match.params.id))
      : null;

  return (
    <ContextProvider>
      <div className='h-screen w-screen'>
        <NavBar pokedex={pokedex} />
        <Routes>
          <Route path='/' element={<MainPage pokemonToShow={pokemonToShow} />} />
          <Route
            path='/pokemons/:id'
            element={
              chosenPokemon ? (
                <PokemonPage
                  pokemon={chosenPokemon}
                  owned={chosenPokemon.owned}
                  handleClickOwned={handleClickOwned}
                />
              ) : (
                <LoadingPage />
              )
            }
          />
        </Routes>
      </div>
    </ContextProvider>
  );
};

export default App;
