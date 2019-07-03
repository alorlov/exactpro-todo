// webpack.config.js
// var webpack = require('webpack');

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  entry: './src/index.tsx',
  resolve: {
    extensions: ['.js', '.ts', '.tsx']
  },
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
          test: /\.ts(x?)$/,
          exclude: /node_modules/,
          use: [
              {
                  loader: "ts-loader"
              }
          ]
      },
      // {
      //     enforce: "pre",
      //     test: /\.js$/,
      //     loader: "source-map-loader"
      // },
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
  // externals: {
  //     "react": "React",
  //     "react-dom": "ReactDOM"
  // }
  // plugins: [
  //   new webpack.HotModuleReplacementPlugin(),
  // ]
};
