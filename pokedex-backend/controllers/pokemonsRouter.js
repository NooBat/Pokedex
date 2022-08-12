const pokemonsRouter = require('express').Router();
const Pokemon = require('../models/pokemon');

pokemonsRouter.get('/', async (request, response, next) => {
  Pokemon.find({ owned: true })
    .then((ownedPokemons) => {
      response.json(ownedPokemons);
    })
    .catch((error) => next(error));
});

pokemonsRouter.get('/:id', (request, response, next) => {
  const id = Number(request.params.id);
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

// pokemonsRouter.use((request, response, next) => {
//   const filters = request.query;

//   if (filters.name) {
//     filters.name = { $regex: '^' + filters.name, $options: 'i' };
//   }
//   if (filters.types) {
//     filters.types = { $all: filters.types };
//   }

//   console.log(filters);

//   Pokemon.find(filters)
//     .then((pokemons) => {
//       response.json(pokemons);
//     })
//     .catch((error) => next(error));
// });

pokemonsRouter.put('/:id', (request, response, next) => {
  const body = request.body;
  const id = Number(request.params.id);

  Pokemon.findOneAndUpdate({ id }, body, { new: true })
    .then((updatedPokemon) => {
      response.json(updatedPokemon);
    })
    .catch((error) => next(error));
});

module.exports = pokemonsRouter;
