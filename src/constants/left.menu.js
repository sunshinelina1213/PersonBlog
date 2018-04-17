module.exports = [
  {
    key: 'home',
    name: '首页',
    expand: true
  },
  {
  key: 'feature',
  name: '通查通搜',
  expand: false,
  children: [
    {
      key: 'feature1',
      name: '人员线索',
      expand: false,
      url: '/record'
    },
    {
      key: 'my.page',
      name: '档案',

      expand: false,
      children: [
        {
          key: 'ren',
          name: '人员档案',
          expand: false,
          url: '/my.page'
        },
        {
          key: 'che',
          name: '车辆档案',
          expand: false,
          url: '/unit'
        }
      ]
    }
  ]
}, {
  key: 'userpower',
  name: '用户管理',
  expand: false,
  children: [
    {
      key: 'user.manager',
      name: '用户管理',

      expand: false,
      url: '/user.manager'
    },
    {
      key: 'powermanager',
      name: '权限管理',

      expand: false,
      url: '/powermanager'
    }
  ]
}]
