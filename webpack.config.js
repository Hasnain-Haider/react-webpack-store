var webpack = require('webpack');
var path = require('path');
var ROOT_PATH = path.resolve(__dirname);
var buildPath = path.resolve(ROOT_PATH, 'app', 'build');

module.exports = {
    entry: path.resolve(ROOT_PATH, 'app', 'src', 'main.jsx'),
    context: path.resolve(ROOT_PATH, 'app'),
    output: {
        path: buildPath,
        filename: 'bundle.js'
    },
    resolve: {
      extensions: ['.js', '.jsx', '.css', '.scss']
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
      inline: true,
      host: 'localhost',
      port: 4500
    }
};
