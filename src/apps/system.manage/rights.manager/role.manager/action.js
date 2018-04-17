import { createActionOf } from '../../../../util/';
import * as Api from './api';
import { ROLEMANAGER, GET_ROLE, GET_ROLE_PAGE, ADD_ROLE, DELETE_ROLE, CHANGE_ROLE } from './constant.js';

const action = createActionOf(ROLEMANAGER);

const getRole = (params) =>{
    return action({
        type: GET_ROLE,
        payload: {
            promise: Api.getRole(params)
        }
    });
};

const getRolePage = (params) =>{
    return action({
        type: GET_ROLE_PAGE,
        payload: {
            promise: Api.getRolePage(params)
        }
    });
};

const addRole = (params) =>{
    return action({
        type: ADD_ROLE,
        payload: {
            promise: Api.addRole(params)
        }
    });
};

const deleteRole = (params) =>{
    return action({
        type: DELETE_ROLE,
        payload: {
            promise: Api.deleteRole(params)
        }
    });
};

const changeRole = (params) =>{
    return action({
        type: CHANGE_ROLE,
        payload: {
            promise: Api.changeRole(params)
        }
    });
};
export {
    getRole,
    getRolePage,
    addRole,
    deleteRole,
    changeRole
}

