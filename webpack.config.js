const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: './script.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    plugins: [
        new webpack.EnvironmentPlugin(['CLIENT_SECRET'])
    ]
};