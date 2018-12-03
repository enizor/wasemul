module.exports = {
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
            modules: true
        }
    },
    parser: 'babel-eslint',
    env: {
        browser: true,
        jest: true
    },
    extends: ['airbnb', 'plugin:react/recommended'],
    plugins: ['react'],
    rules: {
        'react/jsx-filename-extension': 
        [
            1, 
            { 
                extensions: ['.js', '.jsx'] 
            }
        ],
        'max-len': [ 2, 80, 4, 
            { "ignoreComments": true }
        ],
    },
    settings: {
        react: {
            createClass: 'createReactClass',
            pragma: 'React',
            version: '16.6'
        }
    }
}