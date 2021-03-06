var webpack = require('webpack');
var path = require('path');
var fs = require('fs');

var isProduction = function () {
  return process.env.NODE_ENV === 'production';
};

var entry = __dirname + '/src/index.js';
var libraryName = 'ReaUI';
var outputFile = libraryName + '.js';
var outputPath = './lib';

var plugins = [];

if( isProduction() ) {
  plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      test: /(\.jsx|\.js)$/,
      compress: {
        warnings: false
      },
    })
  );
}

var config = {
  target: 'node',
  cache: true,
  entry: entry,
  output: {
    path: path.join(__dirname, outputPath),
    filename: outputFile,
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    loaders: [
      {
        test: /(\.jsx|\.js)$/,
        loader: 'babel?presets[]=es2015&presets[]=react',
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'sass'],
      },
      {
        test: /\.css$/,
        loaders: ['style', 'css'],
      },
      {
        test: /\.json$/,
        loader: 'json',
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        loader: 'url?limit=8024&name=images/[name].[ext]'
      },
      {
        test: /\.(woff2?|otf|eot|svg|ttf)$/i,
        loader: 'url?name=fonts/[name].[ext]'
      },
      {
        test: /\.html$/,
        loader: 'url?name=[name].[ext]'
      },
    ],
  },
  plugins: plugins,
  resolve: {
    root: __dirname,
    extensions: ['', '.js', '.jsx']
  },
  devtool: isProduction() ? null : 'source-map',
};

module.exports = config;
