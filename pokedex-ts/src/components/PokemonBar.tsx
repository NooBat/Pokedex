import { useContext } from 'react';
import { Link } from 'react-router-dom';

import { Context } from '../contexts/Context';

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

interface PokemonBarProps {
  pokemon: Pokemon;
}

const PokemonBar = ({ pokemon }: PokemonBarProps) => {
  const colorHash = useContext(Context);

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
          {pokemon.types.map((type: string) => (
            <p
              className='text-[2vh] px-2 rounded-full border-[0.5vh] border-black border-solid'
              style={{
                backgroundColor: colorHash[type].bg_color,
                color: colorHash[type].text_color
              }}
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
