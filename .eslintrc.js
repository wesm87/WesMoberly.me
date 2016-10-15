
module.exports = {
  root: true,
  parser: 'babel-eslint',
  extends: 'airbnb',
  env: {
    browser: true,
    jest: true,
  },
  globals: {
    __DEV__: true,
  },
};
