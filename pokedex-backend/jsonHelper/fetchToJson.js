const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));
const fs = require('fs/promises');

let jsonString = '';

async function fetchPokemons() {
  const fetchedPokemonPromise = await fetch(
    'https://pokeapi.co/api/v2/pokemon/?limit=10000'
  );

  const fetchedPokemon = await fetchedPokemonPromise.json();

  await Promise.all(
    fetchedPokemon.results
      .filter((pokemon) => pokemon.name.indexOf('-') === -1)
      .map(async (pokemon) => {
        const stringId = pokemon.url.slice(34, -1);

        const moreResourcesPromise = await fetch(pokemon.url);

        const data = await moreResourcesPromise.json()

        const newPokemon = async (data) => ({
          id: Number(stringId),
          name: pokemon.name,
          form: `https://img.pokemondb.net/artwork/${pokemon.name}.jpg`,
          owned: true,
          types: data.types.map((slot) => slot.type.name),
          baseExp: data.base_experience,
          height: `${(data.height) / 10} m`,
          weight: `${(data.weight) / 10} kg`,
          moves: data.moves.map((move, index) => ({
            id: index + 1,
            name: move.move.name,
            level: move.version_group_details[0].level_learned_at,
          })),
          stats: {
            hp: data.stats[0].base_stat,
            attack: data.stats[1].base_stat,
            defense: data.stats[2].base_stat,
            special_attack: data.stats[3].base_stat,
            special_defense: data.stats[4].base_stat,
            speed: data.stats[5].base_stat,
          },
        });

        return newPokemon(data).then((response) => response);
      })
  ).then((pokemons) => {
    const jsonString = `{
      "pokemons": ${JSON.stringify(pokemons)}
    }`;

    console.log(pokemons[0]);

    fs.writeFile('pokemons.json', jsonString, (err) => {
      console.error(err);
    });
  });
}

fetchPokemons()
// .then((pokemons) => {
//   const jsonString = `{
//     "pokemons": ${JSON.stringify(pokemons)}
//   }`;

//   fs.writeFile('pokemons.json', jsonString, (err) => {
//     console.error(err);
//   });
// });
