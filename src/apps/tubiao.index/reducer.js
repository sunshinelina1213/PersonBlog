import { createReducer,createReduceOf } from "../../util";
import { 
    TUBIAOINDEX,
    GET_TB_INDEX
} from './constant.js';
import I from 'immuter';
import _ from 'lodash';

const initState = {
    isLoading: false,
    state:{

    },
    headerData:{}
};

export default createReducer(initState,createReduceOf({
    [`${GET_TB_INDEX}_SUCCESS`]: (state,ret = {}, params ) => {
        console.log('ret-------------------',ret)
        return I.set(state,{
            isLoading : false,
            headerData: ret.headerData
        });
    }

},TUBIAOINDEX));
