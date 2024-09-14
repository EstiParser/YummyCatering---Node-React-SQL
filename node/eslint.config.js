/** @type {import('eslint').FlatConfig} */
const config = [
  {
    ignores: ['node_modules/**'],
  },
  {
    languageOptions: {
      parserOptions: {
        ecmaVersion: 2021,
      },
    },
    rules: {
      'semi': ['error', 'always'],
      'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0 }],
      'no-console': 'warn',
      'eqeqeq': 'error',
      'no-trailing-spaces': 'error',
      'no-unused-vars': ['error', { args: 'none' }],
    },
  },
];

module.exports = config;
