const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

// const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  entry: './backend/server.ts',
  target: 'node',
  mode: process.env.NODE_ENV,
  output: {
    // filename: isProduction ? 'server.[contenthash].js' : 'server.js',
    filename: 'server.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devtool: 'inline-source-map',
  stats: 'errors-only',
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
};
