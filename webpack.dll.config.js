const webpack = require('webpack');
const path = require('path');

let plugins = [new webpack.DllPlugin({
  context: __dirname,
  path: path.join(__dirname, 'dlls', '[name]-manifest.json'),
  name: '[name]_library'
})];
if (process.env.BUILD_PRODUCTION) {
  const uglify = new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    }
  })
  plugins.push(uglify)
}


module.exports = {
  output: {
    path: path.join(__dirname, 'dlls'),
    filename: '[name].dll.js',
    library: '[name]_library'
  },
  entry: {
    vendor: ['react', 'react-dom', 'react-router', 'redux', 'react-redux', 'react-router-redux',
      'immutable', 'redux-immutable', 'redux-thunk', 'redux-logger', 'echarts-for-react',
      'es6-promise', 'isomorphic-fetch', 'redbox-react', 'classnames', 'fetch-ie8',
      'lodash', 'moment', 'socket.io-client'
    ]
  },
  module: {
    loaders: [
      {
        test: /\.js[x]?$/,
        loader: 'es3ify-loader'
      }
    ]
  },
  plugins: plugins
}
