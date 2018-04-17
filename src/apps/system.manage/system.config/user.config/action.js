import { createActionOf } from '../../../../util/';
import * as Api from './api';
import { USERCONFIG, GET_USER_CONFIG, CHANGE_USER_CONFIG } from './constant.js';

const action = createActionOf(USERCONFIG);
//获取角色配置文件
const getUserConfig = (params) =>{
    return action({
        type: GET_USER_CONFIG,
        payload: {
            promise: Api.getUserConfig(params)
        }
    });
};
const changeUserConfig = (params) =>{
    return action({
        type: CHANGE_USER_CONFIG,
        payload: {
            promise: Api.changeUserConfig(params)
        }
    });
};
export {
    getUserConfig,
    changeUserConfig
}
