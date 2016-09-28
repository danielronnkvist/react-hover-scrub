var webpack = require('webpack');
var path = require('path');
var UnminifiedWebpackPlugin = require('unminified-webpack-plugin');

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'react-hover-scrub.min.js',
    library: 'HoverScrub',
    libraryTarget: 'umd'
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: "babel",
        query: {
          presets: ["es2015", "react"]
        }
      },
      {
        test: /\.scss$/,
        loaders: [
          "style",
          "css?modules=true",
          "sass"
        ]
      },
    ]
  },
  externals: {
    'react': {
      root: 'React',
      commonjs: 'react',
      commonjs2: 'react',
      amd: 'react',
    }
  },
  resolve: {
    extensions: ['', '.js']
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': "'"+process.env.NODE_ENV+"'",
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new UnminifiedWebpackPlugin()
  ],
}
