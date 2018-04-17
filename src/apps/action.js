import * as route from 'react-router-redux-fixed'
import * as Api from './api'
import { parseParam } from '../util'
import _isEmpty from 'lodash/isEmpty'



//{ push,replace,go,openLocation,changeLocatio}
/**
 * 控制跳转的action，第二个参数为对象自动转为querystr，被打开的目标可以用this.props.location.query.xx来访问
 * @param  {[type]} url         [description]
 * @param  {Object} [params={}] [description]
 * @return {[type]}             [description]
 */
export function changeLocation(url, params = {}) {
  return route.changeLocation(url, params);
}
export function openLocation(url, params = {}) {
  return route.openLocation(url, params);
}

export function getProjectList(params) {
  return {
    type: 'GET_PROJ_LIST',
    payload: {
      promise: Api.getProjectList(params)
    }
  }
}


// 退出登录
export function doLogout() {
  return {
    type: 'LOGIN_OUT',
    payload: {
        promise: Api.doLogout()
    }
  }
  // return replace('/login');
}

// 退出登录 socket事件
export function onLogout(params){
  return {
    type:'LOGIN.USER_LOGIN_USER_OUT',
    params
  }
}
