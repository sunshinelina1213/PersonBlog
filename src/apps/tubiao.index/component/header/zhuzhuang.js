import React from 'react';
import { Row, Col, Icon, Card } from 'antd';
import styles from '../../index.less';
import * as _ from 'lodash';

import echarts from 'echarts';
import ReactEcharts from "echarts-for-react";

class Zhuzhuang extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }
    
    render(){
        return(
            <div>
                <Card>
                    <p>Card content</p>
                    <p>Card content</p>
                    <p>Card content</p>
                </Card>
            </div>
        )
    }
}
export default Zhuzhuang;