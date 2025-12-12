const path = require('path');
const fs = require('fs');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  mode: 'development',
  entry: {
    app: './src/index.js'
  },
  devtool: "eval-source-map",
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'build'),
    publicPath: '/', // helpful for devServer + routing
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all'
        }
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        }
      },
      // If you ever need html-loader for in-src html snippets, add a rule like this:
      // {
      //   test: /\.html$/i,
      //   include: path.resolve(__dirname, 'src'),
      //   use: ['html-loader'],
      // }
    ]
  },
  devServer: {
    static: {
      // serve the actual webpack output folder so devServer and output are consistent
      directory: path.resolve(__dirname, 'build'),
    },
    compress: true,
    port: 8080,
    hot: true,
    historyApiFallback: true,
    open: false,
  },
  plugins: [
    new webpack.DefinePlugin({
      'CANVAS_RENDERER': JSON.stringify(true),
      'WEBGL_RENDERER': JSON.stringify(true)
    }),

    // Read the index.html file directly and pass it as templateContent so that
    // html-webpack-plugin doesn't try to run it through any loader chain.
    new HtmlWebpackPlugin({
      // templateContent bypasses loader chain issues — safer for older boilerplates
      templateContent: fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf8'),
      inject: 'body',
    }),

    new CopyPlugin({
      patterns: [
        // copy assets folder into build/assets (preserves structure)
        {
          from: path.resolve(__dirname, 'assets'),
          to: path.resolve(__dirname, 'build', 'assets'),
          noErrorOnMissing: true,
        }
      ],
    })
  ],
};
