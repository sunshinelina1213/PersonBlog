import { createActionOf } from '../../../../util/';
import * as Api from './api';
import { MENURIGHTSCONFIG, GET_MENURIGHTS_CONFIG, CHANGE_MENURIGHTS_CONFIG } from './constant.js';

const action = createActionOf(MENURIGHTSCONFIG);
//获取角色配置文件
const getMenuRightsConfig = (params) =>{
    return action({
        type: GET_MENURIGHTS_CONFIG,
        payload: {
            promise: Api.getMenuRightsConfig(params)
        }
    });
};
const changeMenuRightsConfig = (params) =>{
    return action({
        type: CHANGE_MENURIGHTS_CONFIG,
        payload: {
            promise: Api.changeMenuRightsConfig(params)
        }
    });
};
export {
    getMenuRightsConfig,
    changeMenuRightsConfig
}
