'use strict';
var fs = require('fs');
const configFile = require('../../../../config/rights.manager/role.manager/role.manager.config.js');


exports.getRoleConfig = function(req, res) {
    const configData = configFile.role_columns;
    return res.status(200).json({
        success: true,
        configData: configData
    })
};

exports.changeRoleConfig = function(req, res) {
    const params = req.query;
    // const config = configFile.role_columns;
    var content = `
        "use strict";
        module.exports = {
            role_columns:[
                {title:${JSON.stringify(params.name)},dataIndex:'ROLE_NAME'},
                {title:${JSON.stringify(params.remark)},dataIndex:'REMARK'}
            ]
        }`;
    fs.writeFile('server/config/rights.manager/role.manager/role.manager.config.js', content,function(err){
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