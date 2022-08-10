import { React, useState, useEffect, useContext } from 'react';

import LoadingPage from './LoadingPage';
import TabComponent from '../components/TabComponent';
import { Context } from '../contexts/Context';
import pokemonService from '../services/pokemons';

const PokemonPage = ({ id, handleClickOwned }) => {
  const [pokemon, setPokemon] = useState(null);
  const colorHash = useContext(Context);

  // useEffect(() => {
  //   axios
  //     .get(pokemon.url)
  //     .then((response) => response.data)
  //     .then((data) => {
  //       setFullPokemon({
  //         ...pokemon,
  //         types: data.types.map((slot) => slot.type.name),
  //         baseExp: data.base_experience,
  //         height: `${data.height / 10} m`,
  //         weight: `${data.weight / 10} kg`,
  //         moves: data.moves.map((move, index) => ({
  //           id: index + 1,
  //           name: move.move.name,
  //           level: move.version_group_details[0].level_learned_at,
  //         })),
  //         stats: {
  //           hp: data.stats[0].base_stat,
  //           attack: data.stats[1].base_stat,
  //           defense: data.stats[2].base_stat,
  //           special_attack: data.stats[3].base_stat,
  //           special_defense: data.stats[4].base_stat,
  //           speed: data.stats[5].base_stat,
  //         },
  //       });
  //     });
  // }, [pokemon]);
  useEffect(() => {
    pokemonService
      .getPokemon(id)
      .then((response) => {
        setPokemon(response);
      })
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
            {pokemon.types.map((type) => (
              <p
                key={pokemon.name + type}
                className='text-[2vh] px-2 rounded-full border-[0.5vh] border-black border-solid shadow-xl transition-all hover:scale-[1.2] delay-75 ease-in-out'
                style={{ backgroundColor: colorHash[type].bg_color, color: colorHash[type].text_color }}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </p>
            ))}
          </div>
          <table>
            <tbody>
              <tr className='hover:scale-[1.2] ease-in-out transition-all'>
                <th className='text-right font-bold pr-[2vw]'>Base Experience</th>
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
              onClick={() => handleClickOwned(pokemon)}
              className='border-solid border-2 shadow-xl transition-all hover:font-bold hover:text-[25px] hover:scale-125 hover:rounded-lg'
              style={{
                backgroundColor: pokemon.owned ? 'green' : 'red',
                borderColor: pokemon.owned ? 'white' : 'black',
                color: pokemon.owned ? 'black' : 'white',
              }}
            >
              {pokemon.owned ? 'Owned' : 'Not owned'}
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
