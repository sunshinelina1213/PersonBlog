import React from 'react';
import { Row, Col, Icon } from 'antd';
import styles from '../index.less';
import * as _ from 'lodash';

import Zhexian from './header/zhexian.js';
import Zhuzhuang from './header/Zhuzhuang.js';


class Header extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }
    
    render(){
        return(
            <div>
                <Row className={styles['tubiao-header']}>
                    <Col span={11} style={{marginRight:20}}>
                        <Zhexian {...this.props}/>
                    </Col>
                    <Col span={12}>
                        <Zhuzhuang {...this.props}/>
                    </Col>
                </Row>
            </div>
        )
    }
}
export default Header;