
var request = require('supertest');
var should = require('should');
global.request = request;

var config = require('./config/environment');
var mongoose = require('mongoose');
const dbconnect = () => {
  mongoose.connect(config.mongo.uri, config.mongo.options);
  mongoose.connection.on('error', function (err) {
    console.error('MongoDB connection error: ' + err);
    process.exit(-1);
  });
}
dbconnect();






