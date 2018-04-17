/**
 * mock启动文件
 * 
 */
const path = require('path');
const bootConfig = './server/mock/_mockconfig.js';
const util = require('./server/mock/mock.util');

//读指定目录下的 *mock.json文件
const mocks = util.read('./server/api');
//将所有API的 *mock.json 文件重写到bootconfig
util.write(mocks, path.resolve("./", bootConfig), process.env.PRODUCTION || false);
//监听这些 *mock.json 文件,以实时刷新
util.watchs(mocks,bootConfig);

module.exports = require('puer-mock')(__filename,bootConfig);

