import { createActionOf } from '../../../../util/';
import * as Api from './api';
import { MENUMANAGER, GET_MENU, ADD_MENU, DELETE_MENU, CHANGE_MENU, SEARCH_MENU } from './constant.js';

const action = createActionOf(MENUMANAGER);
const getMenu = (params) =>{
    return action({
        type: GET_MENU,
        payload: {
            promise: Api.getMenu(params)
        }
    });
};



const addMenu = (params) =>{
    return action({
        type: ADD_MENU,
        payload: {
            promise: Api.addMenu(params)
        }
    });
};

const deleteMenu = (params) =>{
    return action({
        type: DELETE_MENU,
        payload: {
            promise: Api.deleteMenu(params)
        }
    });
};

const changeMenu = (params) =>{
    return action({
        type: CHANGE_MENU,
        payload: {
            promise: Api.changeMenu(params)
        }
    });
};

const searchMenu = (params) =>{
    return action({
        type: SEARCH_MENU,
        payload: {
            promise: Api.searchMenu(params)
        }
    });
};

export {
    getMenu,
    addMenu,
    deleteMenu,
    changeMenu,
    searchMenu
}

