import { createReducer,createReduceOf } from "../../../../util";
import { MENURIGHTSCONFIG, GET_MENURIGHTS_CONFIG, CHANGE_MENURIGHTS_CONFIG } from './constant.js';
import I from 'immuter';

const initState = {
    isLoading: false,
    reps: {
        success: true,
        configData:[]
    }
};

export default createReducer(initState,createReduceOf({
    //获取菜单权限配置信息
    [`${GET_MENURIGHTS_CONFIG}_PENDING`]: (state, data, params) => { 
        return I.set(state, 'isLoading', true)
    },
    [`${GET_MENURIGHTS_CONFIG}_ERROR`]: (state) => {
        return I.set(state, 'isLoading', false)
    },
    [`${GET_MENURIGHTS_CONFIG}_SUCCESS`]: (state,ret = {}, params ) => {
        return I.set(state,{
            isLoading : false,
            reps:ret
        });
    },
     //修改菜单权限配置信息
     [`${CHANGE_MENURIGHTS_CONFIG}_PENDING`]: (state, data, params) => { 
        return I.set(state, 'isLoading', true)
    },
    [`${CHANGE_MENURIGHTS_CONFIG}_ERROR`]: (state) => {
        return I.set(state, 'isLoading', false)
    },
    [`${CHANGE_MENURIGHTS_CONFIG}_SUCCESS`]: (state,ret = {}, params ) => {
        return I.set(state,{
            isLoading : false
        });
    },
},MENURIGHTSCONFIG));

