const path = require('path');
const nodeExternals = require('webpack-node-externals');

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  entry: './Hermes.js',
  devtool: 'source-map',
  output: {
    path: path.join(__dirname, 'lib'),
    filename: `Hermes${isProduction ? '.min' : ''}.js`,
    library: 'Hermes',
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
