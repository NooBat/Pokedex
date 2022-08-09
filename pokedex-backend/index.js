// const fetch = (...args) =>
//   import('node-fetch').then(({ default: fetch }) => fetch(...args));
// const fs = require('fs/promises');

const express = require('express');
const cors = require('cors');
require('dotenv').config();

const Pokemon = require('./models/pokemon');
const { response } = require('express');

const app = express();
app.use(express.static('build'));
app.use(express.json());
app.use(cors());

// const readingFile = fs.readFile('./pokemons.json', { encoding: 'utf8' });

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
  response.send('Connected');
});

app.get('/api/pokemons', async (request, response, next) => {
  Pokemon.find({ owned: true })
    .then((ownedPokemons) => {
      response.json(ownedPokemons);
    })
    .catch((error) => next(error));
});

app.get('/api/pokemons/:id', (request, response, next) => {
  const id = Number(request.params.id);
  console.log(id);
  Pokemon.findOne({ id })
    .then((pokemon) => {
      if (pokemon) {
        response.json(pokemon);
      } else {
        response.statusMessage = 'Pokemon Not Found';
        response.status(404).send(null);
      }
    })
    .catch((error) => next(error));
});

app.get('/api/pokemons/query', (request, response, next) => {

});

app.put('/api/pokemons/:id', (request, response) => {
  const id = Number(request.params.id);
  const pokemon = pokemons.find((pokemon) => pokemon.id === id);
});

const unknownEndpoint = () => {
  response.status(404).send({ error: 'unknown endpoint' });
};

app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
  console.error(error);

  if (error.name === 'CastError') {
    response.status(400).json({ error: 'malformatted id' });
  }

  next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
