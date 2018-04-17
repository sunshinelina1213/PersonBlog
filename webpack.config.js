// Learn more on how to config.
// - https://github.com/ant-tool/atool-build#配置扩展

const webpack = require('atool-build/lib/webpack');
const fs = require('fs');
const path = require('path');
const glob = require('glob');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackHzjsIconfontPlugin = require('webpack-hzjs-iconfont-plugin');

module.exports = function (webpackConfig) {
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
            }, {
                from: './static/font_icon',
                to: './static/font_icon'
            }, {
                from: './static/img',
                to: './static/img'
            }])
    );

    const widthDoc = process.argv[process.argv.length - 1] === 'doc'

    webpackConfig.plugins.push(
        new webpack.DefinePlugin({
            __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'true')),
            __PRODUCTION__: JSON.stringify(JSON.parse(process.env.BUILD_PRODUCTION || 'false')),
            __CONTEXT__: JSON.stringify(process.env.CONTEXT_PATH),
            __ISO__: JSON.stringify(JSON.parse(process.env.BUILD_ISO || 'false'))
        })
    );


    const hasDlls = fs.existsSync('./dlls/vendor-manifest.json');
    //动态生成入口index.html
    webpackConfig.plugins.push(
        new HtmlWebpackPlugin({
            title: '警务大数据应用平台',
            template: 'src/entries/index.ejs',
            inject: 'body',
            hasDlls: !!hasDlls
        })
    )


    webpackConfig.plugins.push(
        new WebpackHzjsIconfontPlugin({
            DEV: 'test',
            path: __dirname,
            // serverIp: "http://localhost:3333"//本地测试地址
            serverIp: "http://47.97.161.209:3333"//提交iconfont服务器地址
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
    //加上markdown的解析
    webpackConfig.module.loaders.push({
        test: /\.md$/,
        loader: 'html!markdown'
    });
    webpackConfig.plugins.find((item) => {
        if (item.chunkNames === 'common') {
            // item.names = ['common', 'manifest'];
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
            // loader.loader = 'url?limit=8192&name=images/[name]_[hash:8].[ext]';
            loader.loader = 'file?name=images/[name]_[hash:8].[ext]';
            loader.include = [
                path.join(process.cwd(), './src'),
                path.join(process.cwd(), './static/img')
            ]
        }
        /*if (loader.loader === 'babel'){
          loader.include = [
            path.join(process.cwd(), './src'),
            path.join(process.cwd(), './test')
          ]
        }*/
    });

    // Load src/entries/*.js as entry automatically.
    const files = glob.sync('./src/entries/*.js');
    const newEntries = files.reduce((memo, file) => {
        const name = path.basename(file, '.js');
        memo[name] = file;
        return memo;
    }, {});
    webpackConfig.entry = Object.assign({}, webpackConfig.entry, newEntries);
    webpackConfig.resolve.alias = webpackConfig.resolve.alias || require('./alias');

    return webpackConfig;


};
