var path = require('path');

 module.exports = {
     entry: './src/es_01.js',
     output: {
         path: path.resolve(__dirname, 'dist'),
         filename: 'bundle.js'
     },
     module: {
         loaders: [
             {
                 test: /\.js$/,
                 loader: 'babel-loader',
                 query: {
                     presets: ['es2015']
                 },
                 exclude: /node_modules/   
             }
         ]
     },
     stats: {
         colors: true
     },
     devtool: 'source-map'
 };


/*
var path = require('path');

module.exports = {
  entry: path.resolve(__dirname, '/src/es_01.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
        test: /\.js$/,
        loaders: ['babel'],
        exclude: /node_modules/
    }]
  },
  resolve: {
    extensions: [".js"]
  }
};
*/
