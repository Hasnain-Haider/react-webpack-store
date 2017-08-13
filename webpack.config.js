const path = require('path');

const ROOT_PATH = path.resolve(__dirname);
const buildPath = path.resolve(ROOT_PATH, 'app', 'build');
const config = require('./config');

module.exports = {
  entry: [
    path.resolve(ROOT_PATH, 'app', 'src', 'main.jsx'),
  ],
  context: path.resolve(ROOT_PATH, 'app'),
  output: {
    path: buildPath,
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.css', '.scss'],
    alias: {
      config: path.resolve(ROOT_PATH, 'config.json'),
      lib: path.resolve(ROOT_PATH, 'lib')
    },
    enforceExtension: false
  },
  module: {
    loaders: [{
      test: /\.(js|jsx)$/,
      exclude: [/node_modules/, buildPath],
      include: path.resolve(ROOT_PATH, 'app'),
      loader: 'babel-loader'
    },
    {
      test: /.json$/,
      use: ['json-loader']
    }]
  },
  devServer: {
    hot: true,
    host: config.app.host,
    port: config.app.port
  }
};
