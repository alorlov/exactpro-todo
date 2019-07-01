// webpack.config.js
// var webpack = require('webpack');

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  entry: './src/index.js',
  output: {
    path: __dirname + '/../src/main/resources/webroot/dist',
    filename: 'bundle.js',
    publicPath: '/dist/'
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
          test: /\.svg$/,
          loader: 'svg-inline-loader'
      }
    ]
  },
  // plugins: [
  //   new webpack.HotModuleReplacementPlugin(),
  // ]
};
