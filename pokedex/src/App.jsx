import { React, useState, useEffect } from 'react';
import { Route, Routes, useMatch } from 'react-router-dom';

import MainPage from './pages/MainPage';
import PokemonPage from './pages/PokemonPage';

import NavBar from './components/NavBar';

import ContextProvider from './contexts/Context';
import Footer from './components/Footer';

import pokemonService from './services/pokemons';

const App = () => {
  const [ownedPokemon, setOwnedPokemon] = useState([]);
  const match = useMatch('/pokemons/:id');

  useEffect(() => {
    pokemonService.getAll().then((response) => {
      setOwnedPokemon(response);
    });
  });

  const handleClickOwned = (clickedPokemon) => {
    const newPokemon = {
      ...clickedPokemon,
      owned: !clickedPokemon.owned,
    };

    pokemonService.update(clickedPokemon.id, newPokemon);

    if (newPokemon.owned) {
      setOwnedPokemon(ownedPokemon.concat(newPokemon));
    } else {
      const newArray = [...ownedPokemon];

      setOwnedPokemon(
        newArray.splice(
          ownedPokemon.findIndex((pokemon) => pokemon.id === newPokemon.id),
          1
        )
      );
    }
  };

  const id = match ? Number(match.params.id) : null;

  return (
    <ContextProvider>
      <div className='h-screen w-screen'>
        <NavBar />
        <main>
          <Routes>
            <Route
              path='/'
              element={<MainPage pokemonToShow={ownedPokemon} />}
            />
            <Route
              path='/pokemons/:id'
              element={
                <PokemonPage id={id} handleClickOwned={handleClickOwned} />
              }
            />
          </Routes>
        </main>
        <footer>
          <Footer />
        </footer>
      </div>
    </ContextProvider>
  );
};

export default App;
