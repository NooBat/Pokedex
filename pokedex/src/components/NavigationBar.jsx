import { React } from 'react';
import { Link } from 'react-router-dom';

import SearchBar from './SearchBar';

const NavigationBar = ({ pokedex }) => (
  <header>
    <nav className='fixed top-0 flex w-screen h-[10vh] bg-blue-700 justify-center align-center gap-x-[2vw] z-10'>
      <Link to='/' className='bg-inherit h-full w-[10vw] hover:bg-blue-600 flex justify-center'>
        <img
          className='w-auto h-full bg-inherit'
          src='http://tylerhawkins.info/pokedex-slash-graphql/build/static/media/pokemon-logo.9253c457.png'
          alt='pokemon logo'
        />
      </Link>
      <SearchBar pokedex={pokedex} />
    </nav>
  </header>
);

export default NavigationBar;
