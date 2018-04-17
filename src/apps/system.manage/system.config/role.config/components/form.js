import React from 'react';
import {Input, Icon, Form, Button } from 'antd';
import isEmpty from 'lodash/isEmpty';

const FormItem = Form.Item;

class Roleconfigform extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            configData:this.props.configData
        }
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let data = {...this.state.value,...values}
                console.log('data',data)
                this.props.props.changeRoleConfig(data)
            }
        });
    }
    getFormItem(){
        const { getFieldDecorator } = this.props.form;
        const { configData } = this.state;
        // console.log("configData",configData[1].title)
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
                        {getFieldDecorator('remark', {
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
        const { configData } = this.state;
        return(
            <div>
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
        )
    }
}
Roleconfigform = Form.create({})(Roleconfigform)

export default Roleconfigform;