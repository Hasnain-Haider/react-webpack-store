const path = require('path');
const webpack = require('webpack');
const config = require('./config');

const ROOT_PATH = path.resolve(__dirname);
const BUILD_PATH = path.resolve(ROOT_PATH, 'app', 'build');
const apiUrl = `http://${config.api.host}:${config.api.port}/api`;

module.exports = {
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
      HOST:  JSON.stringify(process.env.HOST || config.api.host),
      API_PORT:  JSON.stringify(process.env.API_PORT || config.api.port),
      MONGO_URL: JSON.stringify(process.env.MONGO_PORT || config.api.port),
      apiUrl: JSON.stringify(apiUrl)
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
