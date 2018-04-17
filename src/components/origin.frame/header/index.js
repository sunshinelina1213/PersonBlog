import React, { PropTypes } from 'react'
import { Menu, Dropdown, Icon, Button, Input, AutoComplete, Row, Col } from 'antd'
import cs from 'classnames'
import styles from './index.less'
import { Link, hashHistory } from "react-router";

import Brand from './comps/brand'
import History from './comps/history';
import TopSelf from './comps/self';
import TopNav from './comps/nav';   

import { getCookie } from '../../../util';
export default class Originheader extends React.Component {
    constructor() {
        super()
        this.state = {
            dataSource: [],
            first: '',
            second: '',
            third: '',
            keyword: '',
            searchMode: true,
            value: ''
        }
    }
    render() {
        const { doLogout } = this.props;
        const userInfo = JSON.parse(getCookie('currentUser'));

        const selfItem = [{
            name: '我的资料',
            type: 'user',
            click: null
        }, {
            name: '锁屏',
            type: 'lock',
            click: null
        }, {
            name: '退出',
            type: 'logout',
            click: () => {
                doLogout()
            }
        }];
        const user = { name: `${userInfo.LOGIN_NAME}` };
        const { dataSource } = this.state;
        const brandTle = "个人博客平台"; 
        const systemTitle = "分享";
        const { list, location, systemMenu, tree } = this.props;
        return (
            <div className={styles["topbar"]}>
                <div className={styles["body"]}>
                    <Brand brandTle={brandTle} systemTitle={systemTitle} />
                    <div className={styles['top-right']}>
                        <History location={location} list={list} />
                        <TopSelf user={user} item={selfItem} />
                    </div>
                    <TopNav nodes={systemMenu} tree={tree} />
                </div>
            </div>
        )
    }
}
