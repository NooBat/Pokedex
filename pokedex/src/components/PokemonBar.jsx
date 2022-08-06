import { React, useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { Context } from '../contexts/Context';

const PokemonBar = ({ pokemon }) => {
  const [types, setType] = useState([]);
  const colorHash = useContext(Context);

  useEffect(() => {
    axios.get(pokemon.url).then((response) => {
      const info = response.data;
      setType(info.types.map((type) => type.type.name));
    });
  }, [pokemon.url]);

  return (
    <Link
      to={`/pokemons/${pokemon.id}`}
      className='box-border flex gap-x-[1vw] bg-white hover:bg-gray-300 rounded-xl 
      border-solid border-black border-[0.5vh] shadow-xl shadow-dark mx-auto my-[1vh] w-[52vw] h-[15vh] min-w-[400px]
      min-h-[80px] ease-in-out hover:scale-[1.1] transform-gpu transition-all'
      onClick={() => {
        document.documentElement.scrollTop = 0;
      }}
    >
      <img
        src={pokemon.form}
        alt={`form of ${pokemon.name}`}
        className='rounded-xl w-[15vh] min-w-[80px] h-full bg-inherit'
      />
      <div className='bg-inherit flex flex-col self-center'>
        <p className='bg-inherit font-bold text-[6vh]'>
          {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
        </p>
        <div className='bg-inherit flex flex-row gap-x-[0.5vw] justify-start'>
          {types.map((type) => (
            <p
              className='text-[2vh] px-2 rounded-full border-[0.5vh] border-black border-solid'
              style={{ backgroundColor: colorHash[type].bg_color, color: colorHash[type].text_color }}
              key={pokemon.name + type}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </p>
          ))}
        </div>
      </div>
    </Link>
  );
};

export default PokemonBar;
