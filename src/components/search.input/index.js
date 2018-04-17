import React,{PropTypes} from 'react';
import { Input, Icon } from 'antd';
import style from './index.less';

export default class SearchInput extends React.Component {
    static PropTypes = {
        doChange : PropTypes.func,
        doSearch : PropTypes.func
    };

    handleChange(key,value){
        this.props.doChange(key,value);
    }

    searchBtnClick(){
        this.props.doSearch();
    }

    render() {
        return (
            <div className={style.search_content}>
                <Input className={style.search_input} size={this.props.size} placeholder={this.props.placeholder}
                       onChange={e => {
                           this.handleChange(this.props.content, e.target.value);
                           e.stopPropagation();
                       }}/>
                <span className={style.i_search} onClick={()=>{this.searchBtnClick()}}>
                    <Icon type="search"/>
                </span>
            </div>
        )
    }
}
