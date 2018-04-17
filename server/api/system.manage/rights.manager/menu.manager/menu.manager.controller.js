'use strict';
const async = require('async');

const configFile = require('../../../../config/rights.manager/menu.manager/menu.manager.config');
var Menu = require('./menu.manager.model.js');
var RoleMenu = require('../menu.rights.manager/menu.rights.manager.model.js');


exports.getMenuTop = function(req, res) {
    var params = req.query;
    // console.log('params',params)
    var userLogin = params.userLogin;
    if(typeof userLogin === 'string'){
        userLogin = JSON.parse(userLogin)
    }
    RoleMenu.find({'RIGHTS_KEY':userLogin.RIGHTS_KEY},function(err,results){
        if(err) return res.status(500).json({success : false,err : err});
        let rs = results.map((mess)=>{
            return mess.MENU_KEY
        })  
        // console.log('rs',rs)
        Menu.find({'MENU_KEY':{$in:rs}},function(err,menus){
            let data = transformData(configFile.menu_output,menus);
            if(err){
                return res.status(500).send({'success':'false'})
            }      
            return res.status(200).send({'success':'true', menudata :data})  
        })
    })

};
exports.getMenu = function(req, res) {
    var params = req.query;
    Menu.find({},function(err,menus){
        let data = transformData(configFile.menu_output,menus);
        // console.log('data',data)    
        if(err){
            return res.status(500).send({'success':'false'})
        }      
        return res.status(200).send({'success':'true', menudata :data,columns:configFile.menu_columns})  
    })

};
//增加
exports.addMenu = function(req, res) {
    var params = req.query;
    var record = params.record;
    if(typeof record === 'string'){
        record = JSON.parse(record)
    }
    let record2 = {
        MENU_NAME:record.name,
        MENU_KEY:record.menukey,
        PARENT_KEY:record.parentkey,
        MENU_URL:record.url,
        MENU_ICON:record.type,
        MENU_IMG:record.img
    }
    Menu.create(record2,function(err,result){
        if(err){
            return res.status(500).json({success:false,err:err});
        }
        Menu.find({},function(err,results){
            let data = transformData(configFile.menu_output,results);
            return res.status(200).json({"success":true,data:data,columns:configFile.menu_columns});
        })
    }); 
};
//删除
exports.deleteMenu = function(req, res) {
    var params = req.query;
    var record = params.record;
    if(typeof record === 'string'){
        record = JSON.parse(record)
    }
    Menu.remove({_id:record._id},function(err,data){
        Menu.find({},function(err,menus){
            if(err) return res.status(500).json(err);
            let data = transformData(configFile.menu_output,menus);
            return res.status(200).json({"success":true,data:data,columns:configFile.menu_columns});
        })
    })
     
};

//修改
exports.changeMenu = function(req, res) {
    var params = req.query;
    var record = params.record;
    if(typeof record === 'string'){
        record = JSON.parse(record)
    }
    let record2 = {
        _id: record._id,
        MENU_NAME:record.name,
        MENU_KEY:record.menukey,
        PARENT_KEY:record.parentkey,
        MENU_URL:record.url,
        MENU_ICON:record.type,
        MENU_IMG:record.img
    }
    Menu.update({_id:record2._id},{$set:record2},function (err, user){
        Menu.find({}, function (err, users) {
            if(err) return res.status(500).json(err);
            let data = transformData(configFile.menu_output,users);
            return res.status(200).json({"success":true,data:data,columns:configFile.menu_columns});
        });
    });
};

//查询
exports.searchMenu = function(req, res) {
    var params = req.query;
    var content = params.content;
    if(typeof content === 'string'){
        content = JSON.parse(content)
    }
    if(content != ''){
        var regex = new RegExp(content,'i');
        Menu.find({MENU_NAME:regex},function (err, menu){
            if(err) return res.status(500).json(err);
            let data = transformData(configFile.menu_output,menu);
            
            return res.status(200).json({"success":true,data:data,columns:configFile.menu_columns});
        });  
    }else{
        Menu.find({},function (err, menus){
            if(err) return res.status(500).json(err);
            let data = transformData(configFile.menu_output,menus);
            return res.status(200).json({"success":true});
        });
    }
};


function transformData(config, datas) {
    let out = [];

    datas.forEach((data) => {
        let obj = {};
        for(let key in config) {
            if(data[key] || data[key] === "") {
                obj[config[key]] = data[key];
            }
        }
        out.push(obj);
    });
    return out;
}

