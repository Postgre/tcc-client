/* Libraries */
const path = require('path');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

/* Webpack Config */
module.exports = {
    entry: path.resolve('./es/src/main.js'),
    output: {
        path: path.resolve('./es/dist'),
        filename: 'bundle.js'
    },
    devtool: 'source-map',
    module: {
        loaders: [
            {
                test: /.js?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015']
                }
            },
            {
                test: /\.css$/,
                loader: 'style!css'
            }
        ]
    }
    ,
    plugins: [
        new UglifyJSPlugin(),
    ]
};
