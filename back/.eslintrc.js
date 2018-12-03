module.exports = {
    parserOptions: {
        ecmaVersion: 8,
    },
    parser: 'babel-eslint',
    extends: [
        'airbnb-base',
    ],
    plugins: [
        'import',
    ],
    env: {
        node: true,
    },
    rules: {
        'max-len': [ 2, 80, 4, 
            { "ignoreComments": true }
        ],
    }
}