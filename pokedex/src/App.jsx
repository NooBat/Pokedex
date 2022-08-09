import { React, useState, useEffect } from 'react';
import { Route, Routes, useMatch } from 'react-router-dom';

import MainPage from './pages/MainPage';
import PokemonPage from './pages/PokemonPage';

// import NavBar from './components/NavBar';

import ContextProvider from './contexts/Context';
import Footer from './components/Footer';

import pokemonService from './services/pokemons';

const App = () => {
  const [ownedPokemon, setOwnedPokemon] = useState([]);
  const match = useMatch('/pokemons/:id');

  useEffect(() => {
    // axios
    //   .get('https://pokeapi.co/api/v2/pokemon/?limit=1000')
    //   .then((response) => {
    //     const pokemons = response.data.results.filter(
    //       (pokemon) => pokemon.name.indexOf('-') === -1
    //     );

    //     setPokedex(
    //       pokemons.map((pokemon) => {
    //         const stringId = pokemon.url.slice(34, -1);

    //         const newPokemon = {
    //           id: Number(stringId),
    //           name: pokemon.name,
    //           url: pokemon.url,
    //           form: `https://img.pokemondb.net/artwork/${pokemon.name}.jpg`,
    //           owned:
    //             Boolean(localStorage.getItem(stringId)) &&
    //             JSON.parse(localStorage.getItem(stringId)),
    //         };

    //         localStorage.setItem(
    //           String(newPokemon.id),
    //           String(newPokemon.owned)
    //         );

    //         return newPokemon;
    //       })
    //     );
    //   });
    pokemonService.getAll().then((response) => {
      setOwnedPokemon(response);
    });
  }, []);

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
          ownedPokemon.find((pokemon) => pokemon.id === newPokemon.id),
          1
        )
      );
    }
  };

  const id = match ? Number(match.params.id) : null;

  return (
    <ContextProvider>
      <div className='h-screen w-screen'>
        {/* <NavBar pokedex={id} /> */}
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
