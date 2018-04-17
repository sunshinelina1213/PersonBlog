import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as action from './action';
import {Input, Icon, Spin, Form, Button } from 'antd';
import styles from './index.less';
import {hashHistory, Link} from "react-router";
import isEmpty from 'lodash/isEmpty';

const FormItem = Form.Item;

class Departmentconfig extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }
    componentDidMount(){
        this.props.getDepartmentConfig()
    }
    handleBack(){
        hashHistory.push('/apps/system.manage/system.config/system.config.main')
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let data = {...this.state.value,...values}
                // console.log('data',data)
                this.props.changeDepartmentConfig(data)
            }
        });
    }
    getFormItem(){
        const { getFieldDecorator } = this.props.form;
        const  configData = this.props.configdata.configData;
        // console.log("configData",configData)
        if(!isEmpty(configData)){
            return(
                <div>
                    <FormItem
                        label="title"
                        labelCol={{ span: 4 }}
                        wrapperCol={{ span: 8 }}
                    >
                        {getFieldDecorator('DEPARTMENT_NAME', {
                            rules: [{ required: true, message: 'Please input your note!' }],
                            initialValue: configData[0].title
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem
                        label="title"
                        labelCol={{ span: 4 }}
                        wrapperCol={{ span: 8 }}
                    >
                        {getFieldDecorator('DEPARTMENT_REMARK', {
                            rules: [{ required: true, message: 'Please input your note!' }],
                            initialValue: configData[1].title
                        })(
                            <Input />
                        )}
                    </FormItem>
                </div>
            )
        }
    }
    render(){
        const { getFieldDecorator } = this.props.form;
        return (
            <div className = {styles['department-config']}>
                <div className = {styles['config-title']}>
                    <span>机构配置</span>
                    <Icon type="rollback" onClick = {()=>this.handleBack()}/>
                </div>
                <Form onSubmit={this.handleSubmit}>
                    {this.getFormItem()}
                    <FormItem
                        wrapperCol={{ span: 8, offset: 4 }}
                    >
                        <Button type="primary" htmlType="submit">
                            确认修改
                        </Button>
                    </FormItem>
                </Form>
            </div>
        );
    }
}
Departmentconfig = Form.create({})(Departmentconfig)

function mapStateToProps(state,ownProps){
    const departmentConfig = state.get('system.manage').get('system.config').get('department.config');
    return {
        isLoading: departmentConfig.isLoading,
        configdata: departmentConfig.reps
    }
}
function mapDispatchToProps(dispatch){
    return {
        ...bindActionCreators(action,dispatch),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Departmentconfig)
