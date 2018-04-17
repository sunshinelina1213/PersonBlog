/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');
var path = require('path');


module.exports = function (app) {

 
  
  //各模块路由接口定义
  app.use('/api/login', require('./api/login'));

  //权限管理
  app.use('/api/system.manage/rights.manager/role.manager',require('./api/system.manage/rights.manager/role.manager'));
  app.use('/api/system.manage/rights.manager/user.manager',require('./api/system.manage/rights.manager/user.manager'));
  app.use('/api/system.manage/rights.manager/menu.manager',require('./api/system.manage/rights.manager/menu.manager'));
  app.use('/api/system.manage/rights.manager/department.manager',require('./api/system.manage/rights.manager/department.manager'));
  app.use('/api/system.manage/rights.manager/menu.rights.manager',require('./api/system.manage/rights.manager/menu.rights.manager'));







  //系统配置主页面
  app.use('/api/system.manage/system.config/system.config.main', require('./api/system.manage/system.config/system.config.main'));
  
  //系统配置角色配置
  app.use('/api/system.manage/system.config/role.config', require('./api/system.manage/system.config/role.config'));
  //系统配置菜单配置
  app.use('/api/system.manage/system.config/menu.config', require('./api/system.manage/system.config/menu.config'));
  //系统配置用户配置
  app.use('/api/system.manage/system.config/user.config', require('./api/system.manage/system.config/user.config'));
  //系统配置机构配置
  app.use('/api/system.manage/system.config/department.config', require('./api/system.manage/system.config/department.config'));
  
  //主页
  app.use('/api/guide.index', require('./api/guide.index'));
  //图表页
  app.use('/api/tubiao.index', require('./api/tubiao.index'));


  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
    .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function(req, res) {
      var production = process.env.NODE_ENV == 'production' ? 'dist/' : '';
      res.sendFile(path.resolve(app.get('appPath') + '/' + production + 'index.html'));
    });
};
