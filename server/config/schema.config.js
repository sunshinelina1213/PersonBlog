/**
 * 数据模型结构定义
 *
 *
 * @author ln
 * @date 2016-05-09
 */
(function() {
  'use strict';

  module.exports = {
   
    /*登录用户模型*/
    user_model: {
      name: "user_model",
      cols: {
        LOGIN_NAME: String, //登录名
        LOGIN_PASSWORD: String, //登录密码
        USER_XM: String, //用户姓名
        USER_ZJHM: String, //用户证件号码
        DEPARTMENT_KEY: String, //所属机构
        RIGHTS_KEY: String, //角色权限
        Organization: String, //单位名称
        Organization_ID: String,//单位机构代码
      }
    },

    /*角色模型*/
    role_model: {
      name: 'role_model',
      cols: {
        ROLE_NAME: String, //角色名
        REMARK: String, //角色备注
        RIGHTS_KEY: String //角色权限
      }
    },

    /*机构模型*/
    department_model :{
        name : 'department_model',
        cols : {
            DEPARTMENT_NAME: String,      //机构名称                    //机构名
            DEPARTMENT_REMARK : String,         //机构备注              //机构备注
            DEPARTMENT_KEY : String             //机构标识            //机构ID
          }
    },

    /*菜单模型*/
    menu_model : {
        name : "menu_model",
        cols : {
            MENU_NAME:String,             //菜单名称
            MENU_KEY : String,            //菜单ID
            MENU_URL:String,              //菜单对应路由
            MENU_ICON : String,           //菜单图标
            MENU_IMG :String,             //菜单图片
            PARENT_KEY : String           //父级标识
        }
    },

    /*角色菜单模型*/
    role_menu_model: {
      name: 'role_menu_model',
      cols: {
        RIGHTS_KEY: String, //角色权限
        MENU_KEY: String //菜单ID
      }
    }
  };
})();
