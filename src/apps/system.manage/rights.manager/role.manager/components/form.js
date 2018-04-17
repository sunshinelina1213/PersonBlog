import React, {PropTypes} from 'react';
import isEmpty from 'lodash/isEmpty';
import { Form, Input, Icon, Button} from 'antd';

const FormItem = Form.Item;

class Forms extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      value:this.props.value
    }
  }
 
  

  handleSubmit = (e) => {
    const {value} =  this.state;
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) { 
        if(this.props.text == '确认添加'){ 
          this.props.props.addRole({record: JSON.stringify(values),limit: this.props.limit,current: this.props.current}) 
          setTimeout(()=>{
               this.props.onBack()
           }, 200);
        }else if(this.props.text == "确认修改"){
            let data = {...this.state.value,...values}
            this.props.props.changeRole({record: JSON.stringify(data),limit: this.props.limit,current: this.props.current})
            setTimeout(()=>{        
                this.props.onBack()
            },200)
        }
      }
    });
  }


  render() {
    const { getFieldDecorator } = this.props.form;
    let {value} = this.state;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
      },
    };
    const tailFormItemLayout = {
      labelCol: {
        xs: {
          span: 8,
          offset: 0,
        },
        sm: {
          span: 8,
          offset: 0,
        },
      },
    };


    return (
      <div  style={{"width":"40%","position":"relative","left":"25%","padding":"30px 0"}} >
        <Form onSubmit={this.handleSubmit}>
          <FormItem
            {...formItemLayout}
            label="角色名称"
            hasFeedback
          >
            {getFieldDecorator('ROLE_NAME', {
              rules: [ {
                required: true, message: '输入不能为空!',
              }],
              initialValue: value.ROLE_NAME
            })(
              <Input />
            )}
          </FormItem>
        
          <FormItem
            {...formItemLayout}
            label="角色备注"
            hasFeedback
          >
            {getFieldDecorator('REMARK', {
              rules: [{ required: true, message: '输入不能为空!', whitespace: true }],
              initialValue: value.REMARK
            })(
              <Input />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="角色ID"
            hasFeedback
            >
            {getFieldDecorator('RIGHTS_KEY', {
                rules: [ {
                    required: true, message: '输入不能为空!',
                }],
                initialValue: value.RIGHTS_KEY
            })(<Input disabled={this.props.isDisabled}/>)}
          </FormItem>
          <FormItem {...tailFormItemLayout} >
            <Button type="primary" htmlType="submit" size="large" style={{"marginRight":"10%","marginLeft":"25%"}}>{this.props.text}</Button>
            <Button type="primary" size="large" onClick={this.props.onBack}>返回</Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

export default Forms
