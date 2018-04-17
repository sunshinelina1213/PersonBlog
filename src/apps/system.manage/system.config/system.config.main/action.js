import { createActionOf } from '../../../../util/';
import * as Api from './api';
import { SYSTEMCONFIGMAIN, GET_SYSTEM_INFO, CHANGE_TOGGLE_STATE } from './constant.js';

const action = createActionOf(SYSTEMCONFIGMAIN);
//基本信息
const getSystemInfo = (params) =>{
    return action({
        type: GET_SYSTEM_INFO,
        payload: {
            promise: Api.getSystemInfo(params)
        }
    });
};

//配置页切换状态
const changeToggleState = (params) =>{
    return action({
        type: CHANGE_TOGGLE_STATE,
        params
    });
}
export {
    getSystemInfo,
    changeToggleState
}
