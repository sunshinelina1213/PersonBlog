import { createReducer,createReduceOf } from "../../../../util";
import { MENURIGHTSMANAGER, GET_MENU_RIGHTS, GET_MENU_RIGHTS_PAGE, SET_MENU_RIGHTS, CHANGE_MENU_RIGHTS,GET_MENU_SECOND } from './constant.js';
import I from 'immuter'

const initState = {
    isLoading: false,
    page: {
        current: 1,
        limit: 3
    },
    reps: {
        success: true,
        total: 0,
        data:[],
        menuData:[],
        columns:[]
    },
    setMenuData:[],
    unseldata:[],
    userLogin : {},
    changeData:[]
};

export default createReducer(initState,createReduceOf({
    [`${CHANGE_MENU_RIGHTS}_PENDING`]: (state, data, params) => {  
        return I.set(state, 'isLoading', true)
    },
    [`${CHANGE_MENU_RIGHTS}_ERROR`]: (state) => { 
        return I.set(state, 'isLoading', false)
    },
    [`${CHANGE_MENU_RIGHTS}_SUCCESS`]: (state,ret = {} ) => { 
        console.log('ret',ret)
        return I.set(state,{
            isLoading : false,
        });
    },

    [`${SET_MENU_RIGHTS}_PENDING`]: (state, data, params) => {  
        return I.set(state, 'isLoading', true)
    },
    [`${SET_MENU_RIGHTS}_ERROR`]: (state) => { 
        return I.set(state, 'isLoading', false)
    },
    [`${SET_MENU_RIGHTS}_SUCCESS`]: (state,ret = {} ) => { 
        // console.log('retmenudata',ret.menudata) //勾选的菜单项
        // console.log('ret.unseldata==========',ret.unseldata)//全部菜单信信息（选中和未选中）
        // console.log('retuserLogin',ret.userLogin) // 角色信息

        const unseldata = ret.unseldata;
        var firstarr = [];
        unseldata.forEach((data) => {
            if(data.parentkey === "first") {
                firstarr.push(data);
                makeMenu(data, unseldata);
            }
        });
        return I.set(state,{
            isLoading : false,
            setMenuData:ret.menudata,
            unseldata:firstarr,
            userLogin : ret.userLogin
        });
    },

    //获取菜单
    [`${GET_MENU_SECOND}_PENDING`]: (state, data, params) => { 
        return I.set(state, 'isLoading', true)
    },
    [`${GET_MENU_SECOND}_ERROR`]: (state, data, params) => {
        return I.set(state, 'isLoading', false)
    },
    [`${GET_MENU_SECOND}_SUCCESS`]: (state,ret = {} ) => { 
        let menuData = ret.menudata;
        return I.set(state,{
            isLoading : false,
            'reps.menuData' : menuData
        });
    },

    [`${GET_MENU_RIGHTS_PAGE}_PENDING`]: (state, data, params) => {  
        return I.set(state, 'isLoading', true)
    },
    [`${GET_MENU_RIGHTS_PAGE}_ERROR`]: (state) => { 
        return I.set(state, 'isLoading', false)
    },
    [`${GET_MENU_RIGHTS_PAGE}_SUCCESS`]: (state,ret = {} ) => { 
        let data = ret.data
        return I.set(state,{
            isLoading : false,
            'reps.data' : data
        });
    },


    [`${GET_MENU_RIGHTS}_PENDING`]: (state, data, params) => { 
        return I.set(state, 'isLoading', true)
    },
    [`${GET_MENU_RIGHTS}_ERROR`]: (state) => {
        return I.set(state, 'isLoading', false)
    },
    [`${GET_MENU_RIGHTS}_SUCCESS`]: (state,ret = {}, params ) => { 
        return I.set(state,{
            isLoading : false,
            reps:ret
        });
    },
},MENURIGHTSMANAGER));

function makeMenu(data, menudata) {
    data.children = [];
    menudata.forEach((_data) => {
        if(data.menukey === _data.parentkey) {
            data.children.push(_data);
            makeMenu(_data, menudata);
        }
    });
    if(data.children.length === 0) {
        delete data.children;
    }
}
