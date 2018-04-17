import React from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { hashHistory,Link } from 'react-router'
// import * as action from './action.js';
// import styles from './index.less';

import { Row, Col } from 'antd';
import { getCookie } from '../../util';
import * as _ from 'lodash';
class Personblog extends React.Component{
    constructor(){
        super();
        this.state = {
            
        }
    }
    render(){
        return(
           <div>
               Personblog
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
        // ...bindActionCreators(action,dispatch),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Personblog)