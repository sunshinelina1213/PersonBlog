import React, {PropTypes} from 'react';
import isEmpty from 'lodash/isEmpty';
import { Card, Form, Input, InputNumber, Icon, Select, Button} from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;

class Forms extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      value:this.props.value,
      roledata:this.props.roledata,
      role:this.props.role,
      departmentdata:this.props.departmentdata,
      department:this.props.department
    }
  }
  onSelect(e) {
    
  }

  departmentForEach(){
    const {department ,departmentdata} = this.state
    departmentdata.forEach((d) => {
      department[d['DEPARTMENT_KEY']] = d['DEPARTMENT_NAME'] || ''
    });
    let items = Object.keys(department).map( item=>{
      return   <Option key={item} value={item}>{department[item]}</Option>
    })

    return ( <Select onSelect ={(e)=>this.onSelect(e)}>
                {items}
            </Select>)  
    }

  roleForEach() {
    const {role ,roledata} = this.state
    roledata.forEach((r) => {
      role[r['RIGHTS_KEY']] = r['ROLE_NAME'] || ''
    });
    let items = Object.keys(role).map( item=>{
      return   <Option key={item} value={item}>{role[item]}</Option>
    })

    return ( <Select onSelect ={(e)=>this.onSelect(e)}>
                {items}
          </Select>)  
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) { 
        if(this.props.text == '确认添加'){
          this.props.props.addUser({record: JSON.stringify(values),limit: this.props.limit,current: this.props.current});  
          setTimeout(()=>{
               this.props.onBack()
           }, 200);
        }else if(this.props.text == "确认修改"){
          let data = {...this.state.value,...values}
          this.props.props.changeUser({record: JSON.stringify(data),limit: this.props.limit,current: this.props.current})
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
            label="用户名"
            hasFeedback
          >
            {getFieldDecorator('LOGIN_NAME', {
              rules: [ {
                required: true, message: '输入不能为空!',
              }],
              initialValue: value.LOGIN_NAME
            })(
              <Input />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="密码"
            hasFeedback
          >
            {getFieldDecorator('LOGIN_PASSWORD', {
              rules: [{
                required: true, message: '输入不能为空!',
              }, {
                validator: this.checkConfirm,
              }],
              initialValue: value.LOGIN_PASSWORD
            })(
              <Input type="password" />
            )}
          </FormItem>
      
          <FormItem
            {...formItemLayout}
            label="姓名"
            hasFeedback
          >
            {getFieldDecorator('USER_XM', {
              rules: [{ required: true, message: '输入不能为空!', whitespace: true }],
              initialValue: value.USER_XM
            })(
              <Input />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="证件号码"
          >
            {getFieldDecorator('USER_ZJHM', {
            
              rules: [{ required: true, message: '输入不能为空!' }],
              initialValue: value.USER_ZJHM
            })(
              <InputNumber  style={{ width: '100%' }} />
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="所属机构">
             {getFieldDecorator('DEPARTMENT_KEY', {
                initialValue:value == '' ? value.DEPARTMENT_KEY: value.DEPARTMENT_KEY.toString(),
                rules: [{required: true,message: '输入不能为空!'}],
                })(
                  this.departmentForEach()
              )}  
          </FormItem>
          <FormItem {...formItemLayout} label="所属角色">
               {getFieldDecorator('RIGHTS_KEY', {
                initialValue:value == '' ? value.RIGHTS_KEY: value.RIGHTS_KEY.toString(),
                rules: [{required: true,message: '输入不能为空!'}],
                })(
                  this.roleForEach()
              )} 
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

// import React from 'react';

// class Forms extends React.Component{
//   render(){
//     return <div>Form</div>
//   }
// }
// export default Forms;