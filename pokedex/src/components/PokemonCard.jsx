import { useState, useEffect, React } from 'react';
import axios from 'axios';

const PokemonCard = ({ card }) => {
  const [types, setType] = useState([]);
  
  useEffect(() => {
    axios.get(card.url).then((response) => {
      const info = response.data;
      setType(info.types.map((type) => type.type.name));
    });
  }, []);

  return (
    <div className="container bg-gray-500 mx-auto rounded-xl">
      <img src={card.form} alt='form of a pokemon' />
      <h3>{card.name.charAt(0).toUpperCase() + card.name.slice(1)}</h3>
      {types.map((type) => (
        <p key={card.name + type}>{type.charAt(0).toUpperCase() + type.slice(1)}</p>
      ))}
    </div>
  );
};

export default PokemonCard;
