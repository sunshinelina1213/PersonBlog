/**
 * immuter版 state.id
 * 
 * @auth ln
 * @date 2017-07-06
 */
import I from 'immuter'
import * as _ from 'lodash'

/**
 * 根据ID获取实体数据
 * @param {map} ids 
 * @param {array|string} paramId 
 * 
 * @return {map|array} 一个实体对象或者一个实体集合
 */
export const byId = (ids,paramId) =>{
  ids = ids||{};
  if(_.isString(paramId)) return ids[paramId];
  if(_.isArray(paramId)){
    let out = [];
    paramId.forEach(function(k) { out.push(ids[k])});
    return out
  }
  return null
}

const addIIdFor = (obj) =>{
    if(!obj) return {}
    return I.set(obj,'iid',_.uniqueId());  //每个对象都有一个iid属性,以标识唯一性
}
const  createMapOfId = (obj) =>{
  let out = {};
  if(_.isArray(obj)){
    obj.forEach(function(i){
      let m = addIIdFor(i);
      if(!_.isEmpty(m)) out[m['iid']]=m;
    })
  }
  if(_.isMap(obj)){
    let m =  addIIdFor(obj)
    if(!_.isEmpty(m)) out[m['iid']]=m;
  }
  return out;
}
export const updateBy = (state={},item,itemName) =>{
    if(!state['ids']) state = I.set(state,'ids',{})  //state中如果没存在ids,则默认添加此属性
    let im = createMapOfId(item);
    if(! _.isEmpty(im)){
        return I.set(state,{
            [itemName] : Object.keys(im),
            ids : I.set(state.ids,im)
        })
    }
    return state;
}

/**
 * 生成一个可操作的id对象
    state =>  [{
      name : 'tom',
      age : 12
    },{
      name : 'jony',
      age : 11
    }]

    out =>  {
      byId : {
        id1 : {
          name : 'tom',
          age : 12
        },
        id2 : {
          name : 'jony',
          age : 11
        }
      },
      ids:[id1,id2]
    }
 */
export const buildIdObj = (state = {}) => {
  let im = createMapOfId(state);
  if (!_.isEmpty(im)) {
      return {
          ids: Object.keys(im),
          byId: im
      }
  }
  return state;

}
/**
* 
* @return {*} out =
* {
  "1": {
      "name": "首页",
      "url": "/home",
      "iid": "1"
  },
  "2": {
      "4": "4",
      "5": "5",
      "name": "通查通搜",
      "iid": "2",
      "ids": ["4", "5"]
  },
  "4": {
      "name": "人员线索",
      "url": "/record",
      "iid": "4"
  },
  "5": {
      "6": "6",
      "7": "7",
      "name": "档案",
      "iid": "5",
      "ids": ["6", "7"]
  },
 }
*/
export const buildIdObj2 = (state = {}) => {
  let im = createMapOfId(state);
  if (!_.isEmpty(im)) {
      return im;
  }
  return state;
}
