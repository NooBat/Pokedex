import PokemonBar from '../components/PokemonBar';

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
