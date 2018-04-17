import { createActionOf } from '../../../../util/';
import * as Api from './api';
import { MENURIGHTSMANAGER, GET_MENU_RIGHTS, GET_MENU_RIGHTS_PAGE, SET_MENU_RIGHTS, CHANGE_MENU_RIGHTS,GET_MENU_SECOND } from './constant.js';

const action = createActionOf(MENURIGHTSMANAGER);

const getMenuRights = (params) =>{
    return action({
        type: GET_MENU_RIGHTS,
        payload: {
            promise: Api.getMenuRights(params)
        }
    });
};

const getMenuRightsPage = (params) =>{
    return action({
        type: GET_MENU_RIGHTS_PAGE,
        payload: {
            promise: Api.getMenuRightsPage(params)
        }
    });
};

const setMenuRights = (params) =>{
    return action({
        type: SET_MENU_RIGHTS,
        payload: {
            promise: Api.setMenuRights(params)
        }
    });
};

const changeMenuRights = (params) =>{
    return action({
        type: CHANGE_MENU_RIGHTS,
        payload: {
            promise: Api.changeMenuRights(params)
        }
    });
};

const getMenuSecond = (params) =>{
    return action({
        type: GET_MENU_SECOND,
        payload: {
            promise: Api.getMenuSecond(params)
        }
    });
};
export {
    getMenuRights,
    getMenuRightsPage,
    setMenuRights,
    changeMenuRights,
    getMenuSecond
}

