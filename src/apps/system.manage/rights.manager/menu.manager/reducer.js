import { createReducer,createReduceOf } from "../../../../util";
import { MENUMANAGER, GET_MENU, ADD_MENU, DELETE_MENU, SEARCH_MENU, CHANGE_MENU } from './constant.js';
import I from 'immuter'

const initState = {
    isLoading: false,
    reps: {
        success: true,
        menudata:[],
        columns:[]
    }
};

export default createReducer(initState,createReduceOf({
    //增加
    [`${ADD_MENU}_PENDING`]: (state, data, params) => { 
        return I.set(state, 'isLoading', true)
    },
    [`${ADD_MENU}_ERROR`]: (state, data, params) => {
        return I.set(state, 'isLoading', false)
    },
    [`${ADD_MENU}_SUCCESS`]: (state,ret = {}, params ) => { 
        let menudata = ret.data;
        var firstarr = [];
        menudata.forEach((data) => {
            if(data.parentkey === "first") {
                firstarr.push(data);
                makeMenu(data, menudata);
            }
        });
        return I.set(state,{
            isLoading : false,
            'reps.menudata' : firstarr
        });
    },
    //删除
    [`${DELETE_MENU}_PENDING`]: (state, data, params) => { 
        return I.set(state, 'isLoading', true)
    },
    [`${DELETE_MENU}_ERROR`]: (state, data, params) => {
        return I.set(state, 'isLoading', false)
    },
    [`${DELETE_MENU}_SUCCESS`]: (state,ret = {}, params ) => { 
        let menudata = ret.data;
        var firstarr = [];
        menudata.forEach((data) => {
            if(data.parentkey === "first") {
                firstarr.push(data);
                makeMenu(data, menudata);
            }
        });
        return I.set(state,{
            isLoading : false,
            'reps.menudata' : firstarr
        });
    },

    //修改
    [`${CHANGE_MENU}_PENDING`]: (state, data, params) => { 
        return I.set(state, 'isLoading', true)
    },
    [`${CHANGE_MENU}_ERROR`]: (state, data, params) => {
        return I.set(state, 'isLoading', false)
    },
    [`${CHANGE_MENU}_SUCCESS`]: (state,ret = {}, params ) => { 
        let menudata = ret.data;
        var firstarr = [];
        menudata.forEach((data) => {
            if(data.parentkey === "first") {
                firstarr.push(data);
                makeMenu(data, menudata);
            }
        });
        return I.set(state,{
            isLoading : false,
            'reps.menudata' : firstarr
        });
    },

    //查找
    [`${SEARCH_MENU}_PENDING`]: (state, data, params) => { 
        return I.set(state, 'isLoading', true)
    },
    [`${SEARCH_MENU}_ERROR`]: (state, data, params) => {
        return I.set(state, 'isLoading', false)
    },
    [`${SEARCH_MENU}_SUCCESS`]: (state,ret = {}, params ) => { 
        let searchdata = ret.data;
        return I.set(state,{
            isLoading : false,
            searchdata : searchdata
        });
    },

    //获取菜单
    [`${GET_MENU}_PENDING`]: (state, data, params) => { 
        return I.set(state, 'isLoading', true)
    },
    [`${GET_MENU}_ERROR`]: (state, data, params) => {
        return I.set(state, 'isLoading', false)
    },
    [`${GET_MENU}_SUCCESS`]: (state,ret = {} ) => { 
        let menudata = ret.menudata;
        var firstarr = [];
        menudata.forEach((data) => {
            if(data.parentkey === "first") {
                firstarr.push(data);
                makeMenu(data, menudata);
            }
        });
        return I.set(state,{
            isLoading : false,
            "reps.menudata":firstarr,
            "reps.columns":ret.columns,
            // reps:ret
        });
    },
},MENUMANAGER));

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

