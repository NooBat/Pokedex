import axios from 'axios';
import { React, useState, useEffect, useContext } from 'react';

import LoadingPage from './LoadingPage';
import TabComponent from '../components/TabComponent';
import { Context } from '../contexts/Context';

const PokemonPage = ({ pokemon, owned, handleClickOwned }) => {
  const [fullPokemon, setFullPokemon] = useState({ ...pokemon });
  const colorHash = useContext(Context);

  useEffect(() => {
    axios
      .get(pokemon.url)
      .then((response) => response.data)
      .then((data) => {
        setFullPokemon({
          ...pokemon,
          types: data.types.map((slot) => slot.type.name),
          baseExp: data.base_experience,
          height: data.height,
          weight: data.weight,
          moves: data.moves.map((move, index) => ({
            id: index + 1,
            name: move.move.name,
            level: move.version_group_details[0].level_learned_at,
          })),
          stats: {
            hp: data.stats[0].base_stat,
            attack: data.stats[1].base_stat,
            defense: data.stats[2].base_stat,
            special_attack: data.stats[3].base_stat,
            special_defense: data.stats[4].base_stat,
            speed: data.stats[5].base_stat,
          },
        });
      });
  }, [pokemon]);

  return fullPokemon.types ? (
    <section className='pt-[10vh] w-screen h-screen '>
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
            {fullPokemon.types.map((type) => (
              <p
                key={fullPokemon.name + type}
                className='text-[2vh] px-2 rounded-full border-[0.5vh] border-black border-solid shadow-xl transition-all hover:scale-[1.2] delay-75 ease-in-out'
                style={{ backgroundColor: colorHash[type].bg_color, color: colorHash[type].text_color }}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </p>
            ))}
          </div>
          <div className='flex gap-x-[2vw]'>
            <div className='flex flex-col justify-end'>
              <p className='text-right font-bold'>Base Experience</p>
              <p className='text-right font-bold'>Height</p>
              <p className='text-right font-bold'>Weight</p>
            </div>
            <div className='flex flex-col justify-start'>
              <p>{fullPokemon.baseExp}</p>
              <p>{fullPokemon.height}</p>
              <p>{fullPokemon.weight}</p>
            </div>
          </div>
          <div className='flex flex-col'>
            <button
              type='button'
              onClick={() => handleClickOwned(fullPokemon.id)}
              className='border-solid border-2 shadow-xl transition-all hover:scale-125 hover:rounded-lg'
              style={{
                backgroundColor: owned ? 'green' : 'red',
                borderColor: owned ? 'white' : 'black',
                color: owned ? 'black' : 'white',
              }}
            >
              {owned ? 'Owned' : 'Not owned'}
            </button>
          </div>
        </div>
      </div>

      <TabComponent stats={fullPokemon.stats} moves={fullPokemon.moves} />
    </section>
  ) : (
    <LoadingPage />
  );
};

export default PokemonPage;
