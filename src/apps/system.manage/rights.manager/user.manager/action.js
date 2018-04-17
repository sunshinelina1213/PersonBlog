import { createActionOf } from '../../../../util/';
import * as Api from './api';
import { USERMANAGER, GET_USER, GET_USER_PAGE, ADD_USER, DELETE_USER, CHANGE_USER } from './constant.js';

const action = createActionOf(USERMANAGER);

const getUser = (params) =>{
    return action({
        type: GET_USER,
        payload: {
            promise: Api.getUser(params)
        }
    });
};

const getUserPage = (params) =>{
    return action({
        type: GET_USER_PAGE,
        payload: {
            promise: Api.getUserPage(params)
        }
    });
};

const addUser = (params) =>{
    return action({
        type: ADD_USER,
        payload: {
            promise: Api.addUser(params)
        }
    });
};

const deleteUser = (params) =>{
    return action({
        type: DELETE_USER,
        payload: {
            promise: Api.deleteUser(params)
        }
    });
};

const changeUser = (params) =>{
    return action({
        type: CHANGE_USER,
        payload: {
            promise: Api.changeUser(params)
        }
    });
};

export {
    getUser,
    getUserPage,
    addUser,
    deleteUser,
    changeUser 
}

