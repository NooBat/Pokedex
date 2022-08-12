import { useState, useEffect, useContext } from 'react';

import LoadingPage from './LoadingPage';
import TabComponent from '../components/TabComponent';
import { Context } from '../contexts/Context';
import pokemonService from '../services/pokemons';

interface Move {
  id: number,
  name: string,
  level: number,
}

interface Stats {
  hp: number,
  attack: number,
  defense: number,
  special_attack: number,
  special_defense: number,
  speed: number,
}

interface Pokemon {
  id: number,
  name: string,
  form: string,
  owned: boolean,
  types: string[],
  baseExp: number,
  height: string,
  weight: string,
  moves: Move[],
  stats: Stats,
}

interface PokemonPageProp {
  id: number,
  handleClickOwned: (clickedPokemon: Pokemon) => void,
}

const PokemonPage = ({ id, handleClickOwned }: PokemonPageProp) => {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [owned, setOwned] = useState<boolean>(false);
  const colorHash = useContext(Context);

  useEffect(() => {
    pokemonService.getPokemon(id).then((response) => {
      setPokemon(response);
      setOwned(response.owned);
    });
  }, [id]);

  return pokemon ? (
    <section className='pt-[15vh] w-screen h-screen '>
      <h1 className='text-center text-[6vh] font-bold'>
        {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
      </h1>

      <div className='flex justify-center gap-x-[5vw]'>
        <img
          src={pokemon.form}
          alt={`form of ${pokemon.name}`}
          className='w-auto rounded-xl max-h-[200px] transition-all shadow-2xl hover:scale-[1.1] delay-75 ease-in-out'
        />
        <div className='flex flex-col place-content-center gap-y-[2vh]'>
          <div className='flex flex-row gap-x-[2vw]'>
            {pokemon.types.map((type: string) => (
              <p
                key={pokemon.name + type}
                className='text-[2vh] px-2 rounded-full border-[0.5vh] border-black border-solid shadow-xl transition-all hover:scale-[1.2] delay-75 ease-in-out'
                style={{
                  backgroundColor: colorHash[type].bg_color,
                  color: colorHash[type].text_color
                }}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </p>
            ))}
          </div>
          <table>
            <tbody>
              <tr className='hover:scale-[1.2] ease-in-out transition-all'>
                <th className='text-right font-bold pr-[2vw]'>
                  Base Experience
                </th>
                <td className='text-center'>{pokemon.baseExp}</td>
              </tr>
              <tr className='hover:scale-[1.2] ease-in-out transition-all'>
                <th className='text-right font-bold pr-[2vw]'>Height</th>
                <td className='text-center'>{pokemon.height}</td>
              </tr>
              <tr className='hover:scale-[1.2] ease-in-out transition-all'>
                <th className='text-right font-bold pr-[2vw]'>Weight</th>
                <td className='text-center'>{pokemon.weight}</td>
              </tr>
            </tbody>
          </table>
          <div className='flex flex-col'>
            <button
              type='button'
              onClick={() => {
                setOwned(!owned);
                handleClickOwned(pokemon);
              }}
              className='border-solid border-2 shadow-xl transition-all hover:font-bold hover:text-[25px] hover:scale-125 hover:rounded-lg'
              style={{
                backgroundColor: owned ? 'green' : 'red',
                borderColor: owned ? 'white' : 'black',
                color: owned ? 'black' : 'white'
              }}
            >
              {owned ? 'Owned' : 'Not owned'}
            </button>
          </div>
        </div>
      </div>

      <TabComponent stats={pokemon.stats} moves={pokemon.moves} />
    </section>
  ) : (
    <LoadingPage />
  );
};

export default PokemonPage;
