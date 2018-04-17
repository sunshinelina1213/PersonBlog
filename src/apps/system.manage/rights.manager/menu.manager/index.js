import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as action from './action';
import {Form, Table, Input, Icon, Button, Popconfirm ,Pagination} from 'antd';
import styles from '../index.less'
import isEmpty from 'lodash/isEmpty';

import Forms from './components/form.js';
import SearchInput from '../../../../components/search.input';
import { getCookie } from '../../../../util';

class Menumanager extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource:[],
            filtered: false,
            content: '',
            isToggle:true,
            text:'',
            value:'',
            index:''
        };
    }
    componentDidMount(){
        const currentUser = getCookie("currentUser");
        this.props.getMenu()
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.searchdata){
            this.setState({
                dataSource: nextProps.searchdata
            });
        }else{
            this.setState({
                dataSource: nextProps.menuData.menudata
            });
        }

        if(nextProps.menuData.columns != undefined && this.props.menuData.columns != nextProps.menuData.columns){
            nextProps.menuData.columns.push({
                title: '操作',
                dataIndex: 'menu_cz',
                render: (text, record, index) => {
                  return (
                    <div className ={styles["link-box"]}>
                        <a className= {styles["alink"]} onClick={() => this.onDelete(index,record)}>删除</a>
                        <a className= {styles['alink']} style={{marginLeft:"10px"}} onClick={(e)=>this.onUpdate(index,record)}>修改</a>
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
        const { userLogin } = this.props;
        const { dataSource } = this.state;
        const content = this.state.content
        this.props.searchMenu({content:JSON.stringify(content)})
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
     //删除
    onDelete(index,record){
        this.props.deleteMenu({record:JSON.stringify(record)})
    }
    //修改
    onUpdate = (index,record) => {
        this.setState({
            isToggle:false,
            text:'确认修改',
            value:record,
            index:''
        })
    }
    //返回
    onBack =() =>{
        this.setState({
            "isToggle":true,
        })
    }
    
    render() {
        const {form} = this.props;

        return (
            <div className = {styles['box-content']}>
                {
                    this.state.isToggle
                    ? 
                    <div className={styles["box-box"]}>  
                        <Button type="primary" className={styles["editable-add-btn"]} onClick={this.handleAdd}>菜单新建</Button> 
                         <div>
                            <SearchInput 
                                content="content" 
                                placeholder="按菜单名称查找" 
                                size="large" 
                                doChange={this.onInputChange} 
                                doSearch={this.onSearch} 
                                onPressEnter={this.onSearch}
                            />
                            <Table columns = {this.props.menuData.columns} rowKey="name"  dataSource={this.state.dataSource} pagination={false}/>
                        </div>
                    </div>
                    : 
                    <Forms 
                        form = {this.props.form}
                        dataSource={this.state.dataSource}
                        onBack = {this.onBack}
                        index={this.state.index} 
                        text= {this.state.text} 
                        value={this.state.value}
                        props={this.props}
                    />
                }
            
            </div>
        );
    }
}

function mapStateToProps(state,ownProps){
    let menu = state.get('system.manage').get('rights.manager').get('menu.manager');
    let userLogin = state.get('login')
    console.log('menu.reps',menu.reps)
    //console.log('userLogin',userLogin.data)
    //console.log('menu',menu.reps)
    //console.log('searchdata',menu.searchdata)
    return {
        isLoading:menu.isLoading,
        menuData:menu.reps,
        userLogin: userLogin.data,
        searchdata:menu.searchdata
    }
}
function mapDispatchToProps(dispatch){
    return {    
        ...bindActionCreators(action,dispatch),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(Menumanager))
