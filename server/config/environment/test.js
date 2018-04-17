'use strict';
const comm = require('comm');
// Test specific configuration
// ===========================
module.exports = {
  // MongoDB connection options
  mongo: {
    uri: 'mongodb://'+comm.MONGODB_IP+'/react-nodejs-demo'
  }
};