/**
 * 后台服务帮助器，常用且不与业务逻辑相关的方法可以定义在这里
 *
 * @author  ln
 * @date 2016-05-09
 *
 */
const moment = require('moment');
let fetch = require('./fetch.js');
let config = require('./../config/environment/comm.js');
let fetchUrl = 'http://localhost:' + config.MOCK_PORT;

module.exports = {
   schemaMapConvert: function() {
      console.log("---->invoke helper.....");
   },

   /*转成后台页码形式
    *param : {start : 1,limit : 10}
    *out : {start 10,limit : 10}
    */
   pageParamConvert: function(pageParam) {
      var page = {};
      if (!pageParam) {
         page = { start: 1, limit: 5 };
      } else {
         page = pageParam;
      }
      var out = {};
      var start = page.start || 1;
      if (start < 1) {
         start = 1;
      }
      var limit = page.limit || 5;
      out.start = (start - 1) * limit;
      out.limit = limit;
      return out;
   },


   /*
    * @description 时间格式化(可传一个，两个或者一个不传，默认是系统当前时间格式为YYYY-MM-DD)
    * @date 时间
    * @format 格式
    * */
   dateFormat: (date, format) => {
      if (date) {
         return moment(date, ["UTC", "YYYYMMDD", "YYYYMMDD hhmm", "YYYYMMDD hhmmss"]).format((format || "YYYY-MM-DD"));
      } else {
         return moment().format((format || "YYYY-MM-DD"));
      }
   },


   /*
    * @description 判读数据了性
    * @date 时间
    * @arg 参数
    * */
   dataType: (arg) => {
      var type = Object.prototype.toString.call(arg);
      return type.split(' ')[1].replace(']', '');
   },

   /*
    *@description 使用co封装的Promise对象
    *@date 2018/03/12
    *@arg url params
    */
  getPromise : (url, params = {}) => {
      return new Promise(function(resolve, reject) {
         fetch.get(fetchUrl + url, params).then(function(data) {
            resolve(data);
         })
      });
   }
}
