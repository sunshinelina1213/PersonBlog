import { createActionOf } from '../../../../util/';
import * as Api from './api';
import { ROLECONFIG, GET_ROLE_CONFIG, CHANGE_ROLE_CONFIG } from './constant.js';

const action = createActionOf(ROLECONFIG);
//获取角色配置文件
const getRoleConfig = (params) =>{
    return action({
        type: GET_ROLE_CONFIG,
        payload: {
            promise: Api.getRoleConfig(params)
        }
    });
};
const changeRoleConfig = (params) =>{
    return action({
        type: CHANGE_ROLE_CONFIG,
        payload: {
            promise: Api.changeRoleConfig(params)
        }
    });
};
export {
    getRoleConfig,
    changeRoleConfig
}
