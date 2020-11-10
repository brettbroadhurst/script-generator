// webpack/dev.js - Webpack development config
// Written by Brett Broadhurst <brettbroadhurst@gmail.com>
//

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const SRC_PATH = path.join(__dirname, '..', 'src');
const DEST_PATH = path.join(__dirname, '..', 'dist');

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',

  // Entry point to start building
  entry: path.join(SRC_PATH, 'index.tsx'),

  // Output format
  output: {
    path: path.resolve(DEST_PATH),
    publicPath: '/',
    filename: '[name].[hash].js',
  },

  // Dev Server
  devServer: {
    port: 9000,
    hot: true,
    open: true,
    historyApiFallback: true,
  },

  // Resolve the follow extensions easily without having to specify
  // the full path.
  resolve: {
    extensions: ['.tsx', '.jsx', '.ts', '.js'],
  },

  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.join(__dirname, 'index.html'),
    }),
  ],

  module: {
    rules: [
      // Typescript and Typescript based JSX
      {
        test: /\.ts?x/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },

      // CSS
      {
        test: /\.css/,
        use: [
          'style-loader',
          'css-loader',
        ],
        exclude: /node_modules/,
      },
    ],
  },
};
