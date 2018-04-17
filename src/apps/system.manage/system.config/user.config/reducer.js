import { createReducer,createReduceOf } from "../../../../util";
import { USERCONFIG, CHANGE_USER_CONFIG, GET_USER_CONFIG } from './constant.js';
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
    [`${GET_USER_CONFIG}_PENDING`]: (state, data, params) => { 
        return I.set(state, 'isLoading', true)
    },
    [`${GET_USER_CONFIG}_ERROR`]: (state) => {
        return I.set(state, 'isLoading', false)
    },
    [`${GET_USER_CONFIG}_SUCCESS`]: (state,ret = {}, params ) => {
        return I.set(state,{
            isLoading : false,
            reps:ret
        });
    },
     //修改角色配置信息
     [`${CHANGE_USER_CONFIG}_PENDING`]: (state, data, params) => { 
        return I.set(state, 'isLoading', true)
    },
    [`${CHANGE_USER_CONFIG}_ERROR`]: (state) => {
        return I.set(state, 'isLoading', false)
    },
    [`${CHANGE_USER_CONFIG}_SUCCESS`]: (state,ret = {}, params ) => {
        return I.set(state,{
            isLoading : false
        });
    }
    
},USERCONFIG));

