var path = require('path')
var webpack = require('webpack')

module.exports = {
  entry: path.resolve(__dirname, 'src'),
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
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
      },
      {
        test: /\.css$/,
        loader: 'style-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        loader: 'css-loader',
        exclude: /node_modules/
      }
    ]
  },
  stats: {
    colors: true
  }
}
