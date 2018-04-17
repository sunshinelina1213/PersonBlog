import { createReducer } from '../util';

import I from 'immuter';
import { LOCATION_CHANGE } from 'react-router-redux-fixed';
import { uniqueId } from 'lodash';
import { createStateOfTree, getDefaultTopNavIid, getSeledSiderNodeBy, getSeledNodeByUrl} from './app.help';
import _ from 'lodash';

const initialState = {
  loading: false,
  isLogin:true,
  location: {},
  list:[],
  defaultSelectedTopNode: '系统管理',
  selectedTopNode: { name: '', iid: '' },
  tree: {},
  systemMenu : [],
  commonParamList: {
    success: true,
    data: [],
    message: null,
    code: 0
  }
};

export default createReducer(initialState, {
  //原型部分获取菜单
  GET_PROJ_LIST_PENDING: (state, data, params) => {
    return I.set(state, 'isLoading', true);
  },
  GET_PROJ_LIST_ERROR: (state, data, params) => {
    return I.set(state, 'isLoading', false);
  },

  GET_PROJ_LIST_SUCCESS : (state,ret = {} , params) =>{
    let menudata = ret.menudata;
    let menunewdata = _.cloneDeep(menudata);
    let firstarr = [];
    // debugger
    menunewdata.forEach((data) => {
        if(data.parentkey === "first") {
            firstarr.push(data);
            makeMenu(data, menunewdata);
        }
    });
    var tree = firstarr;
    //在这里加工成界面显示的菜单数据
    // debugger
    let itree = createStateOfTree(tree); //这里的`tree`需要换成后台请求过来的tree
    const iid = getDefaultTopNavIid(state.defaultSelectedTopNode, itree);
    
    // const seledTopNode = { name: itree[iid].name, iid: iid };
    if(state.location.pathname === '/apps'){
      return I.set(state, {
        list: menudata,
        // 'reps.menudata' : firstarr,
        tree: itree,
        systemMenu : firstarr,
        // selectedTopNode: seledTopNode
      })

    }else{
      return I.set(state, {
        list: menudata,
        'reps.menudata' : firstarr,
        tree: itree,
        // selectedTopNode: seledTopNode,
        systemMenu : firstarr,
        urlParams : state.location.query||{}
      })
    }
  },

  LOGIN_OUT_SUCCESS: (state, data, params) => {
    return I.set(state, {
      isLogin : !state.isLogin
    })
  },

 
  TOP_NAV_SELED: (state, data, params) => {
    let seledTopNode = {}, seledSiderNode = {};
    if (params.iid) {
      seledTopNode = { name: state.tree[params.iid].name, iid: params.iid }
    }
    return I.set(state, {
      selectedTopNode: seledTopNode,
      selectedSiderNode: getSeledSiderNodeBy(seledTopNode, state.tree)||{}
    })
  },

  //@param {object} params {iid : '',path : []} 
  SIDER_NAV_SELED: (state, data, params) => {
    const node = state.tree[params.iid];
    const siderNode = state.selectedSiderNode;
   
    // console.log('node=====>',node)//{name: "菜单管理", url: "/apps/rights.manager/menu.manager", iid: "29"}


    return I.set(state, 'selectedSiderNode', {
      iid: params.iid,
      name: node.name,
      path: [].concat(params.path, [...siderNode.path].pop())
    })
  },

  //@param {object} {iid: '',path : []}
  NAV_CHANGE: (state, data, params) => {
    const sideNode = state.tree[params.iid];
    const path = params.path;
    const topNode = state.tree[path[path.length - 1]]

    return I.set(state, {
      selectedTopNode: {
        name: topNode.name, iid: topNode.iid
      },
      selectedSiderNode: {
        name: sideNode.name, iid: params.iid, path: params.path
      }
    })
  },


  [LOCATION_CHANGE]: (state, location) => {
    return I.set(state, 'location', location)
  }

});
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