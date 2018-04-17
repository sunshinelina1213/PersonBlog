import { createReducer, createReduceOf } from '../../util';
import { LOGIN, USER_LOGIN, USER_SYNC, USER_RESET } from './constant.js';
import { message } from 'antd';
import I from 'immuter';

const initialState = {
  isLogin:true,
  isLogging: false,
  message: null,
  loginSuccess:false,
  data:[]
}

export default createReducer(initialState,createReduceOf({
  ['${USER_RESET}']: (state, data, params) => {
    return I.set(state,"loginSuccess",false)
  },
  ['${USER_SYNC}']: (state, data, params) => {
    return I.set(state,{
      test : 'ok',
      ...params
    })
  },

  LOGIN_OUT_SUCCESS: (state, data, params) => {
    return I.set(state, {
      isLogin : !state.isLogin
    })
  },
  
  [`${USER_LOGIN}_PENDING`]: (state, data, params) => {  //异步动作: 第一步,LODDING
    return I.set(state, 'isLogging', true)
  },
  [`${USER_LOGIN}_ERROR`]: (state, ret = {} , params) => { //异步动作: 第二步,请求失败,有可能是网络断了或者其它什么原因
    message.error(`登录出错,${ret.message}`);
    return I.set(state, 'isLogging', false)
  },
  [`${USER_LOGIN}_SUCCESS`]: (state,  ret = {} , params) => {  //异步动作: 第二步,请求成功
    message.success(ret.message);
    return I.set(state, {
      isLogging: false,
      data:ret.data,
      loginSuccess: ret.success
    })
  }
},LOGIN));
