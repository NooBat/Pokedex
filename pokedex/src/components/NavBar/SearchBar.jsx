import { React, useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

const SearchBar = ({ pokedex }) => {
  const [searchHistory, setSearchHistory] = useState(JSON.parse(localStorage.getItem('search-history') || '[]'));
  const [searchEntry, setSearchEntry] = useState('');
  const [display, setDisplay] = useState('hidden');
  const ulRef = useRef();
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.addEventListener('click', (event) => {
      event.stopPropagation();
      ulRef.current.style.display = 'list-item';
      setDisplay('list-item')
    });
    document.addEventListener('click', () => {
      ulRef.current.style.display = 'none';
      setDisplay('hidden');
    });
  }, []);

  const handleSearch = (event) => {
    setSearchEntry(event.target.value);
  };

  const handleClick = (clickedPokemon) => {
    const occurence = searchHistory.findIndex(
      (pokemon) => pokemon.id === clickedPokemon.id
    );

    setSearchEntry(
      clickedPokemon.name.charAt(0).toUpperCase() +
        clickedPokemon.name.slice(1, clickedPokemon.name.length)
    );

    if (occurence !== -1) {
      const newHistory = [...searchHistory];
      const newSearchHistory = [clickedPokemon].concat(
        newHistory.slice(0, occurence).concat(newHistory.slice(occurence + 1))
      );
      setSearchHistory(newSearchHistory);
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
    <div className='h-full bg-inherit w-2/5'>
      <input
        type='text'
        ref={inputRef}
        placeholder='Search'
        onChange={handleSearch}
        onFocus={(e) => {
          e.target.select();
        }}
        value={searchEntry}
        className='box-border block w-full h-full focus:rounded-b-none focus:rounded-t-xl border-2 border-red-500 border-solid rounded-full overflow-hidden bg-white px-5'
      />
      <ul
        ref={ulRef}
        className={`w-full mx-auto max-h-[400px] overflow-hidden overflow-y-scroll rounded-b-[10px] ${display}`}
      >
        {(searchEntry.length
          ? pokedex.filter(
              (pokemon) =>
                pokemon.name
                  .slice(0, searchEntry.length)
                  .indexOf(searchEntry.toLowerCase()) !== -1
            )
          : searchHistory
        ).map((pokemon) => (
          <li key={pokemon.id} className='box-content bg-white h-20 hover:bg-slate-200'>
            <Link to={`/pokemons/${pokemon.id}`} className='bg-inherit'>
              <button
                type='button'
                className='mx-auto w-full flex flex-row content-center bg-inherit'
                onClick={() => handleClick(pokemon)}
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
