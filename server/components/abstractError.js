/*
*  使用案例:
*     var dm = require('...abstractError.js'); //加载此模块，路劲根据自己的模块去写
*     dm.run(fn); //参数可以为函数名，也可以为匿名函数
*
*  特殊案例：
*     如下；初始化的时候，e和timer对象都不在domain的范围之内，此时domain不会捕获到异常；
*         正确做法是将    e和timer加到domain范围内
*         d.add(e);
*         d.add(timer);
*     此时调用方法为:dm.run(fn, e, timer);
*
*     var domain = require('domain');
      var EventEmitter = require('events').EventEmitter;

      var e = new EventEmitter();

      var timer = setTimeout(function () {
          e.emit('data');
      }, 10);
      function next() {
          e.once('data', function () {
            throw new Error('Receive data error!');
          });
      }
      var d = domain.create();
      d.on('error', function (err) {
          console.log(err);
      });
      d.run(next);
* */

var dm = require('domain').create();

function run(fn) {
  var args = [].slice.call(arguments);
  var _type = typeof fn;
  var length = args.length;

  if(length - 1 > 0) {
      for(var i = 1; i < length; i++) {
        dm.add(args[i]);
      }
  }

  if(_type == "function") {
    dm.run(fn);
    dm.on('error', function(err) {
      console.error("--------------->",err);
    });
  } else {
    return "请传入一个函数作为参数!";
  }
}


module.exports = {
  run : run
}
