var webpack = require('webpack');
var path = require('path');
var ROOT_PATH = path.resolve(__dirname);
var buildPath = path.resolve(ROOT_PATH, 'app', 'build');

module.exports = {
  entry: [
    'webpack-dev-server/client?http://0.0.0.0:4500', // WebpackDevServer host and port
    'react-hot-loader/patch',
    'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors
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
      config$: path.resolve(ROOT_PATH, 'config.json'),
      lib: path.resolve(ROOT_PATH, 'lib')
    },
    enforceExtension: false
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
  module: {
    loaders: [{
      test: /\.(js|jsx)$/,
      exclude: [/node_modules/, buildPath],
      include: path.resolve(ROOT_PATH, 'app'),
      loader: 'babel-loader'
    },{
      test: /.scss/,
      use: ['style-loader', 'css-loader', 'sass-loader']
    },
    {
      test: /.json$/,
      use: ['json-loader']
    }]
  },
  devServer: {
    historyApiFallback: true,
    hot: true,
    host: 'localhost',
    port: 4500
  }
};
