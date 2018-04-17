'use strict';
var fs = require('fs');
const configFile = require('../../../../config/rights.manager/department.manager/department.manager.config');


exports.getDepartmentConfig = function(req, res) {
    const configData = configFile.department_columns;
    return res.status(200).json({
        success: true,
        configData: configData
    })
};

exports.changeDepartmentConfig = function(req, res) {
    const params = req.query;
    var content = `
        "use strict";
        module.exports = {
            department_columns:[
                {title:${JSON.stringify(params.DEPARTMENT_NAME)},dataIndex:'DEPARTMENT_NAME'},
                {title:${JSON.stringify(params.DEPARTMENT_REMARK)},dataIndex:'DEPARTMENT_REMARK'}
            ]
        }`;
    fs.writeFile('server/config/rights.manager/department.manager/department.manager.config.js', content,function(err){
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