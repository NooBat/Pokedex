const mongoose = require('mongoose');

const url = process.env.REACT_APP_MONGODB_URI;
mongoose.connect(url);

const pokemonSchema = new mongoose.Schema({
  id: Number,
  name: String,
  form: String,
  owned: Boolean,
  types: [String],
  baseExp: Number,
  height: String,
  weight: String,
  moves: [{
    id: Number,
    name: String,
    level: Number,
  }],
  stats: {
    hp: Number,
    attack: Number,
    defense: Number,
    special_attack: Number,
    special_defense: Number,
    speed: Number,
  },
});

pokemonSchema.set('toJSON', {
  transform: (document, returnedPokemon) => {
    delete returnedPokemon._id;
    delete returnedPokemon.__v;

    returnedPokemon.moves.forEach((move) => {
      delete move._id;
    });
  },
})

module.exports = mongoose.model('Pokémon', pokemonSchema);
