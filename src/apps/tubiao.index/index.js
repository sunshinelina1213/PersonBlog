import React from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { hashHistory,Link } from 'react-router'
import * as action from './action.js';
import styles from './index.less';

import { Row, Col } from 'antd';
import * as _ from 'lodash';
import Header from './component/header.js'; 

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
               <Header {...this.props}/>
           </div>
        )
    }
}

function mapStateToProps(state,ownProps){
    let tubiao = state.get('tubiao.index');
    return {
       ...tubiao
    }
}
function mapDispatchToProps(dispatch){
    return {
        ...bindActionCreators(action,dispatch)
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Tubiaoindex)