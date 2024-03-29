module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'merriweather': ['Merriweather', 'sans-serif']
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
      },
      colors: {
        'bug': '#3b9950',
        'dark': '#5a5979',
        'dragon': '#61cad9',
        'electric': '#fbfb72',
        'fairy': '#ea1369',
        'fighting': '#ef6138',
        'fire': '#fd4c5a',
        'flying': '#93b2c7',
        'ghost': '#906790',
        'grass': '#27c84f',
        'ground': '#6e491f',
        'ice': '#d8f0fa',
        'normal': '#ca98a7',
        'poison': '#9b69d9',
        'psychic': '#f81c91',
        'rock': '#8b3e21',
        'steel': '#42bd94',
        'water': '#1552e2',
      }
    },
  },
  plugins: [],
}
