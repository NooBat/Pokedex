import { Link } from 'react-router-dom';

import { ReactComponent as PokemonLogo } from '../../assets/logos/pokemon-23.svg';
import SearchBar from './SearchBar';

export default function NavBar() {
  return (
    <header>
      <nav className='fixed top-0 flex w-screen h-[10vh] bg-blue-700 justify-center content-center gap-x-[2vw] z-10 min-h-[80px]'>
        <Link
          to='/'
          className='bg-inherit h-full w-[10vw] hover:bg-blue-600 flex justify-center'
          onClick={() => {
            document.documentElement.scrollTop = 0;
          }}
        >
          <PokemonLogo
            className='w-full h-full bg-inherit mx-auto'
          />
        </Link>
        <SearchBar />
      </nav>
    </header>
  );
}
