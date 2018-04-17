import React from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as action from './action.js';
import { hashHistory,Link } from 'react-router'

import { Row, Col } from 'antd';
import styles from './index.less';
import { getCookie } from '../../util';
import * as _ from 'lodash';
class Guideindex extends React.Component{
    constructor(){
        super();
        this.state = {

        }
    }
    componentDidMount(){
        const currentUser = getCookie("currentUser");
        if(!_.isEmpty(currentUser)){
            this.props.getGuideMenu({userLogin:currentUser})
        }else{
            hashHistory.push("/login");
        }
    }
    getMenuData(){
        const { menudata } = this.props;
        // console.log('menudata',menudata)
        if(!_.isEmpty(menudata)){
            return (
                <ul className = {styles['index-ul']}>
                    {menudata.map((item,index)=>{
                        return (
                            <li key ={index}>
                                {item.parentkey ==='first' 
                                ? <div className ={styles['father-con']}><span>{item.name}</span></div> 
                                : <Link to={item.url}><div className ={styles['child-con']}><span>{item.name}</span></div>}</Link>
                                }
                            </li>
                        )
                    })}
                </ul>
            )
        }
    }
    render(){
        return(
           <div className = {styles['index-con']}>
               {this.getMenuData()}
           </div>
        )
    }
}

function mapStateToProps(state,ownProps){
    let guideindex = state.get('guide.index');
    console.log('guideindex=====',guideindex)
    return {
        menudata:guideindex.reps.menudata
    }
}
function mapDispatchToProps(dispatch){
    return {
        ...bindActionCreators(action,dispatch),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Guideindex)