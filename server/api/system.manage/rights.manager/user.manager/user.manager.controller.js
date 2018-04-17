'use strict';
const async = require('async');
var User = require('./user.manager.model.js');
var Role = require('../role.manager/role.manager.model.js');
var Department = require('../department.manager/department.manager.model.js');
var configFile = require('../../../../config/rights.manager/user.manager/user.manager.config');

exports.getUser = function(req, res) {
    var params = req.query;
    var cond = {};
    if(params.search){
        // console.log('params.search',params.search)
        cond = {$text:{$search:params.search}};
    }
    async.series({
        count: function(callback){
            User.find(cond).count(function(err,count){
                callback(err,count);
            });
        },
        data: function(callback){
            User.find(cond,function(err,data){
                callback(err,data);
            }).limit(params.limit);
        }
    },function(err,results){
        if(err) return res.status(500).json({success : false,err : err});
        if(results.data && results.data.length>0){
            Role.find({},function(err,roles){
                if(err) return res.status(500).json({err:err});
                Department.find({},function(err,deps){
                    // console.log('roles',roles)
                    // console.log('user',results.data)
                    if(err) return res.status(500).json({err:err});
                    res.status(200).json({
                        success:true,
                        columns:configFile.user_columns,
                        total: results.count,
                        data:results.data,
                        roledata:roles,
                        role:{},
                        departmentdata:deps,
                        department:{}
                    });
                })
               
            })
        }else{
            return res.status(200).json({success:false});
        }
    })
};

//获取分页信息
exports.getUserPage = function(req,res){
    var params = req.query;
    // console.log('getUserPage params----->',params);
    var cond = {};
    if(params.search){
        cond = {$text:{$search:params.search}};
    }

    var skipnum = (params.current - 1) * params.limit;
    // console.log('skipnum==========',skipnum)
    User.find(cond,function(err,data){
        if(err) return res.status(500).json({success : false,err : err});
        if(data && data.length>0){
            Role.find({},function(err,roles){
                if(err) return res.status(500).json({err:err});
                Department.find({},function(err,deps){
                    if(err) return res.status(500).json({err:err});
                    res.status(200).json({
                        success:true,
                        data:data,
                        columns:configFile.user_columns,
                        roledata:roles,
                        role:{},
                        departmentdata:deps,
                        department:{}
                    });
                })
            })
        }else{
            return res.status(200).json({success : false});
        }
    }).skip(skipnum).limit(params.limit);
};


//增加
exports.addUser = function (req, res) {
    var params = req.body;
    var skip = (params.current-1)*params.limit;
    var record = params.record;
    if(typeof record === 'string'){
        record = JSON.parse(record)
    }
    User.create(record,function(err,data){
        if(!err){
           async.series({
                count: function(callback){
                    User.find({}).count(function(err,count){
                        callback(err,count);
                    });
                },
                data: function(callback){
                    User.find({},function(err,data){
                        callback(err,data);
                    }).skip(skip).limit(params.limit);
                }
            },function(err,results){
                // console.log('results-----',results);
                if(err) return res.status(500).json({success : false,err : err});
                if(results.data && results.data.length>0){
                    Role.find({},function(err,roles){
                        if(err) return res.status(500).json({err:err});
                        Department.find({},function(err,deps){
                            if(err) return res.status(500).json({err:err});
                            res.status(200).json({
                                success:true,
                                columns:configFile.user_columns,
                                total: results.count,
                                data:results.data,
                                roledata:roles,
                                role:{},
                                departmentdata:deps,
                                department:{}
                            });
                        })
                    })
                }else{
                    return res.status(200).json({success:false});
                }
            }) 
        }
    })
}

//删除
exports.deleteUser = function (req, res) {
    var params = req.query;
    var skip = (params.current-1)*params.limit;
    var skip2 = (params.current-2)*params.limit
    var record = params.record;
    if(typeof record === 'string'){
        record = JSON.parse(record)
    }
    User.remove({_id:record._id},function(err,data){
        User.find({},function(err,user){
            Role.find({},function(err,role){
                Department.find({},function(err,department){
                    if(!err){
                        async.series({
                            count: function(callback){
                                User.find({}).count(function(err,count){
                                    callback(err,count);
                                });
                            },
                            data: function(callback){
                                User.find({},function(err,data){
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
                                        columns:configFile.user_columns,
                                        data : results.data,
                                        total: results.count,
                                        roledata:role,
                                        role:{},
                                        departmentdata:department,
                                        department:{}
                                    });
                                }
                                if(results.data.length == 0){
                                    async.series({
                                        count: function(callback){
                                            User.find({}).count(function(err,count){
                                                callback(err,count);
                                            });
                                        },
                                        data: function(callback){
                                            User.find({},function(err,data){
                                                callback(err,data);
                                            }).skip(skip2).limit(params.limit);
                                        }
                                    },function(err,result){
                                        // console.log('result',result)
                                        if(err) return res.status(500).json({success : false,err : err});
                                        return res.status(200).json({
                                            success : true, 
                                            data : result.data,
                                            columns:configFile.user_columns,
                                            total: results.count,
                                            current:params.current-1,
                                            roledata:role,
                                            role:{},
                                            departmentdata:department,
                                            department:{}
                                        });
                                    })
                                }
                            }else{
                                return res.status(200).json({success:true,data:[],total: results.count});
                            }

                        }) 
                    }
                })
            })
        })
    })
}


//修改

exports.changeUser = function (req,res){
    var params = req.query;
    // console.log('params',params)
    var skip = (params.current-1)*params.limit;
    var record = params.record;
    if(typeof record === 'string'){
        record = JSON.parse(record)
    }
    User.update({_id:record._id},{$set:record},function(err,role){
        if(!err){
           async.series({
                count: function(callback){
                    User.find({}).count(function(err,count){
                        callback(err,count);
                    });
                },
                data: function(callback){
                    User.find({},function(err,data){
                        callback(err,data);
                    }).skip(skip).limit(params.limit);
                }
            },function(err,results){
                // console.log('results-----',results);
                if(err) return res.status(500).json({success : false,err : err});
                if(results.data && results.data.length>0){
                    Role.find({},function(err,roles){
                        if(err) return res.status(500).json({err:err});
                        Department.find({},function(err,deps){
                            if(err) return res.status(500).json({err:err});
                            res.status(200).json({
                                success:true,
                                total: results.count,
                                data:results.data,
                                columns:configFile.user_columns,
                                roledata:roles,
                                role:{},
                                departmentdata:deps,
                                department:{}
                            });
                        })
                    })
                }else{
                    return res.status(200).json({success:false});
                }
            }) 
        }
    })
}