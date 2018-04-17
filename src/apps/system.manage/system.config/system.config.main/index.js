import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as action from './action';
import {Input, Icon } from 'antd';
import styles from './index.less';
import {hashHistory, Link} from "react-router";

import Systemlist from './components/system.list';

class Systemconfig extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }
    componentDidMount(){
        this.props.getSystemInfo();
    }
    render() {
        return (
            <div className = {styles['system']}>
                <div className = {styles['system-box']}>
                    <Systemlist systemdata={this.props.systemdata.systemData}/>
                    <div>
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state,ownProps){
    const System = state.get('system.manage').get('system.config').get('system.config.main');
    // console.log('System.reps',System.reps)
    return {
        isLoading:System.isLoading,
        systemdata:System.reps,
        originState:System.originState
    }
}
function mapDispatchToProps(dispatch){
    return {
        ...bindActionCreators(action,dispatch),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Systemconfig)
