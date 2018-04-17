import { createReducer,createReduceOf } from "../../../../util";
import { ROLEMANAGER, GET_ROLE, GET_ROLE_PAGE, ADD_ROLE, DELETE_ROLE, CHANGE_ROLE } from './constant.js';
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
        data:[],
        columns:[]
    }
};

export default createReducer(initState,createReduceOf({
    [`${ADD_ROLE}_PENDING`]: (state, data, params) => {  
        return I.set(state, 'isLoading', true)
    },
    [`${ADD_ROLE}_ERROR`]: (state) => { 
        return I.set(state, 'isLoading', false)
    },
    [`${ADD_ROLE}_SUCCESS`]: (state,ret = {} ) => { 
        return I.set(state,{
            isLoading : false,
            reps : ret
        });
    },

    [`${DELETE_ROLE}_PENDING`]: (state, data, params) => {  
        return I.set(state, 'isLoading', true)
    },
    [`${DELETE_ROLE}_ERROR`]: (state) => { 
        return I.set(state, 'isLoading', false)
    },
    [`${DELETE_ROLE}_SUCCESS`]: (state,ret = {} ) => { 
        return I.set(state,{
            isLoading : false,
            reps : ret
        });
    },

    [`${CHANGE_ROLE}_PENDING`]: (state, data, params) => {  
        return I.set(state, 'isLoading', true)
    },
    [`${CHANGE_ROLE}_ERROR`]: (state) => { 
        return I.set(state, 'isLoading', false)
    },
    [`${CHANGE_ROLE}_SUCCESS`]: (state,ret = {} ) => { 
        // console.log('ret.data',ret.data)
        return I.set(state,{
            isLoading : false,
            reps : ret
        });
    },


    [`${GET_ROLE_PAGE}_PENDING`]: (state, data, params) => {  
        return I.set(state, 'isLoading', true)
    },
    [`${GET_ROLE_PAGE}_ERROR`]: (state) => { 
        return I.set(state, 'isLoading', false)
    },
    [`${GET_ROLE_PAGE}_SUCCESS`]: (state,ret = {} ) => { 
        let data = ret.data
        return I.set(state,{
            isLoading : false,
            'reps.data' : data
        });
    },


    [`${GET_ROLE}_PENDING`]: (state, data, params) => { 
        return I.set(state, 'isLoading', true)
    },
    [`${GET_ROLE}_ERROR`]: (state) => {
        return I.set(state, 'isLoading', false)
    },
    [`${GET_ROLE}_SUCCESS`]: (state,ret = {}, params ) => { 
        console.log('ret=========',ret)
        return I.set(state,{
            isLoading : false,
            reps : ret
        });
    },
},ROLEMANAGER));
