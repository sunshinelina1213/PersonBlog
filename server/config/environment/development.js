'use strict';

// Development specific configuration
// ==================================
const comm = require('./comm.js');
module.exports = {
  // MongoDB connection options
  mongo: {
    uri: 'mongodb://192.168.10.142/react-nodejs-demo-test2'
  },
  seedDB: true
};
