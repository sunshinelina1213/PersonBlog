'use strict';
var _ = require('lodash');
var q = require('q');
var async = require('async');
var esql = require('./esqler.js');
var dm = require('./abstractError.js');

/*
* 支持两种参数
*   一.参数为对象:
*       输入的参数:
*         {
*             one : "select * from people_type ...",
*             two : "select * from case_type ...",
*             ...
*          }
*        返回的结果:
*        {
*           success : true/false,
*           data : {
*             one : {}, //与es返回的结果相同
*             tow : {},
*             ...
*           }
*        }
*   二.参数为数组:
*       输入的参数:
*         [
*           "select * from people_type ...",
*           "select * from case_type ...",
*           ...
*         ]
*       返回的结果:
*       {
*         success : true/false,
*         data : [
*           {}, //与es返回的结果相同
*           {},
*            ...
*         ]
*       }
*
*  调用方法实例：
*       var async = require('../....../asyncExec.js');
*       async.asyncEach(sqls).then(function(data) {
*         console.log(data);
*       });
* */
function asyncEach(sqls) {
  var deferred = q.defer();
  var out;

  if(sqls instanceof Array) {
    out = [];
    dm.run(function() {
      async.each(sqls, function(sql, callback) {
        esql.exec(sql).then(function(_d) {
          if(_d.status < 400) {
            out.push(_d.data);
          } else {
            out.push(null);
          }
          callback(null,out);
        });
      }, done);
    });
  }

  if(sqls instanceof Object && !(sqls instanceof Array)) {
    out = {};
    var keys = _.keys(sqls);
    dm.run(function() {
      async.each(keys, function(item, callback) {
        var sql = sqls[item];
        esql.exec(sql).then(function(_d) {
          if(_d.status < 400) {
            out[item] = _d.data;
          } else {
            out[item] = null;
          }
          callback(null,out);
        });
      }, done);
    });
  }

  function done(err) {
    if(err) {
      deferred.resolve({success : false});
    } else {
      deferred.resolve({success : true, data : out});
    }
  }

  return deferred.promise;
}

module.exports = {
  each : asyncEach
}
