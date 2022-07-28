import { React, useState, useRef, useEffect } from 'react';

const SearchBar = ({ pokedex }) => {
  const [searchHistory, setSearchHistory] = useState([]);
  const [optionsList, setOptionsList] = useState([]);
  const [searchEntry, setSearchEntry] = useState('');
  const ulRef = useRef();
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.addEventListener('click', (event) => {
      event.stopPropagation();
      ulRef.current.style.display = 'list-item';
    });
    document.addEventListener('click', () => {
      ulRef.current.style.display = 'none';
    });
  }, []);

  const handleSearch = (event) => {
    setSearchEntry(event.target.value);

    console.log(searchEntry);
    console.log(event.target.value);

    if (searchEntry.length === 0) {
      setOptionsList(searchHistory);
    } else {
      const searchEntry1 = event.target.value;

      setOptionsList(
        pokedex.filter(
          (pokemon) =>
            pokemon.name
              .slice(0, searchEntry1.length)
              .indexOf(searchEntry1.toLowerCase()) !== -1
        )
      );
    }
  };

  const handleClick = (clickedPokemon) => {
    const occurence = searchHistory.findIndex(
      (pokemon) => pokemon.id === clickedPokemon.id
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

  return (
    <div className='flex justify-center'>
      <input
        type='text'
        ref={inputRef}
        onChange={handleSearch}
        className='w-2/5 flex rounded-full overflow-hidden focus:rounded-b-none focus:rounded-t-[10px] relative bg-white border-double border-4 border-yellow-500 px-4'
      />
      <ul
        ref={ulRef}
        className='w-2/5 absolute top-[31px] block mx-auto border-solid border-x-2 border-black max-h-[400px] overflow-hidden overflow-y-scroll'
      >
        {optionsList.map((option, index) => {
          const newOption = {
            ...option,
            id: index,
          };

          return (
            <li
              key={newOption.id}
              className='m-0 bg-white h-20 border-solid border-b-2 border-black shadow hover:shadow-lg'
            >
              <button
                type='button'
                className='mx-auto w-full flex flex-row content-center'
                onClick={() => handleClick(option)}
              >
                <img
                  className='w-20 h-[78px] border-solid border-r-2 border-black'
                  src={newOption.form}
                  alt={`${newOption.name}`}
                />
                <h3 className='ml-5 my-auto bg-white'>
                  {newOption.name.charAt(0).toUpperCase() +
                    newOption.name.slice(1)}
                </h3>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SearchBar;
