module.exports = {
    parserOptions: {
        ecmaVersion: 6
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
    }
}