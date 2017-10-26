const path = require('path');
const webpack = require('webpack');
const config = require('./config');

const ROOT_PATH = path.resolve(__dirname);
const BUILD_PATH = path.resolve(ROOT_PATH, 'app', 'build');
const PORT = process.env.PORT || config.api.port;
const apiUrl = `http://localhost:${PORT}/api`;

module.exports = {
  devtool: 'source-map'
  entry: [
    path.resolve(ROOT_PATH, 'app', 'src', 'app.jsx'),
  ],
  context: path.resolve(ROOT_PATH, 'app'),
  output: {
    path: BUILD_PATH,
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.css', '.scss', '.json'],
    alias: {
      config: path.resolve(ROOT_PATH, 'config.json'),
      lib: path.resolve(ROOT_PATH, 'app', 'lib')
    },
    enforceExtension: false,
  },
  plugins: [
    new webpack.DefinePlugin({
      apiUrl: JSON.stringify(apiUrl),
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      }
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      compress: {
        warnings: false
      }
    })
  ],
  module: {
    loaders: [{
      test: /\.(js|jsx)$/,
      exclude: [/node_modules/, BUILD_PATH],
      include: path.resolve(ROOT_PATH, 'app'),
      loader: 'babel-loader',
    },
    {
      test: /.json$/,
      use: ['json-loader'],
    }
    ] },
  devServer: {
    hot: true,
    historyApiFallback: true,
    host: config.app.host,
    port: config.app.port,
  },
  node: {
    fs: 'empty',
    console: true
  }
};
