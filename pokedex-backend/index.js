const express = require('express');
const cors = require('cors');
require('dotenv').config();

const Pokemon = require('./models/pokemon');
const { response } = require('express');

const app = express();
app.use(express.static('build'));
app.use(express.json());
app.use(cors());

app.get('/', (request, response) => {
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

app.use('/pokemons', (request, response, next) => {
  const filters = request.query;
  
  if (filters.name) {
    filters.name = { $regex: '^' + filters.name, $options: 'i' };
  }
  if (filters.types) {
    filters.types = { $all: filters.types };
  }

  Pokemon.find(filters).then((pokemons) => {
    response.json(pokemons);
  })
});

app.put('/api/pokemons/:id', (request, response, next) => {
  const body = request.body;
  const id = Number(request.params.id);

  const pokemon = {
    ...body,
  }

  Pokemon.findOneAndUpdate({ id }, pokemon, { new: true })
    .then((updatedPokemon) => {
      response.json(updatedPokemon);
    })
    .catch((error) => next(error));
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
