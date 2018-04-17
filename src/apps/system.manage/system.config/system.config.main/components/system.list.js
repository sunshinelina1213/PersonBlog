import React from 'react';
import { Card, Col, Row } from 'antd';
import {hashHistory, Link} from "react-router";
import styles from '../index.less';
class Systemlist extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
           
        }
    }
    render(){
        const { systemdata } = this.props;
        // console.log('systemdata',systemdata)
        return(
            <Row gutter={24}>
                {systemdata.map((item,index)=>{
                    return (
                        <Col span={4} key = {item.key}>
                            <Link to={item.url}>
                                <span>{item.title}</span>
                            </Link>
                        </Col>
                    )
                })}
            </Row>
        )
    }
}
export default Systemlist;