/* Libraries */
const path    = require('path');
const webpack = require('webpack');

/* Webpack Config */
module.exports = {
  /* Application Entry Point */
  entry: path.normalize('./src/js/main.js'),

  /* Application output */
  output: path.normalize('./src/dist/bundle.js'),

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
      }
    ]
  },
};
