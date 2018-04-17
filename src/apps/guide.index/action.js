import { createActionOf } from '../../util';
import * as Api from './api';
import {
    GUIDEINDEX,
    GET_GUIDE_MENU
} from './constant.js';

const action = createActionOf(GUIDEINDEX);
//基本信息
const getGuideMenu = (params) =>{
    return action({
        type: GET_GUIDE_MENU,
        payload: {
            promise: Api.getGuideMenu(params)
        }
    });
};

export {
    getGuideMenu 
}
