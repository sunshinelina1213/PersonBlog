import React, { PropTypes } from 'react'
import { Menu, Dropdown, Icon } from 'antd'
import classNames from 'classnames'
import styles from '../index.less'
import selfLess from './self.less'
import userPhoto from '../../../../../static/img/user.png';


export default class TopSelf extends React.Component {

  static PropTypes = {
    user: PropTypes.object,
    item: PropTypes.array
  }

  constructor() {
    super()
  }

  createDropMenuFor(item) {
    const menuitem = (item || []).map((it, index) => {
      return (
        <Menu.Item key={index}>
          <a href="javascript:;" onClick={e => {
            e.stopPropagation();
            if (it.click) it.click()
          }}>
          <Icon type={it.type} />&nbsp;{it.name}&nbsp;&nbsp;</a>
        </Menu.Item>
      )
    })
    return (
      <div className="self-user"> 
        <Menu>
          {menuitem}
        </Menu>
      </div>
    )
  }

  render() {
    const menu = this.createDropMenuFor(this.props.item || []);
    const user = this.props.user || {};
    return (
      <div className={styles['self']}>
        <Dropdown overlay={menu} trigger={['click']} >
          <a href="javascript:;">
             <img src={userPhoto} alt="" className={styles['user-photo']}/>
          </a>
        </Dropdown>
      </div>
    )
  }
}
