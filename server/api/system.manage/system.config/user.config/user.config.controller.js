'use strict';
var fs = require('fs');
const configFile = require('../../../../config/rights.manager/user.manager/user.manager.config.js');


exports.getUserConfig = function(req, res) {
    const configData = configFile.user_columns;
    return res.status(200).json({
        success: true,
        configData: configData
    })
};

exports.changeUserConfig = function(req, res) {
    const params = req.query;
    console.log("params",params)
    var content = `
        "use strict";
        module.exports = {
            user_columns:[
                {title:${JSON.stringify(params.LOGIN_NAME)},dataIndex:'LOGIN_NAME'},
                {title:${JSON.stringify(params.LOGIN_PASSWORD)},dataIndex:'LOGIN_PASSWORD'},
                {title:${JSON.stringify(params.USER_XM)},dataIndex:'USER_XM'},
                {title:${JSON.stringify(params.USER_ZJHM)},dataIndex:'USER_ZJHM'},
                {title:${JSON.stringify(params.DEPARTMENT_NAME)},dataIndex:'DEPARTMENT_NAME'},
                {title:${JSON.stringify(params.ROLE_NAME)},dataIndex:'ROLE_NAME'}
            ]
        }`;
    fs.writeFile('server/config/rights.manager/user.manager/user.manager.config.js', content,function(err){
        if(err){
            console.error(err);  
        }else{
            console.log('写文件操作成功');
        } 
        
    });
    
    return res.status(200).json({
        success: true,
      
    })
};