import { createActionOf } from '../../../../util/';
import * as Api from './api';
import { MENUCONFIG, GET_MENU_CONFIG, CHANGE_MENU_CONFIG } from './constant.js';

const action = createActionOf(MENUCONFIG);
//获取角色配置文件
const getMenuConfig = (params) =>{
    return action({
        type: GET_MENU_CONFIG,
        payload: {
            promise: Api.getMenuConfig(params)
        }
    });
};
const changeMenuConfig = (params) =>{
    return action({
        type: CHANGE_MENU_CONFIG,
        payload: {
            promise: Api.changeMenuConfig(params)
        }
    });
};
export {
    getMenuConfig,
    changeMenuConfig
}
