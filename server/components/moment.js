'use strict';

var moment = require('moment');

/*
* @description 时间格式化(可传一个，两个或者一个不传，默认是系统当前时间格式为YYYY-MM-DD)
* @date 时间
* @format 格式
* */
module.exports = function(date, format) {
  if(date) {
    return moment(date, ["UTC","YYYYMMDD","YYYYMMDD hhmm","YYYYMMDD hhmmss"]).format((format || "YYYY-MM-DD"));
  } else {
    return moment().format((format || "YYYY-MM-DD"));
  }
}
