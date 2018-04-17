import { createReducer,createReduceOf } from "../../../../util";
import { USERMANAGER, GET_USER, GET_USER_PAGE, ADD_USER, DELETE_USER, CHANGE_USER } from './constant.js';
import I from 'immuter'

const initState = {
    isLoading: false,
    page: {
        current: 1,
        limit: 3
    },
    reps: {
        success: true,
        data:[],
        columns:[],
        total: 0,
        role:{},
        roledata:{},
        departmentdata:{},
        department:{}
    }
};

export default createReducer(initState,createReduceOf({
    [`${ADD_USER}_PENDING`]: (state, data, params) => {  
        return I.set(state, 'isLoading', true)
    },
    [`${ADD_USER}_ERROR`]: (state) => { 
        return I.set(state, 'isLoading', false)
    },
    [`${ADD_USER}_SUCCESS`]: (state,ret = {} ) => {
       
        let userdata = ret.data;
        let roledata = ret.roledata;
        let departmentdata = ret.departmentdata;
        
        userdata.forEach(function(subuserdata) {
            roledata.forEach(function(subroledata){
                if(subuserdata.RIGHTS_KEY === subroledata.RIGHTS_KEY){
                    subuserdata['ROLE_NAME'] = subroledata.ROLE_NAME
                }
            })
            departmentdata.forEach(function(subdepdata){
                if(subuserdata.DEPARTMENT_KEY === subdepdata.DEPARTMENT_KEY){
                    subuserdata['DEPARTMENT_NAME'] = subdepdata.DEPARTMENT_NAME
                }
            })
        });
        return I.set(state,{
            isLoading : false,
            reps : ret
        });
    },

    [`${DELETE_USER}_PENDING`]: (state, data, params) => {  
        return I.set(state, 'isLoading', true)
    },
    [`${DELETE_USER}_ERROR`]: (state) => { 
        return I.set(state, 'isLoading', false)
    },
    [`${DELETE_USER}_SUCCESS`]: (state,ret = {} ) => { 
        let userdata = ret.data;
        let roledata = ret.roledata;
        let departmentdata = ret.departmentdata;
        
        userdata.forEach(function(subuserdata) {
            roledata.forEach(function(subroledata){
                if(subuserdata.RIGHTS_KEY === subroledata.RIGHTS_KEY){
                    subuserdata['ROLE_NAME'] = subroledata.ROLE_NAME
                }
            })
            departmentdata.forEach(function(subdepdata){
                if(subuserdata.DEPARTMENT_KEY === subdepdata.DEPARTMENT_KEY){
                    subuserdata['DEPARTMENT_NAME'] = subdepdata.DEPARTMENT_NAME
                }
            })
        });
        return I.set(state,{
            isLoading : false,
            reps : ret
        });
    },


    [`${CHANGE_USER}_PENDING`]: (state, data, params) => { 
        return I.set(state, 'isLoading', true)
    },
    [`${CHANGE_USER}_ERROR`]: (state) => {
        return I.set(state, 'isLoading', false)
    },
    [`${CHANGE_USER}_SUCCESS`]: (state,ret = {} ) => { 
        let userdata = ret.data;
        let roledata = ret.roledata;
        let departmentdata = ret.departmentdata;
        
        userdata.forEach(function(subuserdata) {
            roledata.forEach(function(subroledata){
                if(subuserdata.RIGHTS_KEY === subroledata.RIGHTS_KEY){
                    subuserdata['ROLE_NAME'] = subroledata.ROLE_NAME
                }
            })
            departmentdata.forEach(function(subdepdata){
                if(subuserdata.DEPARTMENT_KEY === subdepdata.DEPARTMENT_KEY){
                    subuserdata['DEPARTMENT_NAME'] = subdepdata.DEPARTMENT_NAME
                }
            })
        });
        return I.set(state,{
            isLoading : false,
            reps : ret
        });
    },


    [`${GET_USER_PAGE}_PENDING`]: (state, data, params) => {  
        return I.set(state, 'isLoading', true)
    },
    [`${GET_USER_PAGE}_ERROR`]: (state) => { 
        return I.set(state, 'isLoading', false)
    },
    [`${GET_USER_PAGE}_SUCCESS`]: (state,ret = {} ) => { 
        let data = ret.data;
        let roledata = ret.roledata;
        let departmentdata = ret.departmentdata;
        
        data.forEach(function(subdata) {
            roledata.forEach(function(subroledata){
                if(subdata.RIGHTS_KEY === subroledata.RIGHTS_KEY){
                    subdata['ROLE_NAME'] = subroledata.ROLE_NAME
                }
            })
            departmentdata.forEach(function(subdepdata){
                if(subdata.DEPARTMENT_KEY === subdepdata.DEPARTMENT_KEY){
                    subdata['DEPARTMENT_NAME'] = subdepdata.DEPARTMENT_NAME
                }
            })
        });
        return I.set(state,{
            isLoading : false,
            'reps.data' : data
        });
    },



    [`${GET_USER}_PENDING`]: (state, data, params) => { 
        return I.set(state, 'isLoading', true)
    },
    [`${GET_USER}_ERROR`]: (state) => {
        return I.set(state, 'isLoading', false)
    },
    [`${GET_USER}_SUCCESS`]: (state,ret = {} ) => { 
        
        let departmentdata = ret.departmentdata;
        // console.log('departmentdata',departmentdata) 
        let userdata = ret.data;
        let roledata = ret.roledata;
        userdata.forEach(function(subuserdata) {
            roledata.forEach(function(subroledata){
                if(subuserdata.RIGHTS_KEY === subroledata.RIGHTS_KEY){
                    subuserdata['ROLE_NAME'] = subroledata.ROLE_NAME
                }
            })
            departmentdata.forEach(function(subdepdata){
                if(subuserdata.DEPARTMENT_KEY === subdepdata.DEPARTMENT_KEY){
                    subuserdata['DEPARTMENT_NAME'] = subdepdata.DEPARTMENT_NAME
                }
            })
        });
        console.log('ret============',ret)
        return I.set(state,{
            isLoading : false,
            reps : ret
        });
    },
},USERMANAGER));
