(function() {
  'use strict';

  /*
   * @description
   * 作用:根据结构配置文件将一种数据结构转换成目标数据结构
   * 可转换类型:
   *     简单的值映射，只转换键名:
   *         配置示例: {目标键名: 原始键名}
   *     目标数组对应原始字段组合:
   *         配置示例: {目标键名: [源始键名, 原始键名]}
   *     任意目标结构对应原始字段:
   *         配置示例: {目标键名: {目标键名:原始键名}, 目标键名: 原始键名}
   *     对象数组结构转换:
   *         配置示例: {目标键名: [原始键名, {目标键名:原始键名},...]}
   *         转换结果: {目标键名:[{目标对象结构},{目标对象结构}]}
   * 使用:
   *     dataTransformer.run(配置信息[json对象], 原始数据[json对象])
   *     返回目标数据结构[json对象]
   * 注意事项:
   *     1. 注意大小写区别
   */
  var _transformer = {
    _version: "1.1.2",
    //输出日志信息到控制台开关
    _debug_flag: false,
    //如果从某对象中取某一键值，该键值不存在时，默认返回的字符串
    _default_value: "",
    //配置时多层级字段间的分隔符。. 号可能与原始键名有冲突，改为 > 号
    _key_split: ">",
    /**
     * @ngdoc function
     * @name _is_empty_value
     * @methodOf _transformer
     *
     * @description
     * 公开一个外部方法，用来判断某一个转换后的值是否是空值
     *
     * @param {Boolean} _value 要判断的值.
     */
    _is_empty_value: function(_value){
      return _value === _transformer._default_value;
    },
    /**
     * @ngdoc function
     * @name _set_debug
     * @methodOf _transformer
     *
     * @description
     * 公开一个外部设置是否打开日志输出的方法
     *
     * @param {Boolean} _value 是否输出日志.
     */
    _set_debug: function(_value){
      _transformer._debug_flag = _value;
    },
    /**
     * @ngdoc function
     * @name _get_key
     * @methodOf _transformer
     *
     * @description
     * 将客户端键名转换回服务端原始键名
     *
     * @param {Object} _key  客户端键名.
     * @param {Object} _dict 键名配置字段.
     */
    _get_key: function(_key, _dict){
      var _source_key = _key;
      var _ks = []
      if(_dict.hasOwnProperty(_key)){
        _ks = _dict[_key].split(_transformer._key_split);
        _source_key = _ks[_ks.length - 1];
      } else {
        _transformer._warn("警告: 原始键名 [", _key, "] 在配置信息 [", _dict, "] 中不存在");
      }
      return _source_key;
    },
    /**
     * @ngdoc function
     * @name _trans_it
     * @methodOf _transformer
     *
     * @description
     * 转换入口函数
     *
     * @param {Object} _tpl 配置信息对象.
     * @param {Object} _raw 与该配置信息对象匹配的原始数据字段.
     */
    _trans_it: function(_tpl, _raw){
      //创建一个空的临时对象，用来存储最终转换完成的数据结构对象
      var _target = {};
      _transformer._trans_obj(_tpl, _raw, _target);
      return _target;
    },
    /**
     * @ngdoc function
     * @name _trans_obj
     * @methodOf _transformer
     *
     * @description
     * 处理一个对象的转换,会被递归调用
     *
     * @param {Object} _tpl_obj 配置信息对象.
     * @param {Object} _raw_obj 与该配置信息对象匹配的原始数据字段.
     * @return {Object} _target_obj 转换后的数据结构对象.
     */
    _trans_obj : function(_tpl_obj, _raw_obj, _target_obj){
      var _k, //配置的键名
        _v, //配置的键值，代表原始数据的键名
        _t, //配置的键值类型，用以判断待转换的数据结构
        _raw_v, //原始数据中待转换的值
        _i;
      //遍历处理每一个映射模板中的属性值
      for(_k in _tpl_obj){
        _target_obj[_k] = {};
        _v = _tpl_obj[_k];
        _t = typeof(_v);
        //处理字符串对象的转换
        if(_t === "string"){
          _transformer._log("--- 转换键值 ---> ", _v, _raw_obj);
          _raw_v = _transformer._try_get_data(_v, _raw_obj);
          if("object" === typeof(_raw_v)){
            _transformer._log("注意: 目标值是对象[", _v, ":", _raw_v, "]");
          }
          _target_obj[_k] = _raw_v;
        } else if(_t === "object"){
          //处理数组对象的转换
          if(_transformer._is_array(_v)){
            _target_obj[_k] = [];
            //传入的目标结构为引用传递
            _transformer._trans_arr(_v, _raw_obj, _target_obj[_k]);
          } else { //处理其他对象的转换，递归调用自身
            _transformer._log("--- 递归处理 ---> ", _v, _raw_obj, _target_obj[_k]);
            //传入的目标结构为引用传递
            _transformer._trans_obj(_v, _raw_obj, _target_obj[_k]);
          }
        }
      }
    },
    /**
     * @ngdoc function
     * @name _trans_arr
     * @methodOf _transformer
     *
     * @description
     * 处理数组对象的转换
     *
     * @param {Object} _tpl_obj 配置信息对象.
     * @param {Object} _raw_obj 与该配置信息对象匹配的原始数据字段.
     * @return {Object} _target_obj 转换后的数据结构对象.
     */
    _trans_arr: function(_tpl_data, _raw_obj, _target_obj){
      _transformer._log("--- 转换数组对象 ---> ", _tpl_data, _raw_obj, _target_obj);
      var len = _tpl_data.length;
      var i = 0;
      if(len > 1){
        //第二个对象也是字符串，说明整个数组都是从源数据中手动组装
        if(typeof(_tpl_data[1]) === "string"){
          for (i = 0; i < len; i++) {
            _target_obj.push(_transformer._try_get_data(_tpl_data[i], _raw_obj));
          };
          //第二个值为对象，说明整个数组是对象的组合，需要再次遍历处理
        } else if(typeof(_tpl_data[1]) === "object" && len === 2){
          //源数据的键名
          var _raw_obj_key = _tpl_data[0];
          //源数据的值,应该为一个对象数组
          var _raw_obj_data = _transformer._try_get_data(_raw_obj_key, _raw_obj);
          if(_transformer._is_array(_raw_obj_data)){
            _transformer._log("--- START !!处理目标数据对象!! ---> ");
            len = _raw_obj_data.length;
            for (i = 0; i < len; i++) {
              var __target = {};
              _transformer._trans_obj(_tpl_data[1], _raw_obj_data[i], __target);
              _target_obj.push(__target);
            };
            _transformer._log("--- END !!处理目标数据对象!! ---> ");
          } else {
            _transformer._warn("警告:目标值非数组对象:[", _raw_obj_key, ":", "_raw_obj_data", "]");
          }
        }
      } else {
        _transformer._warn("警告:映射表字段数组长度不足2,无法解析!", _tpl_data, _raw_obj, _target_obj);
      }
      _transformer._log("--- 转换数组对象 ---> ", _tpl_data, _raw_obj, _target_obj);
    },
    /**
     * @ngdoc function
     * @name _try_get_data
     * @methodOf _transformer
     *
     * @description
     * 尝试从一个对象获取指定键名的值，如果不存在该键则返回尝试获取的键名作为值
     *
     * @param {String} _key 尝试要获取的键名,可以为"aaa.bbb.ccc.ddd"形式.
     * @param {Object} _dict 尝试获取某值的对象.
     */
    _try_get_data: function(_key, _dict){
      var _dft = _transformer._default_value;
      if(typeof(_key) === "undefined") {
        _transformer._warn("注意: [", _key, "] 未定义");
        return _dft;
      }
      if(_key === "") {
        _transformer._warn("注意: [", _key, "] 为空");
        return _dft;
      }
      if(typeof(_dict) === "undefined"){
        _transformer._warn("注意: [", _dict, "] 对象未定义");
        return _dft;
      }
      if(_dict.hasOwnProperty(_key)){
        return _dict[_key];
      }
      var _ks = _key.split(_transformer._key_split);
      if(_ks.length <= 1) {
        _transformer._warn("注意: [", _key, "] 在 [", _dict, "] 中不存在");
        return _dft;
      } else {
        _transformer._log("注意: 在 [", _dict, "] 中尝试获取多级变量 [", _key, "]");
        _key = _ks[0];
        if(_dict.hasOwnProperty(_key)){
          var obj = _dict[_key];
          _key = _ks[1];
          if(_ks.length > 2){
            //[aaa,bbb,ccc] => "bbb.ccc"
            var _new_key = _ks.splice(1, _ks.length - 1).join(_transformer._key_split);
            _transformer._log("注意!!!!!: 递归尝试 [", _new_key, "] 在 [", obj, "] 中");
            return _transformer._try_get_data(_new_key, obj);
          } else {
            if(obj.hasOwnProperty(_key)){
              return obj[_key];
            } else {
              _transformer._warn("注意: [", _key, "] 在 [", obj, "] 中不存在");
              return _dft;
            }
          }
        } else {
          _transformer._warn("注意: [", _key, "] 在 [", _dict, "] 中不存在");
          return _dft;
        }
      }
    },
    /**
     * @ngdoc function
     * @name _is_array
     * @methodOf _transformer
     *
     * @description
     * 判断一个对象是否是数组，是的话返回true，否则返回false
     *
     * @param {Object} obj 待判断的对象.
     */
    _is_array: function(obj){
      return Object.prototype.toString.call(obj) === '[object Array]';
    },
    /**
     * @ngdoc function
     * @name _debug
     * @methodOf _transformer
     *
     * @description
     * 代理调试日志输出函数,注入日志输出的头部信息
     */
    _debug: function(){
      if(!_transformer._debug_flag) return;
      console.debug.apply(console, _transformer._log_args(arguments));
    },
    /**
     * @ngdoc function
     * @name _log
     * @methodOf _transformer
     *
     * @description
     * 代理调试日志输出函数,注入日志输出的头部信息
     */
    _log: function(){
      if(!_transformer._debug_flag) return;
      console.log.apply(console, _transformer._log_args(arguments));
    },
    /**
     * @ngdoc function
     * @name _warn
     * @methodOf _transformer
     *
     * @description
     * 代理调试日志输出函数,注入日志输出的头部信息
     */
    _warn: function(){
      if(!_transformer._debug_flag) return;
      console.warn.apply(console, _transformer._log_args(arguments));
    },
    /**
     * @ngdoc function
     * @name _error
     * @methodOf _transformer
     *
     * @description
     * 代理调试日志输出函数,注入日志输出的头部信息
     */
    _error: function(){
      console.error.apply(console, _transformer._log_args(arguments));
    },
    /**
     * @ngdoc function
     * @name _log_args
     * @methodOf _transformer
     *
     * @description
     * 组装调试信息，注入插件名称及版本号
     */
    _log_args: function(args){
      var _args = ["[dataTransformer("+_transformer._version+")]"];
      for(var _a in args){
        _args.push(args[_a]);
      }
      return _args;
    }
  };

  //定义测试数据
  var _test_data = {
    _raw : { //测试用，模拟从服务端返回的数据
      xm1: "xm1data",
      sfz1: "sfz1data",
      zt1: "zt1data",
      cz1: "cz1data",
      ajbh1: "ajbh1data",
      ajsj1: "ajsj1data",
      arr1: "arr1data",
      arr2: "arr2data",
      arr3: "arr3data",
      asdf: {
        ccc:{
          aaa: "aaadata",
          bbb: "bbbdata"
        }
      },
      same_array1: ["same_array1data1", "same_array1data2", "same_array1data3"],
      cars1: [
        {
          pz1: "pz1data1",
          fdjh1: "fdjh1data1",
          pl1:"1.4"
        },
        {
          pz1: "pz1data2",
          fdjh1: "fdjh1data2",
          pl1:"2.0"
        }
      ]
    },
    _tpl : { //测试用，模拟数据结构映射配置信息
      xm: "xm1",
      sfz: "sfz1",
      aaaaa: "asdf>ccc>aaa",
      bbbbb: "asdf>ccc>bbb",
      ajxx: {
        ajbh: {
          ajbh_fake:"ajbh1"
        },
        ajsj: "ajsj1"
      },
      same_array: "same_array1",
      new_array: ["arr1", "arr2", "arr3"],
      cars: ["cars1",
        {
          pz: "pz1",
          fdjh: "fdjh1"
        }
      ],
      nokey: "nokey"
    },
    _result : { //转换后的数据结构
      xm: "xm1data",
      sfz: "sfz1data",
      aaaaa: "aaadata",
      bbbbb: "bbbdata",
      ajxx: {
        ajbh: { ajbh_fake: "ajbh1data" },
        ajsj: "ajsj1data"
      },
      same_array: ["same_array1data1", "same_array1data2", "same_array1data3"],
      new_array: ["arr1data", "arr2data", "arr3data"],
      cars: [
        {
          pz:"pz1data1",
          fdjh:"fdjh1data1"
        },
        {
          pz:"pz1data2",
          fdjh:"fdjh1data2"
        }
      ],
      nokey: "nokey"
    }
  };
  //返回模块的公共方法
  module.exports = {
    run         : _transformer._trans_it,
    getKey      : _transformer._get_key,
    setDebug    : _transformer._set_debug,
    isEmptyValue: _transformer._is_empty_value,
    test        : function(){
      _transformer._debug_flag = true;
      _transformer._log("配置信息:", _test_data._tpl);
      _transformer._log("源端数据:", _test_data._raw);
      _transformer._log("结果数据:", _transformer._trans_it(_test_data._tpl, _test_data._raw));
    }
  };
})();
