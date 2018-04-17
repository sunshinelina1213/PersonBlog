import * as Api from './api'
import { createActionOf } from '../../util/';
import {  LOGIN ,USER_LOGIN, USER_RESET, USER_SYNC } from './constant.js';

const action = createActionOf(LOGIN);

export function doLogin(params) {
    return action({
        type: USER_LOGIN,
        payload: {
            promise: Api.doLogin(params)
        }
    });
}

export function doSync(params) {
  return {
    type: 'USER_SYNC',
    params
  }
}
export function reset() {
  return {
    type: 'USER_RESET'
  }
}

export function onLogin(params){
  return {
    type:'LOGIN.USER_LOGIN_USER',
    params
  }
}
