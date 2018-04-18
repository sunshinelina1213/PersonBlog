'use strict';
const fetch = require('../../common/fetch');

let co = require('co');
let helpJs = require('../../common/helper');
let _ = require('lodash');

// let configFile = require('./config/config.js');

exports.getTbIndex = function(req, res) {
    co(function*(){
        let data = yield helpJs.getPromise('/api/tubiao.index/getTbIndex');
        return res.status(200).json({
            success:true,
            headerData:data.rows
        })
    })
}