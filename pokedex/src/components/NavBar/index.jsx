import { React } from 'react';
import { Link } from 'react-router-dom';

import SearchBar from './SearchBar';

export default function NavBar() {
  return (
    <header>
      <nav className='fixed top-0 flex w-screen h-[10vh] bg-blue-700 justify-center align-center gap-x-[2vw] z-10 min-h-[80px]'>
        <Link
          to='/'
          className='bg-inherit h-full w-[10vw] hover:bg-blue-600 flex justify-center'
        >
          <button
            type='button'
            className='h-full w-full'
            onClick={() => {
              document.documentElement.scrollTop = 0;
            }}
          >
            <img
              className='w-auto h-full bg-inherit mx-auto'
              src='http://tylerhawkins.info/pokedex-slash-graphql/build/static/media/pokemon-logo.9253c457.png'
              alt='pokemon logo'
            />
          </button>
        </Link>
        <SearchBar />
      </nav>
    </header>
  );
}
