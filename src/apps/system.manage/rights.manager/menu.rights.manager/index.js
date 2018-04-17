import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as action from './action';
import {Form, Table, Input, Icon, Button, Popconfirm ,Pagination,  Modal, Tree} from 'antd';
import styles from '../index.less';

import { getCookie } from '../../../../util';
import SearchInput from '../../../../components/search.input';
const TreeNode = Tree.TreeNode;

class Menurights extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            content: '',
            text:'',
            value:'',
            index:'',
            current: this.props.page.current,
            visible: false,
            expandedKeys: [],
            autoExpandParent: true,
            halfCheckedKeys:[],
            checkedKeys : this.props.setMenuData.map((item)=>{
                return item.MENU_KEY
            }),
        };
    }
    componentDidMount(){
        const currentUser = getCookie("currentUser");
        this.props.getMenuSecond({userLogin:currentUser});
        this.props.getMenuRights({search:this.state.content,current: this.props.page.current,limit: this.props.page.limit})
    }

    componentWillReceiveProps(nextProps){
        if(this.props.setMenuData !== nextProps.setMenuData){
            this.setState({
                checkedKeys : nextProps.setMenuData.map((item)=>{
                    return item.MENU_KEY    
                }),
            })
        }
        if(nextProps.menurightsData.columns != undefined && this.props.menurightsData.columns != nextProps.menurightsData.columns){
            nextProps.menurightsData.columns.push({
                title: '操作',
                dataIndex: 'menurights_cz',
                render: (text, record, index) => {
                  return (
                    <div className ={styles["link-box"]}>
                        <a className= {styles['alink']} onClick = {this.showModal.bind(this,record)}>菜单配置</a>
                    </div>
                  )
                }
            });
        }
    }

   //查询
    onInputChange = (key,value) => {
        let o = {};
        o[key] = value;
        this.setState(o);
    }
    onSearch = () => {
        this.setState({
            current: this.props.page.current
        });
        this.props.getMenuRights({search:this.state.content,current: this.props.page.current,limit: this.props.page.limit})
    }
    //分页
    onPageChange(ele){
        this.setState({current: ele });
        this.props.getMenuRightsPage({search:this.state.content,current: ele,limit: this.props.page.limit});
    }

    //新增
    handleAdd = () => {
        this.setState({
            isToggle:false,
            text:'确认添加',
            value:'',
            index:''
        });
    }

    //弹框
    showModal(record){
        this.setState({
            visible: true
        });
        this.props.setMenuRights({userLogin:JSON.stringify(record)}) 
    }

    handleOk(userLogin,checkedKeys){
        // console.log('userLogin',userLogin)
        this.props.changeMenuRights({RIGHTS_KEY:userLogin.RIGHTS_KEY,menukey:this.state.checkedKeys,firstFatherkeys:this.state.halfCheckedKeys})
        this.setState({
            visible: false,
            checkedKeys : []
        });
    }

    onExpand = (expandedKeys) => {
        this.setState({
            expandedKeys,
            autoExpandParent: false,
        });
    }

    onCheck = (checkedKeys,e) => {
        console.log('e-----------',e.halfCheckedKeys)
        this.setState({
            checkedKeys:checkedKeys,
            halfCheckedKeys:e.halfCheckedKeys 
        });
    }
    handleCancel=()=>{
        this.setState({
            visible: false,
            checkedKeys : []
        });
    }
    render() {
        const {page, form} = this.props;
        const loop = data => data.map((item) => {
            if (item.children) {
                return (
                    <TreeNode key={item.menukey} title={item.name} >
                        {loop(item.children)}
                    </TreeNode>
                );
            }
            return <TreeNode key={item.menukey} title={item.name} />;
        });
        

        return (
            <div className = {styles['box-content']}>
                <div className={styles["box-box"]}>  
                    <SearchInput 
                        content="content" 
                        placeholder="按角色名称查找" 
                        size="large" 
                        doChange={this.onInputChange} 
                        doSearch={this.onSearch} 
                        onPressEnter={this.onSearch}
                    />
                    <Table dataSource={this.props.menurightsData.data} columns={this.props.menurightsData.columns} pagination={false}/>
                    <div className={styles["page-css"]}>
                        {
                            this.props.menurightsData.total > this.props.page.limit ? 
                            <Pagination
                                defaultCurrent={page.current}
                                current={this.state.current}
                                total={this.props.menurightsData.total}
                                pageSize={page.limit}
                                onChange={(ele)=>{this.onPageChange(ele)}}
                            /> 
                            :""
                        }
                    </div> 
                    <Modal title="菜单权限配置" 
                        visible={this.state.visible} 
                        onOk={this.handleOk.bind(this,this.props.userLogin,this.state.checkedKeys,this.state.halfCheckedKeys)} 
                        onCancel={this.handleCancel}
                    >
                        <Tree checkable onExpand={this.onExpand}  
                            autoExpandParent={this.state.autoExpandParent}
                            onCheck={this.onCheck}
                            checkedKeys={this.state.checkedKeys}
                        >
                            {loop(this.props.unseldata)} 
                        </Tree>
                    </Modal>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state,ownProps){
    let menurights = state.get('system.manage').get('rights.manager').get('menu.rights.manager');
    return {
        isLoading : menurights.isLoading,
        menurightsData : menurights.reps,
        page : menurights.page,
        setMenuData : menurights.setMenuData,
        unseldata:menurights.unseldata,
        userLogin : menurights.userLogin,
        changeData: menurights.changeData
    }
}
function mapDispatchToProps(dispatch){
  return {
    ...bindActionCreators(action,dispatch),
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(Menurights))

