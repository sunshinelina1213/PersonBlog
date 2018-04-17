import React from 'react';
import { Form, Input, Button, Icon, Checkbox } from 'antd';
import style from './login.less';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as action from './action'
import * as Api from './api'
import * as AppAction from 'AppAction'

import { setCookie } from '../../util';
class Login extends React.Component {
    constructor(props){
      super(props);
      this.state={
        loginSuccess:true
      };
    };

    doLogin = () => {
      const params = this.props.form.getFieldsValue();
      this.props.doLogin(params)
    }

    componentWillReceiveProps(nextProps) {
      if (nextProps.loginSuccess) {
        setCookie("currentUser", nextProps.loginData);
        this.props.reset()
        this.props.changeLocation('/apps/guide.index');
      }
    }


    render() {
      const { getFieldDecorator } = this.props.form;
      const {loginSuccess} = this.props;
      const sameProps = {
        onPressEnter: this.doLogin
      }
        return (
           <div className={style.loginMain}>
               <div className={style.loginTop}>
                <i></i>
               </div>
               <div className={style.loginMiddel}>
                 <div className={style.avator}></div>
                 <div>
                   {
                     getFieldDecorator('username')(
                       <Input className={style.username} size="large" placeholder="请输入用户名" />
                     )
                   }
                   {
                     getFieldDecorator('password')(
                       <Input className={style.password} size="large" type="password" placeholder="请输入密码" />
                     )
                   }
                   <Button
                     icon="logout"
                     type="primary"
                     size="large"
                     loading={this.props.isLogging}
                     onClick={this.doLogin}
                   >
                     登录
                   </Button>
                 </div>
               </div>
               
           </div>
        )
    }
}

function mapStateToProps(state, ownProps) {
  const login = state.get('login');
  
  return {
    isLogging: login.isLoading, 
    message: login.message,
    loginSuccess: login.loginSuccess,
    loginData: login.data
  };
}

function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators(action, dispatch),
    ...bindActionCreators(AppAction, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(Login))
