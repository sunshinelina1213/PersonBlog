import React from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { hashHistory,Link } from 'react-router'
import * as action from './action.js';
import styles from './index.less';

import { Row, Col } from 'antd';
import * as _ from 'lodash';



class Tubiaoindex extends React.Component{
    constructor(){
        super();
        this.state = {
            
        }
    }
    componentDidMount(){
        this.props.getTbIndex()
    }
    render(){
        return(
           <div className ={styles['main-body']}>
               <Row className={styles['tubiao-header']}>
                   <Col span={12}>col-12</Col>
                   <Col span={12}>col-12</Col>
               </Row>
           </div>
        )
    }
}

function mapStateToProps(state,ownProps){
    return {
       
    }
}
function mapDispatchToProps(dispatch){
    return {
        ...bindActionCreators(action,dispatch)
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Tubiaoindex)