import { createActionOf } from '../../../../util/';
import * as Api from './api';
import { DEPARTMENTMANAGER, GET_DEPARTMENT, GET_DEPARTMENT_PAGE, ADD_DEPARTMENT, DELETE_DEPARTMENT, CHANGE_DEPARTMENT } from './constant.js';

const action = createActionOf(DEPARTMENTMANAGER);

const getDepartment = (params) =>{
    return action({
        type: GET_DEPARTMENT,
        payload: {
            promise: Api.getDepartment(params)
        }
    });
};

const getDepartmentPage = (params) =>{
    return action({
        type: GET_DEPARTMENT_PAGE,
        payload: {
            promise: Api.getDepartmentPage(params)
        }
    });
};

const addDepartment = (params) =>{
    return action({
        type: ADD_DEPARTMENT,
        payload: {
            promise: Api.addDepartment(params)
        }
    });
};

const deleteDepartment = (params) =>{
    return action({
        type: DELETE_DEPARTMENT,
        payload: {
            promise: Api.deleteDepartment(params)
        }
    });
};

const changeDepartment = (params) =>{
    return action({
        type: CHANGE_DEPARTMENT,
        payload: {
            promise: Api.changeDepartment(params)
        }
    });
};
export {
    getDepartment,
    getDepartmentPage,
    addDepartment,
    deleteDepartment,
    changeDepartment
}

