'use strict';

// Production specific configuration
// =================================
const comm = require('./comm');
module.exports = {
    // Server IP
    ip: comm.SERVER_IP || process.env.OPENSHIFT_NODEJS_IP ||
        process.env.IP ||
        undefined,

    // Server port
    port: comm.SERVER_PORT || process.env.OPENSHIFT_NODEJS_PORT ||
        process.env.PORT ||
        8080,

    // MongoDB connection options
    mongo: {
        uri: process.env.MONGOLAB_URI ||
            process.env.MONGOHQ_URL ||
            process.env.OPENSHIFT_MONGODB_DB_URL + process.env.OPENSHIFT_APP_NAME ||
            'mongodb://' + comm.MONGODB_IP + '/react-nodejs-demo-test2'
    }
};
