import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';

import icons from './../../static/font_icon/iconfont.less';

import {hashHistory} from 'react-router'

import * as action from './action';

import Api from './api.js';

import { getCookie } from '../util';
import Originframe from '../components/origin.frame';
class App extends React.Component {
  componentDidMount(){
    const currentUser = getCookie("currentUser");
    // console.log('currentUser',currentUser)
    if(!isEmpty(currentUser)){
      this.props.getProjectList({userLogin:currentUser})
    }else{
        hashHistory.push("/login");
    }
  }

  componentWillReceiveProps(nextProps) {
    var isLogin = getCookie('isLogin');
    
    if (this.props.isLogin!=nextProps.isLogin&&nextProps.location.pathname!='/') {
      hashHistory.push({
        pathname:''
      });
      this.props.onLogout({
        cookie:document.cookie
      });
      // this.props.changeLocation('/apps');
    }
  }

  
  render() {
    return (
      <div >
        <Originframe  {...this.props}/>
      </div>
    );
  }
}

/**
 * APP级别的全局状态映射到APP组件的属性上，供控制全局的展现
 * eg. 左侧菜单的状态(放大缩小，当前路径高亮展开子菜单，右侧的统一面包屑路径，登录用户状态信息等等等)
 * @param  {[type]} state    [description]
 * @param  {[type]} ownProps [description]
 * @return {[type]}          [description]
 */
function mapStateToProps(state, ownProps) {
  let i = state.get('APP');
  // console.log('i',i)
  return {
    ...i
  }
}

/**
 * APP级别的全局状态触发事件绑定，由./reducer里的函数负责触发状态修改，分离view和controller
 * @param  {[type]} dispatch [description]
 * @return {[type]}          [description]
 */
function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators(action, dispatch),
    
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
