const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');

const config = require('./utils/config');
const logger = require('./utils/logger');
const middleware = require('./utils/middleware');
const pokemonsRouter = require('./controllers/pokemonsRouter');

logger.info('connecting to', config.MONGODB_URI);

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB');
  })
  .catch((err) => {
    logger.error('error connecting to MongoDB', err.message);
  });

const app = express();
app.use(cors());
app.use(express.static('build'));
app.use(express.json());

morgan.token('content', (request, response) => {
  console.log(response);
  return JSON.stringify(request.body)
});
app.use(
  morgan(
    `
Method: :method
Path: :url
Status: :status
Response Length: :res[content-length]
Response Time: :response-time ms
Content: :content
----------------
`
  )
);

app.use('/api/pokemons', pokemonsRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
