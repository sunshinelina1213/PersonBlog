import React, { PropTypes } from 'react';
import styles from '../index.less';
import hless from './history.less';
import { Popover, Icon } from 'antd';
import history from '../../../../../static/img/history.png'
import { Link,hashHistory } from "react-router";
import cs from 'classnames';
import isEmpty from 'lodash/isEmpty';


//顶部history组件
// const arrHistory = [];
export default class History extends React.Component {
    constructor() {
        super();
        this.state = {
            
        };
        this.arrHistory =[];
    }
    getDate(){
        const date = new Date();
        const str1 = date.getFullYear()+"/"+(date.getMonth()+1)+"/"+date.getDate()+" ";
        const str2 = date.getHours()+":"+date.getMinutes()
        return (
            <div className= {styles["history-date"]}><span>{str1}</span><span>{str2}</span></div>
        )
    }
    getHistory(){
        const { location,list } = this.props;
        this.arrHistory.push(location.pathname);
        const arrHistoryUnique = [...new Set(this.arrHistory)];
        // if(arrHistoryUnique.length ==1){
        //     return (
        //         <div className ={cs('wu-jilu-cs',styles['wu-jilu'])}>暂无浏览记录</div>
        //     )
        // }
        if(arrHistoryUnique.length == 10){
            return (
                <div className ={cs('wu-jilu-cs',styles['wu-jilu'])}>暂无记录</div>
            )
        }
        if(arrHistoryUnique.length>0){
            return (
                <div >
                    <div   className = 'history-head'>
                        <span className = {cs('history-title-cs',styles['history-title'])}>浏览记录</span>
                        <span className = 'history-right' ><Icon type="calendar" /></span>
                    </div>
                    <div className = {styles['clear-both']} ></div>
                    <div>
                        {list.map((sublist,indexlist)=>{
                            return(
                                <ul key ={indexlist} className = {cs('history-ul-cs',styles['history-ul'])}>
                                    {arrHistoryUnique.map((item,index)=>{
                                        if(sublist.url == item){
                                            return (
                                                <Link key = {index} to={sublist.url}>
                                                    <li>
                                                        {/*<img src={sublist.img} alt=""/>*/}
                                                        <img height={90} width={100} src={'/api/visitation/history/getPhoto?url='+sublist.url} alt=""/>
                                                    </li>
                                                </Link>
                                            )
                                        }
                                    })}
                                </ul>
                            )
                        })}
                    </div>
                </div>
            )
        }
    }
    render() {
        return (
            <div className={cs('history-cs',styles["history"])}>
                 <Popover placement="bottom" content={this.getHistory()} trigger="click" className={cs('history-cs')}>
                    <img src={history} alt=""/>
                </Popover>
            </div>
        )
    }
}
