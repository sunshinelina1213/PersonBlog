import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as action from './action';
import {Input, Icon, Form, Button } from 'antd';
import styles from './index.less';
import isEmpty from 'lodash/isEmpty';
import {hashHistory, Link} from "react-router";

const FormItem = Form.Item;

class Menuconfig extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }
    componentDidMount(){
        this.props.getMenuConfig()
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
                this.props.changeMenuConfig(data)
            }
        });
    }
    getFormItem(){
        const { getFieldDecorator } = this.props.form;
        const  configData = this.props.configdata.configData;
        if(!isEmpty(configData)){
            return(
                <div>
                    <FormItem
                        label="title"
                        labelCol={{ span: 4 }}
                        wrapperCol={{ span: 8 }}
                    >
                        {getFieldDecorator('name', {
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
                        {getFieldDecorator('menukey', {
                            rules: [{ required: true, message: 'Please input your note!' }],
                            initialValue: configData[1].title
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem
                        label="title"
                        labelCol={{ span: 4 }}
                        wrapperCol={{ span: 8 }}
                    >
                        {getFieldDecorator('type', {
                            rules: [{ required: true, message: 'Please input your note!' }],
                            initialValue: configData[2].title
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem
                        label="title"
                        labelCol={{ span: 4 }}
                        wrapperCol={{ span: 8 }}
                    >
                        {getFieldDecorator('url', {
                            rules: [{ required: true, message: 'Please input your note!' }],
                            initialValue: configData[3].title
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
            <div className = {styles['menu-config']}>
                <div className = {styles['config-title']}>
                    <span>菜单配置</span>
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
Menuconfig = Form.create({})(Menuconfig)

function mapStateToProps(state,ownProps){
    const menuConfig = state.get('system.manage').get('system.config').get('menu.config');
    return {
        isLoading: menuConfig.isLoading,
        configdata: menuConfig.reps
    }
}
function mapDispatchToProps(dispatch){
    return {
        ...bindActionCreators(action,dispatch),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Menuconfig)
