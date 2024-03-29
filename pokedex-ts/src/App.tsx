import { useState, useEffect } from 'react';
import { Route, Routes, useMatch } from 'react-router-dom';

import MainPage from './pages/MainPage';
import PokemonPage from './pages/PokemonPage';

import NavBar from './components/NavBar';

import ContextProvider from './contexts/Context';
import Footer from './components/Footer';

import pokemonService from './services/pokemons';

interface Move {
  id: number;
  name: string;
  level: number;
}

interface Stats {
  hp: number;
  attack: number;
  defense: number;
  special_attack: number;
  special_defense: number;
  speed: number;
}

interface Pokemon {
  id: number;
  name: string;
  form: string;
  owned: boolean;
  types: string[];
  baseExp: number;
  height: string;
  weight: string;
  moves: Move[];
  stats: Stats;
}

const App = () => {
  const [ownedPokemons, setOwnedPokemons] = useState<Pokemon[]>([]);
  const match = useMatch('/pokemons/:id');

  useEffect(() => {
    pokemonService.getAll()
      .then((pokemons: Pokemon[]) => {
        if (JSON.stringify(pokemons) !== JSON.stringify(ownedPokemons)) {
          setOwnedPokemons(pokemons);
        }
      });
  }, [ownedPokemons]);

  const handleClickOwned = (clickedPokemon: Pokemon) => {
    const newPokemon: Pokemon = {
      ...clickedPokemon,
      owned: !clickedPokemon.owned,
    };

    pokemonService.update(clickedPokemon.id, newPokemon);

    if (newPokemon.owned) {
      setOwnedPokemons(ownedPokemons.concat(newPokemon));
    } else {
      const newPokemonsArray = [...ownedPokemons];

      setOwnedPokemons(
        newPokemonsArray.splice(
          ownedPokemons.findIndex(
            (pokemon: Pokemon) => pokemon.id === newPokemon.id
          ),
          1
        )
      );
    }
  };

  const id: number = match ? Number(match.params.id) : 0;

  return (
    <ContextProvider>
      <div className='h-screen w-screen'>
        <NavBar />
        <main>
          <Routes>
            <Route
              path='/'
              element={<MainPage ownedPokemon={ownedPokemons} />}
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
