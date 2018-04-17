import React, { PropTypes } from 'react'
import classNames from 'classnames'
import ReactDOM from 'react-dom';
import styles from '../index.less'
import { Menu, Dropdown, Icon, Button, Input, AutoComplete, Row, Col } from 'antd'
import _ from 'lodash';
import { Link,hashHistory } from "react-router";
import { getCurrentSystemModule } from '../../../../apps/app.help.js';
/**
 * @desc 顶部一级导航组件
 * 
 * @auth ln
 * @date 2017-10-06
 */
export default class TopNav extends React.Component {
  static PropTypes = {
    nodes: PropTypes.array,
    toClick: PropTypes.func
  }
  constructor() {
    super()
    this.state = {
      chooseName : "", //选择的菜单
      menuDatas : []
    }
  }
  createDropMenuFor(item) {
    const menuitem = (item || []).map((it, index) => {
      return (
        <div key={`${index}menu`} className='menu-backgroud-color'>
          { index>0 && it.length>0 && <div className="origin-head-Menu-line" key={index}></div> }
          <Menu >
            {
              (it || []).map((navNode,inx) =>{
                return (
                  <Menu.Item key={`${index}${inx}`}>
                    <a className="menu-showname" onClick={e => { this.toClick(e, navNode, index+1 ) }}>
                      {navNode.name}
                   </a>
                  </Menu.Item>
                )
              })
            }
          </Menu>
        </div>
      )
    })
    return (
      <div className="origin-frame-hear" style={{ 'margin-left' : '-7px' }} ref='test22'>
        {menuitem}
      </div>
    )
  }
  createNavLi(navNode) {
    const cls = classNames(
      styles['menu-item'],
      styles['menu-item-hover'],
      (this.state.chooseName === navNode.name) && styles['menu-item-selected']
    )
    const menus = this.createDropMenuFor(this.state.menuDatas || []);
    return (
      navNode.name !=='首页' &&
      <li key={navNode._id} className={cls}>
        <Dropdown overlay={menus} trigger={['click']}>
          <a href="javascript:;" onClick={e => { this.toClick(e, navNode, 0 ) }}>
            <span>{navNode.name}<Icon type="caret-down" className={styles['system-munu-i']} />
            </span>
          </a>
       </Dropdown>   
      </li>
    )
  }
  toClick(e, navNode, index) {
    let params = _.cloneDeep(this.state.menuDatas);
    let name = '';
    index === 0 ? name = navNode.name : '';
    params[index] = navNode.children || [];
    params.map((val,inx) => {
      inx>index ? params[inx]=[] : "";
    })
    this.setState({ chooseName: name, menuDatas : params });
    setTimeout(function(){
      let testDom = this.refs['test22'];
      testDom.style.marginLeft = `-${(testDom.offsetWidth-90)/2+7}px`;
    }.bind(this),100);
    if(navNode.children){
      e.stopPropagation() 
    }else{
      // debugger
      if(navNode.url.indexOf("http") > -1){
        window.open(navNode.url);
      }else{
        hashHistory.push(navNode.url);
      }
    }
    // navNode.children ? e.stopPropagation() : navNode.url.indexOf("Text") > 0 hashHistory.push(navNode.url);
    // 
  }
  render() {
    const systemModule = getCurrentSystemModule(this.props.tree);
    const ul = classNames(
      styles['nav-back'], styles['menu'], styles['menu-horizontal']
    );
    return (
      <ul className={ul} >
        <li className={classNames(styles['menu-item'],styles['system-location'])}>
          <Icon type="environment-o" className={styles['location-i']} />
          <a className={styles['current-location']} ><span>{systemModule}</span></a>
        </li>
        {this.props.nodes.map(node => {
          return this.createNavLi(node)
        })}
      </ul>
    )
  }
}
