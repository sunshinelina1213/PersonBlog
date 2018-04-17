'use strict';
var path = require('path');
var _ = require('lodash');
const comm = require('./comm');

//process.env.IP = '192.168.2.200';
// All configurations will extend these options
// ============================================
var all = {
  //指定模式（1-->部署模式(esql->es)，2-->演示模式(config/**.json),...）
  devmode : 2,

  client: process.env.NODE_ENV==='production'?'client':'dist',
  env: process.env.NODE_ENV,

  // Root path of server
  root: path.normalize(__dirname + '/../../..'),

  // Server port
  port: comm.SERVER_PORT,
  clientPort : comm.CLIENT_PORT,

  // Server IP
  ip: comm.SERVER_IP,
  // Should we populate the DB with sample data?
  seedDB: false,

  // Secret for session, you will want to change this and make it an environment variable
  secrets: {
    session: 'react-spa-secret'
  },

  // MongoDB connection options
  mongo: {
    options: {
      db: {
        safe: true
      }
    }
  }

};

// Export the config object based on the NODE_ENV
// ==============================================
module.exports = _.merge(
  all,
  require('./' + process.env.NODE_ENV + '.js') || {});
