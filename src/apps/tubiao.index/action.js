import { createActionOf } from '../../util';
import * as Api from './api';
import {
    TUBIAOINDEX,
    GET_TB_INDEX
} from './constant.js';

const action = createActionOf(TUBIAOINDEX);
//基本信息
const getTbIndex = (params) =>{
    return action({
        type: GET_TB_INDEX,
        payload: {
            promise: Api.getTbIndex(params)
        }
    });
};

export {
    getTbIndex 
}
