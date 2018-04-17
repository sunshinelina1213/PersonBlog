/**
 * @desc 异步fetch请求,有GET/POST
 * 
 * 
 * @auth : ln
 * @date : 2017-10-26
 * 
 */
const
    axios = require('axios'),
    _ = require('lodash');
    q = require('q');

const instance = axios.create({
    timeout: 100000,
    headers: { "Content-Type": "application/x-www-form-urlencoded" }
});
function post(curl,params) {
    var deferred = q.defer();
    console.log("post url:: %s,params:: %j", curl,params); 
    instance.post(curl,params||{}).then(function (response) {
        deferred.resolve(response.data);
    }).catch(function (error) {
        console.log("req error,cause::", error);
        deferred.reject(error);
    });
    return deferred.promise;
}
function get(curl,params) {
    var deferred = q.defer();
    console.log("get url:: %s,params:: %j", curl,params);
    instance.get(curl,{params : params}).then(function (response) {
        deferred.resolve(response.data);
    }).catch(function (error) {
        console.log("req error,cause::", error);
        deferred.reject(error);
    });
    return deferred.promise;
}

module.exports = {
    get,
    post
}