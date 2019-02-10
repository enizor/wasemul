module.exports = {
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
      modules: true,
    },
  },
  parser: 'babel-eslint',
  env: {
    browser: true,
    jest: true,
  },
  extends: ['airbnb', 'plugin:react/recommended'],
  plugins: ['react'],
  rules: {
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.js', '.jsx'],
      },
    ],
    'max-len': [2, 80, 4, { ignoreComments: true }],
    'jsx-a11y/label-has-associated-control': [
      'error',
      {
        required: {
          some: ['nesting', 'id'],
        },
      },
    ],
    'jsx-a11y/label-has-for': [
      'error',
      {
        required: {
          some: ['nesting', 'id'],
        },
      },
    ],
  },
  settings: {
    react: {
      createClass: 'createReactClass',
      pragma: 'React',
      version: '16.6',
    },
  },
};
