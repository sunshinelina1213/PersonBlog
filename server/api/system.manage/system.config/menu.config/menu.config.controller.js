'use strict';
var fs = require('fs');
const configFile = require('../../../../config/rights.manager/menu.manager/menu.manager.config.js');


exports.getMenuConfig = function(req, res) {
    const configData = configFile.menu_columns;
    return res.status(200).json({
        success: true,
        configData: configData
    })
};

exports.changeMenuConfig = function(req, res) {
    const params = req.query;
    console.log('params',params)
    // const config = configFile.role_columns;
    var content = `
        "use strict";
        module.exports = {
            menu_output :{
                _id:"_id",
                MENU_NAME:"name",              
                MENU_KEY : "menukey",          
                MENU_URL:"url",              
                MENU_ICON : "type",          
                MENU_IMG:'img' ,     
                PARENT_KEY : 'parentkey'       
            },
            menu_columns:[
                {title:${JSON.stringify(params.name)},dataIndex:'name'},
                {title:${JSON.stringify(params.menukey)},dataIndex:'menukey'},
                {title:${JSON.stringify(params.type)},dataIndex:'type'},
                {title:${JSON.stringify(params.url)},dataIndex:'url'}
            ]
        }`;
    fs.writeFile('server/config/rights.manager/menu.manager/menu.manager.config.js', content,function(err){
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