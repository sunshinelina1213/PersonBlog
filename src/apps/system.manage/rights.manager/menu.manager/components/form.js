import React, {PropTypes} from 'react';
import isEmpty from 'lodash/isEmpty';
import { Form, Input, Icon, Button} from 'antd';

const FormItem = Form.Item;

class Forms extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      value:this.props.value,
    }
  }
 
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) { 
        if(this.props.text == '确认添加'){
            this.props.props.addMenu({record:JSON.stringify(values)})
            setTimeout(()=>{
                this.props.onBack()
            }, 200);
        }else if(this.props.text == "确认修改"){
            let data = {...this.state.value,...values}
            this.props.props.changeMenu({record:JSON.stringify(data)})
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
                label="菜单名称"
                hasFeedback
            >
                {getFieldDecorator('name', {
                  rules: [ {
                      required: true, message: '输入不能为空!',
                  }],
                  initialValue: value.name
                })(
                  <Input />
                )}
            </FormItem>
            <FormItem
                {...formItemLayout}
                label="菜单标识"
                hasFeedback
                >
                  {getFieldDecorator('menukey', {
                    rules: [{ required: true, message: '输入不能为空!', whitespace: true }],
                    initialValue: value.menukey
                  })(
                  <Input />
                )}
            </FormItem>
            <FormItem
                  {...formItemLayout}
                  label="菜单父级标识"
                  hasFeedback
                  >
                  {getFieldDecorator('parentkey', {
                      rules: [ {
                          required: true, message: '输入不能为空!',
                      }],
                      initialValue: value.parentkey
                  })(<Input />)}
            </FormItem>
            <FormItem
                {...formItemLayout}
                label="菜单路由"
                hasFeedback
                >
                {getFieldDecorator('url', {
                   rules: [ {
                        required: true, message: '输入不能为空!',
                    }],
                    initialValue: value.url
                })(<Input />)}
            </FormItem>
            <FormItem
                {...formItemLayout}
                label="菜单图标"
                hasFeedback
                >
                {getFieldDecorator('type', {
                    rules: [ {
                        required: true, message: '输入不能为空!',
                    }],
                    initialValue: value.type
                })(<Input />)}
          </FormItem>
          <FormItem
                {...formItemLayout}
                label="菜单图片"
                hasFeedback
                >
                {getFieldDecorator('img', {
                    rules: [ {
                        required: true, message: '输入不能为空!',
                    }],
                    initialValue: value.img
                })(<Input />)}
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
