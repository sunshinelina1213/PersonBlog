/**
 * 与ESQL接口交互的代理组件
 *
 * 对外开放的接口 : exec
 * 使用示例：
 *  var sqler = require('esqler');  //注意：请求esqler要注意当前模块的路径，要能够定位到这个esqler组件
 *  var promise = sqler.exec('select * from people_type');
 *  promise.then(function(reps){//success},function(reps){//error});
 *
 * @author ln
 * @date 2016-08-09
 */
'use strict';
var
  axios = require('axios'),
  q = require("q"),
  // baseUrl = 'http://10.125.129.215:8089/esql/rest/search',
  baseUrl = 'http://192.168.10.200:8086/esql/rest/search',
  scoreUrl = 'http://10.125.129.215:8089/esql/rest/script',
  // allPhotoUrl = 'http://10.125.129.215:3000/photo/getPhotoInfo',
  allPhotoUrl = 'http://192.168.10.142:3000/photo/getPhotoInfo',
  getInternetUrl="http://10.125.129.215:3000/getNetData",
  relationUrl="http://10.125.129.215:9500/ToolSet/rest/relationSingleByType";
  

  //测试环境
  //baseUrl="http://192.168.199.83:8089/esql/rest/search";

function exec(sql){
    console.info("sql--->",sql);
    var deffered = q.defer();
    axios.get(baseUrl,{
        params : {sql : sql ||''}
    })
    .then(function(reps){
        return deffered.resolve({status : reps.status,data : reps.data});
    })
    .catch(function(error){
        return deffered.reject({error : error});
    });
    return deffered.promise;
}

function  getInternet(_sql){
  console.info("sql--->",_sql);
  var deffered = q.defer();
  axios.get(getInternetUrl,{
    params : {zjhm : _sql ||''}
  })
    .then(function(reps){
      return deffered.resolve({status : reps.status,data : reps.data});
    })
    .catch(function(error){
      return deffered.reject({error : error});
    });
  return deffered.promise;
}
function getDataByScore(sql) {
  console.log("socreSql--->",sql);
  var deffered = q.defer();
  axios.get(scoreUrl,{
    params : {param : sql ||''}
  })
  .then(function(reps){
    return deffered.resolve({status : reps.status,data : reps.data})
  })
  .catch(function(error){
    return deffered.reject({error : error})
  });
  return deffered.promise;
}

function relationInterface(params) {
  console.log("params--->",params);
  var deffered = q.defer();
  axios.get(relationUrl,{
    params : {params : params ||''}
  })
  .then(function(reps){
    return deffered.resolve(reps.data)
  })
  .catch(function(error){
    return deffered.reject({error : error})
  });
  return deffered.promise;
}

function getAllPhotos(id) {
  console.log("id--->", id);
  var deffered = q.defer();
  axios.get(allPhotoUrl,{
    params : {zjhms : id ||''}
  })
    .then(function(reps){
      return deffered.resolve(reps.data)
    })
    .catch(function(error){
      return deffered.reject({error : error})
    });
  return deffered.promise;
}

module.exports = {
    /**
     * @argument  sql
     * @return promise
     * @reps : {status : 200,data : {}}
     */
    getInternet:getInternet,
    exec : exec,
    getDataByScore : getDataByScore,
    relationInterface : relationInterface,
    getAllPhotos : getAllPhotos
};

