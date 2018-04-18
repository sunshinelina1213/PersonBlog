// Learn more on how to config.
// - https://github.com/ant-tool/atool-build#配置扩展

const webpack = require('atool-build/lib/webpack');
const fs = require('fs');
const path = require('path');
const glob = require('glob');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const comm = require('./server/config/environment/comm');







module.exports = function (webpackConfig) {
  webpackConfig.name = 'client';
  webpackConfig.babel.plugins.push('transform-runtime');
  webpackConfig.babel.plugins.push(['import', { //默认导入antd样式 ps:ln/2017-08-03
    libraryName: 'antd'
  }]);
  webpackConfig.plugins.unshift(
    new CopyWebpackPlugin([
      {
        from: './favicon.ico'
      },
      {
        from: './static/css',
        to: './css'
      },
      {
        from: './static/js',
        to: './js'
      }, {
        from: './static/img',
        to: './images'
      }, {
        from: './static/iconfont',
        to: './iconfont'
      }, {
        from: './dlls',
        to: './dlls'
      }])
  );
  const definePlugins = new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(JSON.parse(process.env.BUILD_PRODUCTION || 'false')),
    __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'true')),
    __PRODUCTION__: JSON.stringify(JSON.parse(process.env.BUILD_PRODUCTION || 'false')),
    __CONTEXT__:  JSON.stringify("http://"+comm.SERVER_IP +':' + comm.SERVER_PORT),
    __ISO__: JSON.stringify(JSON.parse(process.env.BUILD_ISO || 'false')),
  })


  webpackConfig.plugins.push(definePlugins);

  const hasDlls = fs.existsSync('./dlls/vendor-manifest.json');
  //动态生成入口index.html
  webpackConfig.plugins.push(
    new HtmlWebpackPlugin({
      title: '个人博客平台',
      template: 'src/entries/index.ejs',
      filename: 'index.ejs',
      inject: 'body',
      hasDlls: !!hasDlls,

      html: '<%-__html__%>',
      initialData: 'window.__INITIAL_STATE__= <%-__state__%>',
      hash: false,    //为静态资源生成hash值
      minify: {    //压缩HTML文件
        removeComments: true,    //移除HTML中的注释
        collapseWhitespace: true    //删除空白符与换行符
      }
    })
  )

  if (hasDlls) {
    webpackConfig.plugins.push(
      new webpack.DllReferencePlugin({
        context: __dirname,
        manifest: require('./dlls/vendor-manifest.json')
      })
    )
  }

  // Enable this if you have to support IE8.
  webpackConfig.module.loaders.unshift({
    test: /\.js[x]?$/,
    loader: 'es3ify-loader'
  });

  webpackConfig.plugins.find((item) => {
    if (item.chunkNames === 'common') {
      item.filenameTemplate = 'js/common.js';
      return true;
    }
    return false;
  })
  webpackConfig.output.filename = '[name].[chunkHash:8].js';
  webpackConfig.output.chunkFilename = 'chunks/[name]_[chunkhash:8].js';


  // Support CSS Modules
  // Parse all less files as css module.
  webpackConfig.module.loaders.forEach((loader, index) => {
    if (typeof loader.test === 'function' && loader.test.toString().indexOf('\\.less$') > -1) {
      loader.include = /node_modules/;
      loader.test = /\.less$/;
    }
    if (loader.test.toString() === '/\\.module\\.less$/') {
      loader.exclude = /node_modules/;
      loader.test = /\.less$/;
    }
    if (typeof loader.test === 'function' && loader.test.toString().indexOf('\\.css$') > -1) {
      loader.include = /node_modules/;
      loader.test = /\.css$/;
    }
    if (loader.test.toString() === '/\\.module\\.css$/') {
      loader.exclude = /node_modules/;
      loader.test = /\.css$/;
    }
    if (loader.test.toString().includes('(png|jpg|jpeg|gif)')) {
      loader.loader = 'file?name=images/[name]_[hash:8].[ext]';
      loader.include = [
        path.join(process.cwd(), './src'),
        path.join(process.cwd(), './static/img')
      ]
    }
  });

  // Load src/entries/*.js as entry automatically.
  const files = glob.sync('./src/entries/*.js');
  const newEntries = files.reduce((memo, file) => {
    const name = path.basename(file, '.js');
    memo[name] = file;
    return memo;
  }, {});
  webpackConfig.entry = Object.assign({}, webpackConfig.entry, newEntries);
  webpackConfig.resolve.alias = webpackConfig.resolve.alias || require('./alias')


  return [webpackConfig, {
    name: 'server',
    target: "node",
    context: path.join(__dirname, "./"),
    entry: { index: './src/server' },
    output: {
      path: path.resolve(__dirname, "./client"), //静态资源会再这目录下
      filename: "server.js",
      publicPath: "/", //html里面的引用路径会变成这个
      libraryTarget: "commonjs2"
    },
    resolve: {
      alias: require('./alias'),
      extensions: ['', '.js', '.less', '.css', '.png', '.jpg'], //第一个是空字符串! 对应不需要后缀的情况.
      root: './src',
    },
    module: {
      loaders: [{
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }, {
        test: /\.json$/,
        loader: "json-loader"
      }, {
        test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader")
      }, {
        test: /\.less$/,
        exclude: /node_modules/,
        loader: ExtractTextPlugin.extract(
          'css?sourceMap!' +
          'less?sourceMap'
        )
      }, {
        test: /\.(png|jpg|jpeg|gif)$/,
        exclude: /node_modules/,
        include: [
          path.join(process.cwd(), './src'),
          path.join(process.cwd(), './static/img')
        ],
        loader: 'url?name=images/[name]_[hash:8].[ext]'
      }]
    },
    plugins: [
      new ExtractTextPlugin('index.css'),
      definePlugins
    ]
  }]
} 
 

