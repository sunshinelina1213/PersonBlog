import { createReducer,createReduceOf } from "../../../../util";
import { SYSTEMCONFIGMAIN, GET_SYSTEM_INFO, CHANGE_TOGGLE_STATE} from './constant.js';
import I from 'immuter';

const initState = {
    isLoading: false,
    originState:{
        isToggle:true
    },
    reps: {
        success: true,
        systemData:[]
    }
};

export default createReducer(initState,createReduceOf({
    //基本信息
    [`${GET_SYSTEM_INFO}_PENDING`]: (state, data, params) => { 
        return I.set(state, 'isLoading', true)
    },
    [`${GET_SYSTEM_INFO}_ERROR`]: (state) => {
        return I.set(state, 'isLoading', false)
    },
    [`${GET_SYSTEM_INFO}_SUCCESS`]: (state,ret = {}, params ) => {
        return I.set(state,{
            isLoading : false,
            'reps.systemData':ret.systemData
        });
    },
    //改变配置切换状态
    [`${CHANGE_TOGGLE_STATE}`]: (state, ret = {}, params) => {
        return I.set(state, {
            'originState.isToggle' : !params
        });
    }
},SYSTEMCONFIGMAIN));

