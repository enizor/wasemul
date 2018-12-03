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
    },
    settings: {
        react: {
            createClass: 'createReactClass',
            pragma: 'React',
            version: '16.6'
        }
    }
}