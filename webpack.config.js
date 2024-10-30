const HtmlWebpackPlugin = require("html-webpack-plugin");
const WarningsToErrorsPlugin = require('warnings-to-errors-webpack-plugin');
const path = require("path");

module.exports = {
  entry: path.join(__dirname, 'src/index.js'),
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        // loader: 'babel-loader',
        loader: 'swc-loader',
        options: {
          jsc: {
            transform: {
              react: {
                development: true,
                // refresh: true,
              },
            },
          },
          sourceMaps: true,
        },
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|svg|gif|avif)(\?[a-z0-9=.]+)?$/,
        type: 'asset',
      },
    ]
  },
  plugins: [
    // new WarningsToErrorsPlugin(),
    new HtmlWebpackPlugin({template: './public/index.html'})
  ],
  devServer: {
    hot: true,
    port: 3000,
    open: true
  }
};