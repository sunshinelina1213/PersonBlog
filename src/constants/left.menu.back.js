module.exports = [{
  key: 'feature',
  name: '云索',
  className: 'menu2',
  expand: true,
  url: '/feature',
  children : [
    {
       key: 'feature1',
       name: '人员线索',
       className: 'menu2',
       expand: false,
       url: '/record'
    },
    {
       key: 'my.page',
       name: '我的页面',
       className: 'menu2',
       expand: false,
       url: '/my.page'
    }
  ]
},{
  key: 'userpower',
  name: '用户管理与权限',
  className: 'menu2',
  expand: true,
  url: '/userpower',
  children : [
    {
       key: 'user.manager',
       name: '用户管理',
       className: 'menu2',
       expand: false,
       url: '/user.manager'
    },
    {
       key: 'powermanager',
       name: '权限管理',
       className: 'menu2',
       expand: false,
       url: '/powermanager'
    },
    {
       key: 'menumanager',
       name: '菜单管理',
       className: 'menu2',
       expand: false,
       url: '/menumanager'
    }
  ]
}, {
  key: 'feature2',
  name: '单元测试',
  className: 'menu2',
  expand: false,
  url: '/unit'
}]
