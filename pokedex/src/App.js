import { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [pokedex, setPokedex] = useState([]);
  const [searchBar, setSearchBar] = useState('');
  
  useEffect(() => {
    axios
      .get('https://pokeapi.co/api/v2/pokemon/?limit=1154')
      .then((response))
  }, [])

  return (
    <div></div>
  );
};

export default App;
