import React from 'react';

const SearchBar = ({ defaultValue, handleSearch }) => {
  const a = 0;
  return (
    <div>
      <input type='text' onChange={handleSearch} />
      <ul>
        {defaultValue.map((value) => {
          if (defaultValue.length === 0) {
            return <li>Find some pokemon and start searching!</li>;
          }

          return <li>{value}</li>;
        })}
      </ul>
    </div>
  );
};

export default SearchBar;
