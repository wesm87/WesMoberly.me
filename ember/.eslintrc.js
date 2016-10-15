var path = require( 'path' );

module.exports = {

  root: true,

  env: {
    browser: true,
    node:    true,
    es6:     true,
  },

  parser: 'babel-eslint',

  parserOptions: {
    ecmaVersion: 7,
    sourceType:  'module',
  },

  extends: [
    require.resolve( 'ember-cli-eslint/coding-standard/ember-application.js' )
  ]

};
