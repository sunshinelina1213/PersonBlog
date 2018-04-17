
        "use strict";
        module.exports = {
            menu_output :{
                _id:"_id",
                MENU_NAME:"name",              
                MENU_KEY : "menukey",          
                MENU_URL:"url",              
                MENU_ICON : "type",          
                MENU_IMG:'img',
                PARENT_KEY : 'parentkey'           
            },
            menu_columns:[
                {title:"菜单名称",dataIndex:'name'},
                {title:"菜单标识",dataIndex:'menukey'},
                {title:"菜单图标",dataIndex:'type'},
                {title:"菜单路由",dataIndex:'url'}
            ]
        }