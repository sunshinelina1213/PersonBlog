import { createReducer,createReduceOf } from "../../../../util";
import { MENUCONFIG, GET_MENU_CONFIG, CHANGE_MENU_CONFIG } from './constant.js';
import I from 'immuter';

const initState = {
    isLoading: false,
    reps: {
        success: true,
        configData:[]
    }
};

export default createReducer(initState,createReduceOf({
    //获取首页配置信息
    [`${GET_MENU_CONFIG}_PENDING`]: (state, data, params) => { 
        return I.set(state, 'isLoading', true)
    },
    [`${GET_MENU_CONFIG}_ERROR`]: (state) => {
        return I.set(state, 'isLoading', false)
    },
    [`${GET_MENU_CONFIG}_SUCCESS`]: (state,ret = {}, params ) => {
        return I.set(state,{
            isLoading : false,
            reps:ret
        });
    },
     //修改首页配置信息
     [`${CHANGE_MENU_CONFIG}_PENDING`]: (state, data, params) => { 
        return I.set(state, 'isLoading', true)
    },
    [`${CHANGE_MENU_CONFIG}_ERROR`]: (state) => {
        return I.set(state, 'isLoading', false)
    },
    [`${CHANGE_MENU_CONFIG}_SUCCESS`]: (state,ret = {}, params ) => {
        return I.set(state,{
            isLoading : false
        });
    },
},MENUCONFIG));

