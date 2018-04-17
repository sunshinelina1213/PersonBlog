'use strict';
var fs = require('fs');
const mainConfig = require('../../../../config/system.config/main.config.js');

exports.getSystemInfo = function(req, res) {
    const systemData = mainConfig.systemConfig.data;
    // console.log('systemData',systemData)
    return res.status(200).json({
        success: true,
        systemData: systemData
    })
};
