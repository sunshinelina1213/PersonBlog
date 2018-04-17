'use strict';
const async = require('async');
var Role = require('./role.manager.model.js');
var configFile = require('../../../../config/rights.manager/role.manager/role.manager.config');

exports.getRole = function(req, res) {
    var params = req.query;
    // console.log('params',params)
    var cond = {};
    if(params.search){
        // console.log('params.search',params.search)
        cond = {$text:{$search:params.search}};
    }
    async.series({
        count: function(callback){
            Role.find(cond).count(function(err,count){
                callback(err,count);
            });
        },
        data: function(callback){
            Role.find(cond,function(err,data){
                callback(err,data);
            }).limit(params.limit);
        }
    },function(err,results){
        // console.log('results-----',results);
        if(err) return res.status(500).json({success : false,err : err});
        if(results.data && results.data.length>0){
            return res.status(200).json({
                success : true, 
                data : results.data,
                total: results.count,
                columns:configFile.role_columns
            });
        }else{
            return res.status(200).json({success:false});
        }
    })
};
//获取分页信息
exports.getRolePage = function(req,res){
    var params = req.query;
    // console.log('getUserPage params----->',params);
    var cond = {};
    if(params.search){
        cond = {$text:{$search:params.search}};
    }

    var skipnum = (params.current - 1) * params.limit;
    // console.log('skipnum==========',skipnum)
    Role.find(cond,function(err,data){
        if(err) return res.status(500).json({success : false,err : err});
        if(data && data.length>0){
            return res.status(200).json({
                success : true, 
                data : data,
                columns:configFile.role_columns
            });
        }else{
            return res.status(200).json({success : false});
        }
    }).skip(skipnum).limit(params.limit);
};

//增加
exports.addRole = function (req, res) {
    var params = req.query;
    var skip = (params.current-1)*params.limit;
    var record = params.record;
    if(typeof record === 'string'){
        record = JSON.parse(record)
    }
        
    Role.create(record,function(err,data){
        if(!err){
           async.series({
                count: function(callback){
                    Role.find({}).count(function(err,count){
                        callback(err,count);
                    });
                },
                data: function(callback){
                    Role.find({},function(err,data){
                        callback(err,data);
                    }).skip(skip).limit(params.limit);
                }
            },function(err,results){
                // console.log('results-----',results);
                if(err) return res.status(500).json({success : false,err : err});
                if(results.data && results.data.length>0){
                    return res.status(200).json({
                        success : true, 
                        data : results.data,
                        total: results.count,
                        columns:configFile.role_columns
                    });
                }else{
                    return res.status(200).json({success:false});
                }
            }) 
        }
    })
}
//删除
exports.deleteRole = function (req, res) {
    var params = req.query;
    // console.log('params==========',params)
    var skip = (params.current-1)*params.limit;
    var skip2 = (params.current-2)*params.limit;
    
    var record = params.record;
    if(typeof record === 'string'){
        record = JSON.parse(record)
    }
    // console.log('record',record)
    Role.remove(record,function(err,data){
        if(!err){
            async.series({
                count: function(callback){
                    Role.find({}).count(function(err,count){
                        callback(err,count);
                    });
                },
                data: function(callback){
                    Role.find({},function(err,data){
                        callback(err,data);
                    }).skip(skip).limit(params.limit);
                }
            },function(err,results){
                // console.log('results-----',results);
                if(results.count != 0){
                    if(err) return res.status(500).json({success : false,err : err});
                    if(results.data && results.data.length>0){
                        return res.status(200).json({
                            success : true, 
                            data : results.data,
                            total: results.count,
                            columns:configFile.role_columns
                        });
                    }
                    if(results.data.length == 0){
                        async.series({
                            count: function(callback){
                                Role.find({}).count(function(err,count){
                                    callback(err,count);
                                });
                            },
                            data: function(callback){
                                Role.find({},function(err,data){
                                    callback(err,data);
                                }).skip(skip2).limit(params.limit);
                            }
                        },function(err,result){
                            if(err) return res.status(500).json({success : false,err : err});
                            return res.status(200).json({
                                success : true, 
                                data : result.data,
                                total: results.count,
                                current:params.current-1,
                                columns:configFile.role_columns
                            });
                        })
                    }
                }else{
                    return res.status(200).json({success:true,data:[],total: results.count});
                }

            }) 
        }
    })
}

//修改
exports.changeRole = function (req,res){
    var params = req.query;
    // console.log('params',params)
    var skip = (params.current-1)*params.limit;
    var record = params.record;
    if(typeof record === 'string'){
        record = JSON.parse(record)
    }
    // console.log('record',record)
    Role.update({_id:record._id},{$set:record},function(err,role){
        if(!err){
           async.series({
                count: function(callback){
                    Role.find({}).count(function(err,count){
                        callback(err,count);
                    });
                },
                data: function(callback){
                    Role.find({},function(err,data){
                        callback(err,data);
                    }).skip(skip).limit(params.limit);
                }
            },function(err,results){
                // console.log('results-----',results);
                if(err) return res.status(500).json({success : false,err : err});
                if(results.data && results.data.length>0){
                    return res.status(200).json({
                        success : true,
                        data : results.data,
                        total: results.count,
                        columns:configFile.role_columns
                    });
                }else{
                    return res.status(200).json({success:false});
                }
            }) 
        }
    })
}