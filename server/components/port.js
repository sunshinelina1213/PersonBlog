/**
 * 与ESQL接口交互的代理组件
 *
 * 对外开放的接口 : exec
 * 使用示例：
 *  var sqler = require('pory');  //注意：请求pory要注意当前模块的路径，要能够定位到这个pory组件
 *  var promise = sqler.call(请求路劲,参数);
 *  promise.then(function(reps){//success},function(reps){//error});
 *
 * @author wxw
 * @date 2016-10-19
 */
'use strict';
var
  axios = require('axios'),
  q = require("q");

function call(url,param){
    var deffered = q.defer();
    axios.get(url,{
        params : param
    })
    .then(function(reps){
        return deffered.resolve({status : reps.status,data : reps.data})
    })
    .catch(function(error){
        return deffered.reject({error : error})
    });
    return deffered.promise;
}


module.exports = {
    call : call
}

