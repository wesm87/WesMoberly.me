
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
    'import/resolver': 'webpack',
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
