'use strict';
const async = require('async');
var Department = require('./department.manager.model.js');
var configFile = require('../../../../config/rights.manager/department.manager/department.manager.config.js');


exports.getDepartment = function(req, res) {
    var params = req.query;
    var cond = {};
    if(params.search){
        cond = {$text:{$search:params.search}};
    }
    async.series({
        count: function(callback){
            Department.find(cond).count(function(err,count){
                callback(err,count);
            });
        },
        data: function(callback){
            Department.find(cond,function(err,data){
                callback(err,data);
            }).limit(params.limit);
        }
    },function(err,results){
        // console.log('results-----',results);
        if(err) return res.status(500).json({success : false,err : err});
        if(results.data && results.data.length>0){
            return res.status(200).json({
                success : true, 
                columns:configFile.department_columns,
                data : results.data,
                total: results.count
            });
        }else{
            return res.status(200).json({success:false});
        }
    })
};
//获取分页信息
exports.getDepartmentPage = function(req,res){
    var params = req.query;
    // console.log('getUserPage params----->',params);
    var cond = {};
    if(params.search){
        cond = {$text:{$search:params.search}};
    }

    var skipnum = (params.current - 1) * params.limit;
    // console.log('skipnum==========',skipnum)
    Department.find(cond,function(err,data){
        if(err) return res.status(500).json({success : false,err : err});
        if(data && data.length>0){
            return res.status(200).json({success : true, data : data});
        }else{
            return res.status(200).json({success : false});
        }
    }).skip(skipnum).limit(params.limit);
};

//增加
exports.addDepartment = function (req, res) {
    var params = req.query;
    var skip = (params.current-1)*params.limit;
    var record = params.record;
    if(typeof record === 'string'){
        record = JSON.parse(record)
    }
    
    Department.create(record,function(err,data){
        if(!err){
           async.series({
                count: function(callback){
                    Department.find({}).count(function(err,count){
                        callback(err,count);
                    });
                },
                data: function(callback){
                    Department.find({},function(err,data){
                        callback(err,data);
                    }).skip(skip).limit(params.limit);
                }
            },function(err,results){
                // console.log('results-----',results);
                if(err) return res.status(500).json({success : false,err : err});
                if(results.data && results.data.length>0){
                    return res.status(200).json({
                        success : true, 
                        columns:configFile.department_columns,
                        data : results.data,
                        total: results.count
                    });
                }else{
                    return res.status(200).json({success:false});
                }
            }) 
        }
    })
}
//删除
exports.deleteDepartment = function (req, res) {
    var params = req.query;
    // console.log('params==========',params)
    var skip = (params.current-1)*params.limit;
    var skip2 = (params.current-2)*params.limit;
    
    var record = params.record;
    if(typeof record === 'string'){
        record = JSON.parse(record)
    }
    // console.log('record',record)
    Department.remove(record,function(err,data){
        if(!err){
            async.series({
                count: function(callback){
                    Department.find({}).count(function(err,count){
                        callback(err,count);
                    });
                },
                data: function(callback){
                    Department.find({},function(err,data){
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
                            columns:configFile.department_columns,
                            data : results.data,
                            total: results.count
                        });
                    }
                    if(results.data.length == 0){
                        async.series({
                            count: function(callback){
                                Department.find({}).count(function(err,count){
                                    callback(err,count);
                                });
                            },
                            data: function(callback){
                                Department.find({},function(err,data){
                                    callback(err,data);
                                }).skip(skip2).limit(params.limit);
                            }
                        },function(err,result){
                            // console.log('result',result)
                            if(err) return res.status(500).json({success : false,err : err});
                            return res.status(200).json({
                                success : true, 
                                columns:configFile.department_columns,
                                data : result.data,
                                total: results.count,
                                current:params.current-1
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
exports.changeDepartment = function (req,res){
    var params = req.query;
    // console.log('params',params)
    var skip = (params.current-1)*params.limit;
    var record = params.record;
    if(typeof record === 'string'){
        record = JSON.parse(record)
    }
    // console.log('record',record)
    Department.update({_id:record._id},{$set:record},function(err,role){
        if(!err){
           async.series({
                count: function(callback){
                    Department.find({}).count(function(err,count){
                        callback(err,count);
                    });
                },
                data: function(callback){
                    Department.find({},function(err,data){
                        callback(err,data);
                    }).skip(skip).limit(params.limit);
                }
            },function(err,results){
                // console.log('results-----',results);
                if(err) return res.status(500).json({success : false,err : err});
                if(results.data && results.data.length>0){
                    return res.status(200).json({
                        success : true, 
                        columns:configFile.department_columns,
                        data : results.data,
                        total: results.count
                    });
                }else{
                    return res.status(200).json({success:false});
                }
            }) 
        }
    })
}