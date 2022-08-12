const logger = require('./logger');

const unknownEndpoint = () => {
  response.status(404).send({ error: 'Unknown Endpoint' });
};

const errorHandler = (error, request, response, next) => {
  logger.error(error.message);

  if (error.name === 'CastError') {
    response.status(400).json({ error: 'Malformatted ID' });
  }

  next(error);
};

module.exports = {
  unknownEndpoint,
  errorHandler,
};
