// const fetch = (...args) =>
//   import('node-fetch').then(({ default: fetch }) => fetch(...args));

const fs = require('fs/promises');
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

const readingFile = fs.readFile(
  './pokemons.json',
  { encoding: 'utf8' }
);

let pokemons = null;
readingFile.then((result) => {
  pokemons = JSON.parse(result).pokemons;
})

app.get('/', (request, response) => {
  // const fetchedPokemonPromise = await fetch(
  //   'https://pokeapi.co/api/v2/pokemon/?limit=10000'
  // );

  // const fetchedPokemon = await fetchedPokemonPromise.json();

  // const pokemons = await Promise.all(
  //   fetchedPokemon.results
  //     .filter((pokemon) => pokemon.name.indexOf('-') === -1)
  //     .map(async (pokemon, index) => {
  //       const stringId = pokemon.url.slice(34, -1);

  //       const moreResourcesPromise = await fetch(pokemon.url);

  //       const data = await moreResourcesPromise.json();

  //       const newPokemon = async (data) => ({
  //         id: Number(stringId),
  //         name: pokemon.name,
  //         form: `https://img.pokemondb.net/artwork/${pokemon.name}.jpg`,
  //         owned: true,
  //         types: await data.types.map((slot) => slot.type.name),
  //         baseExp: await data.base_experience,
  //         height: `${(await data.height) / 10} m`,
  //         weight: `${(await data.weight) / 10} kg`,
  //         moves: await data.moves.map((move, index) => ({
  //           id: index + 1,
  //           name: move.move.name,
  //           level: move.version_group_details[0].level_learned_at,
  //         })),
  //         stats: {
  //           hp: await data.stats[0].base_stat,
  //           attack: await data.stats[1].base_stat,
  //           defense: await data.stats[2].base_stat,
  //           special_attack: await data.stats[3].base_stat,
  //           special_defense: await data.stats[4].base_stat,
  //           speed: await data.stats[5].base_stat,
  //         },
  //       });

  //       return newPokemon(data).then((response) => response);
  //     })
  // );

  // const jsonString =
  // `{
  //   "pokemons": ${JSON.stringify(pokemons)}
  // }`;

  // fs.writeFile('./pokemons.json', jsonString, err => {
  //   console.error(err);
  // })

  response.json(pokemons.filter((pokemon) => pokemon.owned));
});

app.get('/api/pokemons', (request, response) => {
  response.json(pokemons);
});

app.get('/api/pokemons/:id', (request, response) => {
  const id = Number(request.params.id);
  const pokemon = pokemons.find((pokemon) => pokemon.id === id);

  if (pokemon) {
    response.json(pokemon);
  } else {
    response.statusMessage = 'Pokemon Not Found';
    response.status(404).end();
  }
});

app.put('/api/pokemons/:id', (request, response) => {
  const id = Number(request.params.id);
  const pokemon = pokemons.find((pokemon) => pokemon.id === id);
})

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
