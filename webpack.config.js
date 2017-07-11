/* Libraries */
const path    = require('path');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

/* Webpack Config */
module.exports = {
  /* Application Entry Point */
  entry: path.resolve('./js/main.js'),

  /* Application output */
  output:{
    path: path.resolve('./js/gen'),
    filename: 'bundle.js'
  },

  /* Development Config */
  devtool: 'source-map',

  /* Modules */
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
  },

  /* Plugins */
  plugins: [
    new UglifyJSPlugin(),
  ]
};
