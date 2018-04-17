import syncHistoryWithStore from 'react-router-redux/lib/sync'
import { hashHistory, browserHistory } from 'react-router'
import _isEmpty from 'lodash/isEmpty'
import { LOCATION_CHANGE, routerReducer } from 'react-router-redux/lib/reducer'
import {
  CALL_HISTORY_METHOD,
  push, replace, go, goBack, goForward,
  routerActions
} from 'react-router-redux/lib/actions'
import routerMiddleware from 'react-router-redux/lib/middleware'
import { parseParam } from '../util'

const ISO = __ISO__ || '';

const isIsoRender = () => {
  return ISO ? true : false
}
const getBrowserHistory = () => {
  if (isIsoRender()) { //同构后端渲染
    return browserHistory  //用官方推荐的`browserHistory`,其路由去掉'#'
  } else {
    return hashHistory
  }
}
const changeLocation = (url, params = {}) => {
  const query = _isEmpty(params) ? '' : `?${parseParam(params)}`;
  return push(`${url}${query}`); //路由跳转,同时带上参数  ps:ln
}
const openLocation = (url, params = {}) => {
  const query = _isEmpty(params) ? '' : `?${parseParam(params)}`;
  if (!isIsoRender()) return window.open('/#' + `${url}${query}`);
  return window.open(`${url}${query}`);
}
export {
  getBrowserHistory,
  changeLocation,
  openLocation,
  isIsoRender,
  syncHistoryWithStore,
  LOCATION_CHANGE, routerReducer,
  CALL_HISTORY_METHOD, push, replace, go, goBack, goForward, routerActions,
  routerMiddleware
}
