import { createReducer,createReduceOf } from "../../util";
import { 
    GUIDEINDEX,
    GET_GUIDE_MENU
} from './constant.js';
import I from 'immuter';
import _ from 'lodash';

const initState = {
    isLoading: false,
    state:{

    },
    reps: {
        menudata:[]
    }
};

export default createReducer(initState,createReduceOf({
    //基本信息
    [`${GET_GUIDE_MENU}_PENDING`]: (state, data, params) => { 
        return I.set(state, 'isLoading', true)
    },
    [`${GET_GUIDE_MENU}_ERROR`]: (state) => {
        return I.set(state, 'isLoading', false)
    },
    [`${GET_GUIDE_MENU}_SUCCESS`]: (state,ret = {}, params ) => {
        // console.log('ret',ret)
        return I.set(state,{
            isLoading : false,
            "reps.menudata":ret.menudata
        });
    }
},GUIDEINDEX));
