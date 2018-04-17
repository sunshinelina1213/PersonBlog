import { createReducer,createReduceOf } from "../../../../util";
import { ROLECONFIG, GET_ROLE_CONFIG, CHANGE_ROLE_CONFIG } from './constant.js';
import I from 'immuter';

const initState = {
    isLoading: false,
    reps: {
        success: true,
        configData:[]
    }
};

export default createReducer(initState,createReduceOf({
    //获取角色配置信息
    [`${GET_ROLE_CONFIG}_PENDING`]: (state, data, params) => { 
        return I.set(state, 'isLoading', true)
    },
    [`${GET_ROLE_CONFIG}_ERROR`]: (state) => {
        return I.set(state, 'isLoading', false)
    },
    [`${GET_ROLE_CONFIG}_SUCCESS`]: (state,ret = {}, params ) => {
        return I.set(state,{
            isLoading : false,
            reps:ret
        });
    },
     //修改角色配置信息
     [`${CHANGE_ROLE_CONFIG}_PENDING`]: (state, data, params) => { 
        return I.set(state, 'isLoading', true)
    },
    [`${CHANGE_ROLE_CONFIG}_ERROR`]: (state) => {
        return I.set(state, 'isLoading', false)
    },
    [`${CHANGE_ROLE_CONFIG}_SUCCESS`]: (state,ret = {}, params ) => {
        return I.set(state,{
            isLoading : false
        });
    },
},ROLECONFIG));

