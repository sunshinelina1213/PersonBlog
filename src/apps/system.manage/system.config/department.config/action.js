import { createActionOf } from '../../../../util/';
import * as Api from './api';
import { DEPARTMENTCONFIG, GET_DEPARTMENT_CONFIG, CHANGE_DEPARTMENT_CONFIG } from './constant.js';

const action = createActionOf(DEPARTMENTCONFIG);
//获取角色配置文件
const getDepartmentConfig = (params) =>{
    return action({
        type: GET_DEPARTMENT_CONFIG,
        payload: {
            promise: Api.getDepartmentConfig(params)
        }
    });
};
const changeDepartmentConfig = (params) =>{
    return action({
        type: CHANGE_DEPARTMENT_CONFIG,
        payload: {
            promise: Api.changeDepartmentConfig(params)
        }
    });
};
export {
    getDepartmentConfig,
    changeDepartmentConfig
}
