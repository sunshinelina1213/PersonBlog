import { createReducer,createReduceOf } from "../../../../util";
import { DEPARTMENTCONFIG, GET_DEPARTMENT_CONFIG, CHANGE_DEPARTMENT_CONFIG } from './constant.js';
import I from 'immuter';

const initState = {
    isLoading: false,
    reps: {
        success: true,
        configData:[]
    }
};

export default createReducer(initState,createReduceOf({
    //获取机构配置信息
    [`${GET_DEPARTMENT_CONFIG}_PENDING`]: (state, data, params) => { 
        return I.set(state, 'isLoading', true)
    },
    [`${GET_DEPARTMENT_CONFIG}_ERROR`]: (state) => {
        return I.set(state, 'isLoading', false)
    },
    [`${GET_DEPARTMENT_CONFIG}_SUCCESS`]: (state,ret = {}, params ) => {
        return I.set(state,{
            isLoading : false,
            reps:ret
        });
    },
     //修改机构配置信息
     [`${CHANGE_DEPARTMENT_CONFIG}_PENDING`]: (state, data, params) => { 
        return I.set(state, 'isLoading', true)
    },
    [`${CHANGE_DEPARTMENT_CONFIG}_ERROR`]: (state) => {
        return I.set(state, 'isLoading', false)
    },
    [`${CHANGE_DEPARTMENT_CONFIG}_SUCCESS`]: (state,ret = {}, params ) => {
        return I.set(state,{
            isLoading : false
        });
    },
},DEPARTMENTCONFIG));

