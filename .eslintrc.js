
const path = require('path');

module.exports = {
  root: true,
  parser: 'babel-eslint',
  env: {
    node: true,
    browser: true,
    jest: true,
  },
  globals: {
    __DEV__: true,
  },
  extends: [
    'wesm87',
  ],
  plugins: [
    'react',
    'import',
  ],
  settings: {
    'import/resolver': {
      webpack: {
        config: {
          resolve: {
            extensions: ['*', '.scss', '.ts', '.tsx', '.js', '.jsx', '.json'],
            modules: [
              path.resolve(__dirname, 'src'),
              'node_modules',
            ],
          },
        },
      },
    },
  },
  rules: {
    'no-underscore-dangle': 'off',
    'no-plusplus': ['error', {
      allowForLoopAfterthoughts: true,
    }],
    'no-restricted-syntax': [
      'error',
      'ForInStatement',
      'LabeledStatement',
      'WithStatement',
    ],
    'import/no-extraneous-dependencies': ['error', {
      'devDependencies': true,
    }],
    'react/prefer-stateless-function': ['error', {
      ignorePureComponents: true,
    }],
    'react/jsx-filename-extension': ['error', {
      extensions: ['.jsx', '.tsx'],
    }],
  }
};
