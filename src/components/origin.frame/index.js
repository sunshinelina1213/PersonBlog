import React from 'react'

import { message } from 'antd'
import styles from './index.less'
// import './custom.ant.less'
import Originheader from './header'
import classNames from 'classnames'
import { is, fromJS } from 'immutable'
import * as _ from 'lodash'

export default class Originframe extends React.Component {
  constructor() {
    super()
    this.state = { 
      collapse: false 
    };
  }

  componentWillReceiveProps(nextProps) {
    const flag = !is(fromJS(nextProps.selectedSiderNode), fromJS(this.props.selectedSiderNode));
    if (flag) {
      this.changeLocation(nextProps)
    }
  }

  changeLocation(props) { //给子组件调用,需要绑定this,指向现在的上下文 cc:ln/2017-10-09
    const { changeLocation, tree, selectedSiderNode, selectedTopNode, urlParams } = props;
    let iid = '-1';
    if (!_.isEmpty(selectedSiderNode)) {
      const path = selectedSiderNode.path;
      iid = (path && path.length > 0 && path[0]) || '-1';
    } else {
      iid = selectedTopNode.iid;
    }
    const url = tree[iid] && tree[iid].url;
    if (url) {
      changeLocation(url, urlParams);
    } else {
      if (!tree[iid].ids) {
        message.info(`'${tree[iid].name}' 正在建设中,敬请期待...`)
      }
    }
  }


  render() {
    //第二个frame是复写ant样式用的,复写的原理是给ant样式添加'frame'的命名空间  cc:ln/2017-10-07
    const cls = classNames(styles['frame'], 'frame');
    const { location, list, doLogout, selectedSiderNode, selectedTopNode, tree, systemMenu} = this.props;
    
    // console.log("frame ---props",this.props);
    return (
      <div className = {styles["index-all-main"]}>
        <Originheader location={location} list={list} doLogout={doLogout} tree={tree} selectedTopNode={selectedTopNode} systemMenu={systemMenu}/>
        <div>
          <div className={styles["index-content"] }>
            {this.props.children}
          </div>
        </div>
      </div>
    )
  }
}
