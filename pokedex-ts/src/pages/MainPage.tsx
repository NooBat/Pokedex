import PokemonBar from '../components/PokemonBar';

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

interface MainPageProp {
  ownedPokemon: Pokemon[];
}

const MainPage = ({ ownedPokemon }: MainPageProp) => (
  <div className='pt-[15vh] w-full h-fit pb-[5vh]'>
    <h1 className='text-center mx-auto mb-[5vh] font-bold font-merriweather text-6xl'>
      Pokémon Owned
    </h1>
    {ownedPokemon.map((pokemon: Pokemon) => (
      <PokemonBar key={pokemon.id} pokemon={pokemon} />
    ))}
  </div>
);

export default MainPage;
