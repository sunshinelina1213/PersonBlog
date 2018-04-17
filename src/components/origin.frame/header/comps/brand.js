import React, { PropTypes } from 'react'
import styles from '../index.less'
import logo from '../../../../../static/img/blog-logo.jpg'

//顶部brand组件
export default class Originbrand extends React.Component {
    static PropTypes = {
        brandTle: PropTypes.string
    }
    constructor() {
        super()
    }
    render() {
        const { brandTle , systemTitle } = this.props;
        return (
            <div className={styles["brand"]}>
                <a href="javascript:;">
                    <img src={logo} alt=""  style={{'width':40,'height':40}}/>
                    <div className={styles["inline"]}>
                        <div className={styles["system-title"]}>{brandTle}</div>
                        <div>{systemTitle}</div>
                        <div></div>
                    </div>
                </a>
            </div>
        )
    }
}
