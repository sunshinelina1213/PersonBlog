'use strict';
const async = require('async');
var Role = require('../role.manager/role.manager.model.js');
var RoleMenu = require('./menu.rights.manager.model.js');
var Menu = require('../menu.manager/menu.manager.model.js');
const config = require('../../../../config/rights.manager/menu.manager/menu.manager.config.js');
const configFile = require('../../../../config/rights.manager/menu.rights.manager/menu.rights.manager.config.js');

exports.getMenuRights = function(req, res) {
    var params = req.query;
    var cond = {};
    if(params.search){
        // console.log('params.search',params.search)
        cond = {$text:{$search:params.search}};
    }
    async.series({
        count: function(callback){
            Role.find(cond).count(function(err,count){
                callback(err,count);
            });
        },
        data: function(callback){
            Role.find(cond,function(err,data){
                callback(err,data);
            }).limit(params.limit);
        }
    },function(err,results){
        // console.log("results",results)
        if(err) return res.status(500).json({success : false,err : err});
        if(results.data && results.data.length>0){
            return res.status(200).json({
                success : true, 
                columns:configFile.menurights_columns,
                data : results.data,
                total: results.count
            });
        }else{
            return res.status(200).json({success:false});
        }
    })
};
//获取分页信息
exports.getMenuRightsPage = function(req,res){
    var params = req.query;
    // console.log('getUserPage params----->',params);
    var cond = {};
    if(params.search){
        cond = {$text:{$search:params.search}};
    }

    var skipnum = (params.current - 1) * params.limit;
    // console.log('skipnum==========',skipnum)
    Role.find(cond,function(err,data){
        if(err) return res.status(500).json({success : false,err : err});
        if(data && data.length>0){
            return res.status(200).json({success : true, data : data,columns:configFile.menurights_columns,});
        }else{
            return res.status(200).json({success : false});
        }
    }).skip(skipnum).limit(params.limit);
};


exports.setMenuRights = function(req, res) {
    var params = req.query;
    var userLogin = params.userLogin;
    if(typeof userLogin === 'string'){
        userLogin = JSON.parse(userLogin)
    }
    // console.log('userLogin=======',userLogin)

    RoleMenu.find({'RIGHTS_KEY':userLogin.RIGHTS_KEY},function(err,results){
        if(err) return res.status(500).json({success : false,err : err});
        // console.log('results=====',results) //关联表信息
        let rs = results.map((mess)=>{
            return mess.MENU_KEY
        })  
        Menu.find({},function(err,results){
            let data = transformData(config.menu_output,results);
            Menu.find({'MENU_KEY':{$in:rs}},function(err,menus){ 
                if(err){
                    return res.status(500).send({'success':'false'})
                }      
                return res.status(200).send({'success':'true', menudata :menus,unseldata:data, userLogin:userLogin,columns:configFile.menurights_columns,})  
            })
        })
    })


};

exports.changeMenuRights = function(req, res) {
    var params = req.query;
    // console.log('params',params)
    
    let rights = params.RIGHTS_KEY;
    // console.log("rights",rights) 

    let menuKeys = params.menukey.split(',');


    let firstFatherkeys = params.firstFatherkeys
    // console.log("firstFatherkeys",firstFatherkeys)   
    menuKeys.push(firstFatherkeys)
    // console.log('menuKeys',menuKeys)

    RoleMenu.remove({'RIGHTS_KEY':rights},function(err,results){
        if(err){
            return res.status(500).send({'success':'false'})
        }
        let newKeys = menuKeys.map((mess)=>{
            return {RIGHTS_KEY:rights,MENU_KEY:mess}
        })  
        RoleMenu.create(newKeys,function(err,jg){  
            if(err){
                return res.status(500).send({'success':'false'})
            }       
            return res.status(200).send({'success':'true',data:jg,columns:configFile.menurights_columns,})  
        })
    })

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