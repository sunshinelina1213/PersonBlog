import { createReducer,createReduceOf } from "../../../../util";
import { DEPARTMENTMANAGER, GET_DEPARTMENT, GET_DEPARTMENT_PAGE, ADD_DEPARTMENT, DELETE_DEPARTMENT, CHANGE_DEPARTMENT } from './constant.js';
import I from 'immuter'

const initState = {
    isLoading: false,
    page: {
        current: 1,
        limit: 3
    },
    reps: {
        success: true,
        total: 0,
        data:[]
    }
};

export default createReducer(initState,createReduceOf({
    [`${ADD_DEPARTMENT}_PENDING`]: (state, data, params) => {  
        return I.set(state, 'isLoading', true)
    },
    [`${ADD_DEPARTMENT}_ERROR`]: (state) => { 
        return I.set(state, 'isLoading', false)
    },
    [`${ADD_DEPARTMENT}_SUCCESS`]: (state,ret = {} ) => { 
        return I.set(state,{
            isLoading : false,
            reps : ret
        });
    },

    [`${DELETE_DEPARTMENT}_PENDING`]: (state, data, params) => {  
        return I.set(state, 'isLoading', true)
    },
    [`${DELETE_DEPARTMENT}_ERROR`]: (state) => { 
        return I.set(state, 'isLoading', false)
    },
    [`${DELETE_DEPARTMENT}_SUCCESS`]: (state,ret = {} ) => { 
        return I.set(state,{
            isLoading : false,
            reps : ret
        });
    },

    [`${CHANGE_DEPARTMENT}_PENDING`]: (state, data, params) => {  
        return I.set(state, 'isLoading', true)
    },
    [`${CHANGE_DEPARTMENT}_ERROR`]: (state) => { 
        return I.set(state, 'isLoading', false)
    },
    [`${CHANGE_DEPARTMENT}_SUCCESS`]: (state,ret = {} ) => { 
        // console.log('ret.data',ret.data)
        return I.set(state,{
            isLoading : false,
            reps : ret
        });
    },


    [`${GET_DEPARTMENT_PAGE}_PENDING`]: (state, data, params) => {  
        return I.set(state, 'isLoading', true)
    },
    [`${GET_DEPARTMENT_PAGE}_ERROR`]: (state) => { 
        return I.set(state, 'isLoading', false)
    },
    [`${GET_DEPARTMENT_PAGE}_SUCCESS`]: (state,ret = {} ) => { 
        let data = ret.data
        return I.set(state,{
            isLoading : false,
            'reps.data' : data
        });
    },


    [`${GET_DEPARTMENT}_PENDING`]: (state, data, params) => { 
        return I.set(state, 'isLoading', true)
    },
    [`${GET_DEPARTMENT}_ERROR`]: (state) => {
        return I.set(state, 'isLoading', false)
    },
    [`${GET_DEPARTMENT}_SUCCESS`]: (state,ret = {}, params ) => { 
        // console.log('ret==================',ret)
        return I.set(state,{
            isLoading : false,
            reps : ret
        });
    },
},DEPARTMENTMANAGER));
