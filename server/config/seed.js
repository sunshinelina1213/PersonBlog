/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
const User = require('../api/system.manage/rights.manager/user.manager/user.manager.model.js');
const Role = require('../api/system.manage/rights.manager/role.manager/role.manager.model.js');
const Menu = require('../api/system.manage/rights.manager/menu.manager/menu.manager.model.js');
const Department = require('../api/system.manage/rights.manager/department.manager/department.manager.model.js');
const RoleMenu = require('../api/system.manage/rights.manager/menu.rights.manager/menu.rights.manager.model.js');


//用户登录
User.find({}, function(err, data) {
    User.find({}).remove(function() {
        User.create({
            "LOGIN_NAME": "admin",
            "LOGIN_PASSWORD": "123456",
            "USER_XM": "管理员",
            "USER_ZJHM": "123",
            "DEPARTMENT_KEY": "1",
            "RIGHTS_KEY": 1
        }, {
            "LOGIN_NAME" : "user01",
            "LOGIN_PASSWORD" : "123456",
            "USER_XM" : "林杨",
            "USER_ZJHM" : "456",
            "DEPARTMENT_KEY" : "1",
            "RIGHTS_KEY" : "2",
        }, {
            "LOGIN_NAME" : "user02",
            "LOGIN_PASSWORD" : "123456",
            "USER_XM" : "余周周",
            "USER_ZJHM" : "789",
            "DEPARTMENT_KEY" : "2",
            "RIGHTS_KEY" : "3"
        }, {
            "LOGIN_NAME" : "user03",
            "LOGIN_PASSWORD" : "123456",
            "USER_XM" : "凌翔茜",
            "USER_ZJHM" : "1233",
            "DEPARTMENT_KEY" : "2",
            "RIGHTS_KEY" : "4"
        }, function() {
            console.log('finished create user');
        });
    });
})


//机构管理
Department.find({}, function(err, data) {
    Department.find({}).remove(function() {
        Department.create({
            "DEPARTMENT_NAME": "学生会",
            "DEPARTMENT_REMARK": "机构1",
            "DEPARTMENT_KEY": "1"
        }, {
            "DEPARTMENT_NAME": "动漫社",
            "DEPARTMENT_REMARK": "机构2",
            "DEPARTMENT_KEY": "2"
        }, {
            "DEPARTMENT_NAME": "轮滑社",
            "DEPARTMENT_REMARK": "机构3",
            "DEPARTMENT_KEY": "3"
        }, {
            "DEPARTMENT_NAME": "吉他社",
            "DEPARTMENT_REMARK": "机构4",
            "DEPARTMENT_KEY": "4"
        }, {
            "DEPARTMENT_NAME": "街舞社",
            "DEPARTMENT_REMARK": "机构5",
            "DEPARTMENT_KEY": "5"
        }, function() {
            console.log('finished create department')
        });
    });
})



//角色管理
Role.find({}, function(err, data) {
    Role.find({}).remove(function() {
        Role.create({
            "ROLE_NAME" : "学生会会长",
            "REMARK" : "角色1",
            "RIGHTS_KEY" : "1",
        }, {
            "ROLE_NAME": "学生会副会长",
            "REMARK": "角色2",
            "RIGHTS_KEY": "2"
        }, {
            "ROLE_NAME": "社长",
            "REMARK": "角色3",
            "RIGHTS_KEY": "3"
        }, {
            "ROLE_NAME": "副社长",
            "REMARK": "角色4",
            "RIGHTS_KEY": "4"
        }, function() {
            console.log('finished create role')
        });
    });

})

//菜单管理
Menu.find({}, function(err, data) {
    Menu.find({}).remove(function() {
        Menu.create({
            "MENU_NAME": "系统管理",
            "MENU_KEY": "xtmanager",
            "MENU_URL": " ",
            "MENU_ICON": "../../static/img/xitong_icon.png",
            "PARENT_KEY": "first"
        }, {
            "MENU_NAME": "用户管理", //权限管理
            "MENU_KEY": "usermanager",
            "MENU_URL": "/apps/system.manage/rights.manager/user.manager",
            "MENU_ICON": "team",
            "PARENT_KEY": "xtmanager"
        }, {
            "MENU_NAME": "菜单管理",
            "MENU_KEY": "menumanager",
            "MENU_URL": "/apps/system.manage/rights.manager/menu.manager",
            "MENU_ICON": "scan",
            "PARENT_KEY": "xtmanager"
        }, {
            "MENU_NAME": "角色管理",
            "MENU_KEY": "rolemanager",
            "MENU_URL": "/apps/system.manage/rights.manager/role.manager",
            "MENU_ICON": "star-o",
            "PARENT_KEY": "xtmanager"
        }, {
            "MENU_NAME": "角色权限管理",
            "MENU_KEY": "menurightsmanager",
            "MENU_URL": "/apps/system.manage/rights.manager/menu.rights.manager",
            "MENU_ICON": "tags",
            "PARENT_KEY": "xtmanager"
        }, {
            "MENU_NAME": "机构管理",
            "MENU_KEY": "departmentmanager",
            "MENU_URL": "/apps/system.manage/rights.manager/department.manager",
            "MENU_ICON": "tags",
            "PARENT_KEY": "xtmanager"
        }, {
            "MENU_NAME": "系统配置",
            "MENU_KEY": "xtpeizhi",
            "MENU_URL": "/apps/system.manage/system.config/system.config.main",
            "MENU_ICON": "setting",
            "PARENT_KEY": "xtmanager"
        }, {
            "MENU_NAME" : "个人博客",
            "MENU_KEY" : "blog",
            "MENU_URL" : "",
            "MENU_ICON" : "",
            "PARENT_KEY" : "first"
        }, {
            "MENU_NAME" : "主页",
            "MENU_KEY" : "guideindex",
            "MENU_URL" : "/apps/guide.index",
            "MENU_ICON" : "setting",
            "PARENT_KEY" : "blog",
        }, {
            "MENU_NAME" : "个人博客主页",
            "MENU_KEY" : "personblog",
            "MENU_URL" : "/apps/person.blog",
            "MENU_ICON" : "",
            "PARENT_KEY" : "blog",
        }, {
            "MENU_NAME" : "图表页",
            "MENU_KEY" : "tubiaoye",
            "MENU_URL" : "/apps/tubiao.index",
            "MENU_ICON" : "setting",
            "PARENT_KEY" : "blog",
        }, function() {
            console.log('finished create menu')
        })
    });
})


//角色菜单
RoleMenu.find({}, function(err, data) {
    RoleMenu.find({}).remove(function() {
        RoleMenu.create({
            "RIGHTS_KEY": "1",
            "MENU_KEY": "blog"
        },{
            "RIGHTS_KEY": "1",
            "MENU_KEY": "personblog"
        },{
            "RIGHTS_KEY": "1",
            "MENU_KEY": "usermanager"
        }, {
            "RIGHTS_KEY": "1",
            "MENU_KEY": "menumanager"
        }, {
            "RIGHTS_KEY": "1",
            "MENU_KEY": "departmentmanager"
        }, {
            "RIGHTS_KEY": "1",
            "MENU_KEY": "rolemanager"
        }, {
            "RIGHTS_KEY": "1",
            "MENU_KEY": "menurightsmanager"
        }, {
            "RIGHTS_KEY": "1",
            "MENU_KEY": "xtpeizhi"
        }, {
            "RIGHTS_KEY": "1",
            "MENU_KEY": "xtmanager"
        }, {
            "RIGHTS_KEY": "1",
            "MENU_KEY": "guideindex"   //首页
        }, {
            "RIGHTS_KEY": "1",
            "MENU_KEY": "tubiaoye"   //图表页
        }, function() {
            console.log('finished create rolemenu')
        });
    });
    
})
