module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
    jest: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  plugins: [
    'react',
  ],
  rules: {
  },
};
