import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as action from './action';
import {Form, Table, Input, Icon, Button, Popconfirm ,Pagination} from 'antd';
import styles from '../index.less';
import Forms from './components/form.js';

import SearchInput from '../../../../components/search.input';


class Usermanager extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            content: '',
            isToggle:true,
            text:'',
            value:'',
            index:'',
            current: this.props.page.current,
            limit: this.props.page.limit,
            deleteFold:false
        };
    }
    //初始化
    componentDidMount(){
        this.props.getUser({search:this.state.content,current: this.props.page.current,limit: this.props.page.limit})
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.userData.current){
             this.setState({
                current: nextProps.userData.current
            })
        }
        if(nextProps.userData.columns != undefined && this.props.userData.columns != nextProps.userData.columns){
            nextProps.userData.columns.push({
                title: '操作',
                dataIndex: 'user_cz',
                render: (text, record, index) => {
                  return (
                    <div className ={styles["link-box"]}>
                        <a className= {styles["alink"]} onClick = {() => this.onDelete(index,record)}>删除</a>
                        <a className= {styles["alink"]} style={{marginLeft:"10px"}} onClick={()=>this.onUpdate(index,record)}>修改</a>
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
        // console.log('o===',o)
    }
    onSearch = () => {
        this.setState({
            current: this.state.current
        });
        this.props.getUser({search:this.state.content, current: this.props.page.current, limit: this.props.page.limit})
    }
    //分页
    onPageChange(ele){
        this.setState({current: ele });
        this.props.getUserPage({search:this.state.content, current: ele, limit: this.state.limit});
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
        // console.log('record',record)
        this.props.deleteUser({record:JSON.stringify(record),current:this.state.current,limit:this.state.limit})
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
        const {page, form} = this.props;
        return (
            <div className = {styles['box-content']}>
                {
                    this.state.isToggle
                    ? 
                    <div className={styles["box-box"]}>  
                        <Button type="primary" className={styles["editable-add-btn"]} onClick={this.handleAdd}>用户新建</Button> 
                        <div>
                            <SearchInput 
                                content="content" 
                                placeholder="按用户名称查找" 
                                size="large" 
                                doChange={this.onInputChange} 
                                doSearch={this.onSearch} 
                                onPressEnter={this.onSearch}
                            />
                            <Table columns = {this.props.userData.columns} dataSource={this.props.userData.data} pagination={false}/>
                            <div className={styles["page-css"]}>
                                {
                                    this.props.userData.total > this.props.page.limit ? 
                                    <Pagination
                                            defaultCurrent={page.current}
                                            current={this.state.current}
                                            total={this.props.userData.total}
                                            pageSize={page.limit}
                                            onChange={(ele)=>{this.onPageChange(ele)}}
                                        /> 
                                    :""
                                }
                            </div> 
                        </div>
                    </div>
                    : 
                    <Forms 
                        form={this.props.form}
                        dataSource={this.props.userData.data}
                        onBack = {this.onBack}
                        index={this.state.index} 
                        text= {this.state.text} 
                        value={this.state.value} 
                        roledata={this.props.userData.roledata}
                        role={this.props.userData.role}
                        departmentdata={this.props.userData.departmentdata}
                        department={this.props.userData.department}
                        props={this.props}
                        current = {this.state.current}
                        limit = {this.props.page.limit}
                    />
                }
            
            </div>
        );
    }
}

function mapStateToProps(state,ownProps){
  let user = state.get('system.manage').get('rights.manager').get('user.manager');
//   console.log('user=======',user)
  return {
    isLoading:user.isLoading,
    userData:user.reps,
    page:user.page
  }
}
function mapDispatchToProps(dispatch){
  return {
    ...bindActionCreators(action,dispatch),
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(Usermanager))
