'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var express = require('express');
var mongoose = require('mongoose');
var config = require('./config/environment');
var schema = require('./config/schema.config.js');

global.config = {};
global.config.schema = schema;
global.config.devmode = 2;
global.config.photo_url = "http://192.168.10.142:3000/photo?zjhm=";
// global.config.photo_url = "http://home.hzjs.co:9094/photo?zjhm=";

global.config.photoAll = "http://10.125.129.215:3000/photo/getPhotoInfo?zjhm=";

//dbconnect
const dbconnect = () => {
    if (process.env.UNIT_TEST_SERVER === '1') { //清空models&modelSchemas,以免watch文件变化时产生复写错误. ps:ln/2017-08-11
        mongoose.models = {};
        mongoose.modelSchemas = {};
    } else {
        mongoose.connect(config.mongo.uri, config.mongo.options);
        mongoose.connection.on('error', function (err) {
            console.error('MongoDB connection error: ' + err);
            process.exit(-1);
        });
    }
}
dbconnect();


const app = express();


app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://' + config.ip + ':' + config.clientPort);
    res.header('Access-Control-Allow-Headers', 'Content-Type=application/jsoncharset=UTF-8')
    res.header('Access-Control-Allow-Credentials', true) //支持跨域传cookie
    //console.log(req.session,req.cookies,req.originalUrl)
    next()

})


const server = require('http').createServer(app);

//socketio
const socketio = require('socket.io')(server, {
    serveClient: config.env !== 'production',
    path: '/api/socket',
    pingInterval: 5000,
    pingTimeout: 5000,
});
require('./config/socketio')(socketio);

//route
require('./config/express')(app);
require('./routes')(app);

if (config.seedDB) { require('./config/seed'); }

//server listen
if (!module.parent) {
    server.listen(config.port, config.ip, function () {
        console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
    });
}

// Expose app
exports = module.exports = app;
