import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as action from './action';
import {Form, Table, Input, Icon, Button, Popconfirm ,Pagination} from 'antd';
import styles from '../index.less';

import Forms from './components/form.js';
import SearchInput from '../../../../components/search.input';

class Departmentmanager extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isDisabled:false,
            content: '',
            isToggle:true,
            text:'',
            value:'',
            index:'',
            current: this.props.page.current,
            limit: this.props.page.limit
        };
    }
    componentDidMount(){
        this.props.getDepartment({search:this.state.content,current: this.props.page.current,limit: this.props.page.limit})
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.departmentData.current){
            this.setState({
                current: nextProps.departmentData.current
            })
        }
        if(nextProps.departmentData.columns != undefined && this.props.departmentData.columns != nextProps.departmentData.columns){
            nextProps.departmentData.columns.push({
                title: '操作',
                dataIndex: 'department_cz',
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
        this.setState({
            current: this.props.page.current
        });
        this.props.getDepartment({search:this.state.content,current: this.state.current,limit: this.props.page.limit})
    }
    //分页
    onPageChange(ele){
        this.setState({current: ele });
        this.props.getDepartmentPage({search:this.state.content,current: ele,limit: this.state.limit});
    }

    //新增
    handleAdd = () => {
        this.setState({
            isDisabled:false,
            isToggle:false,
            text:'确认添加',
            value:'',
            index:''
        });
    }
    //删除
    onDelete(index,record){
        this.props.deleteDepartment({record:JSON.stringify(record),current:this.state.current,limit:this.state.limit})
    }

    //修改
    onUpdate(index,record){
        this.setState({
            isDisabled:true,
            isToggle:false,
            text:'确认修改',
            value:record,
            index:''
        })
    }
    //分页
    onPageChange(ele){
        this.setState({current: ele });
        this.props.getDepartmentPage({search:this.state.content,current: ele,limit: this.state.limit});
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
                        <Button type="primary" className={styles["editable-add-btn"]} onClick={this.handleAdd}>机构新建</Button> 
                         <div>
                            <SearchInput 
                                content="content" 
                                placeholder="按名称查找" 
                                size="large" 
                                doChange={this.onInputChange} 
                                doSearch={this.onSearch} 
                                onPressEnter={this.onSearch}
                            />
                            {
                                this.props.departmentData.total > 0 ?
                                    <div>
                                        <Table dataSource={this.props.departmentData.data} columns={this.props.departmentData.columns} pagination={false}/>
                                        <div className={styles['page-css']}>
                                            {
                                                this.props.departmentData.total > this.props.page.limit ? 
                                                <Pagination
                                                        defaultCurrent={page.current}
                                                        current={this.state.current}
                                                        total={this.props.departmentData.total}
                                                        pageSize={page.limit}
                                                        onChange={(ele)=>{this.onPageChange(ele)}}
                                                    /> 
                                                :""
                                            }
                                        </div> 
                                    </div> 
                                    : 
                                    <div>暂无数据</div>
                            }
                            
                        </div>
                    </div>
                    : 
                    <Forms 
                        form={this.props.form}
                        dataSource={this.props.departmentData.data}
                        onBack = {this.onBack}
                        index={this.state.index} 
                        text= {this.state.text} 
                        isDisabled= {this.state.isDisabled} 
                        value={this.state.value}
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
  let department = state.get('system.manage').get('rights.manager').get('department.manager');
  return {
    isLoading:department.isLoading,
    departmentData:department.reps,
    page:department.page
  }
}
function mapDispatchToProps(dispatch){
  return {
    ...bindActionCreators(action,dispatch),
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(Departmentmanager))

