const fs = require('fs');
const path = require('path');
const _ = require("lodash");
const jsonComment = require('strip-json-comments');
const mockSuffix = /mock\.json$/;
const util = require('./watch.help');


function write(data, xpath, isProc) {
    const out = generateApiWithRuntime(merge(data),isProc);
    //console.log("write data::",out);
    fs.writeFileSync(xpath, new Buffer("module.exports = " + JSON.stringify(out)), { encoding: 'utf-8' });
}

function generateApiWithRuntime(api, isProc) {
    if( !isProc) Object.keys(api).forEach(i =>(api[i].proxy && delete api[i].proxy))
    return {api:api}
}

function read(dirOrFile, buf) {
    buf = buf || {};
    const stats = fs.statSync(dirOrFile);
    if (stats.isFile()) {
        if (mockSuffix.test(dirOrFile)) {
            //console.log("mock config::",dirOrFile);
            var mockConfigContent = fs.readFileSync(dirOrFile, { encoding: 'utf-8' });
            // 通过 stripJsonComments 让 JSON 文件中可以使用注释
            buf[dirOrFile] = JSON.parse(jsonComment(mockConfigContent));
        }
    } else if (stats.isDirectory()) {
        const filenames = fs.readdirSync(dirOrFile);
        filenames.forEach(function (file) {
            read(path.resolve(dirOrFile, file), buf);
        })
    }
    return buf
}
function merge(obj) {
    let api = {};
    Object.keys(obj).forEach(i => {
        api = _.merge(api, obj[i])
    });
    return api
}
function watchs(cfgs, bootstrapFile) {
    Object.keys(cfgs).forEach(i => {
        watch(i, bootstrapFile);
    })
}

function watch(mockConfigFile, bootstrapFile) {
    fs.watch(mockConfigFile, (eventType, filename) => {
        if (filename) {
            //console.log("change file::", filename);
            fs.utimes(bootstrapFile, new Date(), new Date()); //触发pure在线刷新
        }
    });
    const mockConfigFileWatcher = util.watchFile(mockConfigFile, function (filename) {
        util.unwatchFile(mockConfigFileWatcher, filename);
        fs.utimes(bootstrapFile, new Date(), new Date());
    });
}

module.exports = {
    watchs,
    read,
    write
};