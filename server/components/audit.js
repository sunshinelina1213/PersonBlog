'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    q = require('q'),
    schemaConfig = require('../config/schema.config.js');

var AuditSchema = new Schema(schemaConfig.auditModel.cols);
var Audit = mongoose.model(schemaConfig.auditModel.name, AuditSchema);


//添加日志
function create(parm) {
  //var ip = req.connection.remoteAddress;
  var date=new Date();
  var audit={
        USER_NAME : "周乐信",                         
        USER_IP : "192.168.199.149",                          
        USER_SQL : "select * from people_all",                         
        AUDIT_TIME : date,                          
        SQL_TYPE : "查询",                          
        AUDIT_TABLE : "people_all",                       
        USER_MODEL : "cloud.seaech",
        AUDIT_CONTEXT : "航班和轨迹碰撞"                         
  };
  Audit.create(audit);
}

//根据操作用户查找日志
function findByUser(res,userName) {
  Audit.find({userName : userName}, function(err, audits) {
    if(err) {
      handleError(res,err);
    }
    return res.status(200).json(audits);
  })
}

//查询所有日志
function findAll(res) {
  var defered = q.defer();
  Audit.find({}, function(err, audits) {
    if(err) {
      handleError(res,err);
      defered.resolve({success : err, data : []});
    }
    console.log("aaaa",audits);
    defered.resolve({success : true, data : audits});
    // return res.status(200).json(audits);
  });
  return defered.promise;
}

function handleError(res,err) {
  return res.status(500).send(err);
}

//删除所有日志
function remove(res){
    Audit.remove({}, function(err, audits) {
    });
}
module.exports = {
  create : create,
  findByUser : findByUser,
  findAll : findAll,
  remove : remove
}
