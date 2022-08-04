const express = require('express');
const app = express();

let pokemons = [
  {
    id: 1,
    name: "bulbasaur",
    url: "https://pokeapi.co/api/v2/pokemon/1/",
  },
  {
    id: 2,
    name: "ivysaur",
    url: "https://pokeapi.co/api/v2/pokemon/2/",
  },
  {
    id: 3,
    name: "venusaur",
    url: "https://pokeapi.co/api/v2/pokemon/3/",
  },
  {
    id: 4,
    name: "charmander",
    url: "https://pokeapi.co/api/v2/pokemon/4/",
  },
];

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>');
});

app.get('/pokemons', (request, response) => {
  response.json(pokemons);
});

app.get('/pokemons/:id', (request, response) => {
  const id = Number(request.params.id);
  const pokemon = pokemons.find((pokemon) => pokemon.id === id);

  if (pokemon) {
    response.json(pokemon)
  } else {
    response.statusMessage = 'Pokemon Not Found';
    response.status(404).end();
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
