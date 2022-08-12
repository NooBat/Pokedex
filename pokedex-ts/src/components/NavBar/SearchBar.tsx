import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

import pokemonService from '../../services/pokemons';
import { ReactComponent as ClearIcon } from '../../assets/icons/cancel.svg';

const SearchBar = () => {
  const [searchHistory, setSearchHistory] = useState<Pokemon[]>(
    JSON.parse(localStorage.getItem('search-history') || '[]')
  );
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [searchEntry, setSearchEntry] = useState<string>('');
  const [display, setDisplay] = useState<'hidden' | 'list-item'>('hidden');
  const inputRef = useRef() as React.MutableRefObject<HTMLInputElement>;

  useEffect(() => {
    inputRef.current.addEventListener('click', (event: MouseEvent) => {
      event.stopPropagation();
      setDisplay('list-item');
    });
    document.addEventListener('click', () => {
      setDisplay('hidden');
    });
  }, []);

  useEffect(() => {
    pokemonService.queryName(searchEntry).then((response) => {
      setPokemons(response);
    });
  }, [display]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchEntry(event.target.value);
  };

  const handleClick = (clickedPokemon: Pokemon) => {
    const occurence = searchHistory.findIndex(
      (pokemon: Pokemon) => pokemon.id === clickedPokemon.id
    );

    setSearchEntry(
      clickedPokemon.name.charAt(0).toUpperCase() +
        clickedPokemon.name.slice(1, clickedPokemon.name.length)
    );

    if (occurence !== -1) {
      const newHistory = [...searchHistory];
      setSearchHistory(
        [clickedPokemon].concat(newHistory.splice(occurence, 1))
      );
    } else if (searchHistory.length < 5) {
      setSearchHistory([clickedPokemon].concat(searchHistory));
    } else {
      setSearchHistory(
        [clickedPokemon].concat(
          searchHistory.slice(0, searchHistory.length - 1)
        )
      );
    }
  };

  localStorage.setItem('search-history', JSON.stringify(searchHistory));

  return (
    <div className='h-full bg-inherit w-2/5 rounded-[10px] py-[1px]'>
      <form className='h-fit w-full bg-inherit mt-[2.5vh] flex content-center'>
        <input
          type='text'
          ref={inputRef}
          placeholder='Search Pokemon Name'
          onChange={handleSearch}
          onFocus={(e: React.FocusEvent<HTMLInputElement, Element>) => {
            e.target.select();
          }}
          value={searchEntry}
          className='box-border block w-full h-full border-[3px] border-yellow-400 border-solid 
                    rounded-lg overflow-hidden bg-slate-200 focus:rounded-b-none focus:rounded-t-xl 
                    focus:bg-white hover:bg-slate-100 px-5 placeholder:text-slate-500 min-h-[40px] max-h-[100px] min-w-[320px]'
        />
        <button
          type='button'
          onClick={(e: React.MouseEvent<Element, MouseEvent>) => {
            e.preventDefault();
            setSearchEntry('');
          }}
          className='h-full -ml-[35px] m-auto'
        >
          <ClearIcon
            className={
              searchEntry === ''
                ? 'hidden'
                : 'hover:scale-[1.1] transition-all m-auto'
            }
          />
        </button>
      </form>
      <ul
        className={`w-full mx-auto max-h-[400px] shadow-2xl shadow-black overflow-hidden overflow-y-scroll rounded-b-[10px] ${display}`}
      >
        {pokemons.map((pokemon: Pokemon) => (
          <li
            key={pokemon.id}
            className='box-content bg-white h-20 hover:bg-slate-200'
          >
            <Link to={`/pokemons/${pokemon.id}`} className='bg-inherit'>
              <button
                type='button'
                className='mx-auto w-full flex content-center bg-inherit'
                onClick={() => {
                  document.documentElement.scrollTop = 0;
                  handleClick(pokemon);
                }}
              >
                <img
                  className='w-20 h-[80px]'
                  src={pokemon.form}
                  alt={`form of ${pokemon.name}`}
                />
                <h3 className='ml-5 my-auto bg-inherit font-bold'>
                  {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
                </h3>
              </button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchBar;
