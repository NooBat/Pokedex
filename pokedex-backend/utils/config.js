require('dotenv').config();

const MONGODB_URI = process.env.REACT_APP_MONGODB_URI;
const PORT = process.env.PORT;

module.exports = {
  MONGODB_URI,
  PORT,
};
