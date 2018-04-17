(function(){
    'use strict';
    var fs=require('fs');

    var extend,
        dataType,
        getJson,
        dataTransformer;

    /*
     *转换数据的一些常用方法
     */

    /*
     *合并对象 参数：（param1,param2,param3...）
     *返回值为:Object
     */
    extend=function(){
        var temp={};
        for(var i=0;i<arguments.length;i++){
            for(var key in arguments[i]){
                temp[key]=arguments[i][key];
            }
        }
        return temp;
    };

    /*
     *参数：(param)
     *返回数据类型  Number String Object Undefined Null Boolean Function Date RegExp 等类型
     *返回值为String类型
     */
    dataType=function(arg){
        var type=Object.prototype.toString.call(arg);
        return type.split(' ')[1].replace(']','');
    };

    /*
     *参数：（config,arg）
     *数据转化config为配置 arg为需要转化的对象或数组
     *返回值类型 根据传入数据类型而定
     */
    dataTransformer=function(){
        var config,
            arg;
        if(arguments.length>1){
            config=arguments[0];
            arg=arguments[1];
        }else if(arguments.length==1){
            config={};
            arg=arguments[0];
        }
        if(dataType(arg)==='Array'){
            var temp={};
            for(var key in arg){
                if(dataType(arg[key])==='Object'){
                    temp=extend(dataTransformer(config,arg[key]),temp);
                }
                if(config.hasOwnProperty(key)){
                    temp[config[key]]=arg[key];
                }
            }
        }else if(dataType(arg)==='Object'){
            var temp=[];
            for(var i=0;i<arg.length;i++){
                temp.push(dataTransformer(config,arg[i]));
            }
        }else{
            return [];
        }
        return temp;
    };

    /*
     *参数：（dirname） dirname文件的绝对路径
     *返回值类型 字符串
     */
    getJson=function(dirname){
        var readStream =fs.createReadStream(dirname);
        readStream.setEncoding('UTF-8');
        var data='';
        var promise=new Promise(function(resolve,reject){
            readStream.on('data',function(chunk){
                data+=chunk;
            })
            readStream.on('end',function(){
                data=data.replace(/(http:\/\/)/mg,"http:##");
                data=data.replace(/(\/\/.*$)|(\/\*.*\*\/)/mg,"");
                data=data.replace(/(http:##)/mg,"http://");
                resolve(data);
            })
            readStream.on('error',function(err){
                console.log(err);
                reject(err);
            })
        })
        return promise;
    };

    module.exports={
        run:dataTransformer,
        extend:extend,
        getJson:getJson,
        getType:dataType
    };

})();
