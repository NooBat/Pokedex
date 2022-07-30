import { useState, useEffect, React } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const PokemonCard = ({ pokemon }) => {
  const [types, setType] = useState([]);

  const colorHash = {
    'bug': '#3b9950',
    'dark': '#5a5979',
    'dragon': '#61cad9',
    'electric': '#fbfb72',
    'fairy': '#ea1369',
    'fighting': '#ef6138',
    'fire': '#fd4c5a',
    'flying': '#93b2c7',
    'ghost': '#906790',
    'grass': '#27c84f',
    'ground': '#6e491f',
    'ice': '#d8f0fa',
    'normal': '#ca98a7',
    'poison': '#9b69d9',
    'psychic': '#f81c91',
    'rock': '#8b3e21',
    'steel': '#42bd94',
    'water': '#1552e2',
  };

  useEffect(() => {
    axios.get(pokemon.url).then((response) => {
      const info = response.data;
      setType(info.types.map((type) => type.type.name));
    });
  }, []);

  return (
    <Link
      to={`/pokemons/${pokemon.id}`}
      className='box-border flex bg-white hover:bg-gray-200 rounded-xl 
      border-solid border-black border-[0.5vh] mx-auto my-[1vh] w-[52vw] h-[15vh] min-h-[80px]'
    >
      <img
        src={pokemon.form}
        alt={`form of ${pokemon.name}`}
        className='rounded-xl w-[15vh] min-w-[80px] h-full bg-inherit'
      />
      <div className='bg-inherit flex flex-col self-center gap-y-[1vh]'>
        <h3 className='bg-inherit font-bold text-[6vh]'>
          {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
        </h3>
        <div className='bg-inherit flex flex-row gap-x-[0.5vw]'>
          {types.map((type) => (
            <p className='text-[2vh] px-2' style={{backgroundColor: colorHash[type]}} key={pokemon.name + type}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </p>
          ))}
        </div>
      </div>
    </Link>
  );
};

export default PokemonCard;
