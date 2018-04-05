const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const config = require('./config');

const ROOT_PATH = path.resolve(__dirname);
const BUILD_PATH = path.resolve(ROOT_PATH, '..', 'api', 'build');
const apiUrl = `http://${config.api.host}:${config.api.port}/api`;

module.exports = {
  mode: 'production',
  entry: [
    path.resolve(ROOT_PATH, 'src', 'app.jsx'),
  ],
  context: path.resolve(ROOT_PATH),
  output: {
    path: BUILD_PATH,
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.css', '.scss', '.json'],
    alias: {
      lib: path.resolve(ROOT_PATH, 'lib'),
      config: path.resolve(ROOT_PATH, 'config.json'),
      styles: path.resolve(ROOT_PATH, 'public', 'styles'),
    },
    enforceExtension: false,
  },
  plugins: [
    new webpack.DefinePlugin({
      apiUrl: JSON.stringify(apiUrl),
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new CopyWebpackPlugin([{
      from: path.resolve(ROOT_PATH, 'index.prod.html'),
      to: path.resolve(BUILD_PATH, 'index.html'),
    }]),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: [/node_modules/, BUILD_PATH],
        include: path.resolve(ROOT_PATH),
        loader: 'babel-loader',
      },
      {
        test: /\.scss$/,
        use: [{
          loader: "style-loader" // creates style nodes from JS strings
        }, {
          loader: "css-loader" // translates CSS into CommonJS
        }, {
          loader: "sass-loader" // compiles Sass to CSS
        }]
      }
    ],
  },
};
