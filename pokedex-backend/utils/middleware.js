const logger = require('./logger');
const Pokemon = require('../models/pokemon');

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'Unknown Endpoint' });
};

const errorHandler = (error, request, response, next) => {
  logger.error(error.message);

  if (error.name === 'CastError') {
    response.status(400).json({ error: 'Malformatted ID' });
  }

  next(error);
};

const queryHandler = (request, response, next) => {
  const filters = request.query;

  if (filters.name) {
    filters.name = { $regex: '^' + filters.name, $options: 'i' };
  }
  if (filters.types) {
    filters.types = { $all: filters.types };
  }

  Pokemon.find(filters)
    .then((pokemons) => {
      response.json(pokemons);
    })
    .catch((error) => next(error));
}

module.exports = {
  unknownEndpoint,
  errorHandler,
  queryHandler,
};
