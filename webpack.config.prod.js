const path = require('path');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ROOT_PATH = path.resolve(__dirname);
const BUILD_PATH = path.resolve(ROOT_PATH, 'api', 'build');
const PORT = process.env.PORT || 4501;
const apiUrl = `http://localhost:${PORT}/api`;

module.exports = {
  devtool: 'source-map',
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
      lib: path.resolve(ROOT_PATH, 'app', 'lib')
    },
    enforceExtension: false,
  },
  plugins: [
    new webpack.DefinePlugin({
      apiUrl: JSON.stringify(apiUrl),
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    }),
    new UglifyJSPlugin(),
    new CopyWebpackPlugin([{
      from: path.resolve(ROOT_PATH, 'index.prod.html'),
      to: path.resolve(BUILD_PATH, 'index.html')
    }])
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
    ] }
};
