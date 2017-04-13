const path = require('path');
const nodeExternals = require('webpack-node-externals');

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  entry: './Proteus.js',
  devtool: 'source-map',
  output: {
    path: path.join(__dirname, 'lib'),
    filename: `Proteus${isProduction ? '.min' : ''}.js`,
    library: 'Proteus',
    libraryTarget: 'umd',
  },
  target: 'node',
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: path.join(__dirname, 'src'),
      },
    ],
  },
  externals: [nodeExternals()],
};
