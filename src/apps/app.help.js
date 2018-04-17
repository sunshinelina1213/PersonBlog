import { buildIdObj2 } from '../common/state.id'
import I from 'immuter'
import { isArray ,uniq, isEmpty} from 'lodash'

const formatTree = (ids = [], out = null, itree) => {
    if (!out) {
        out = { ...buildIdObj2(itree) }
        ids = Object.keys(out);
        out['ids'] = ids;
    }
    ids.map(iid => {
        let obj = out[iid];
        if (obj.children && obj.children.length > 0) {
            const children = buildIdObj2(obj.children);
            delete obj.children;
            const keys = Object.keys(children);
            keys.map(it => {
                obj[it] = it;
                const path = uniq([it].concat(obj.iid,obj.path||[]));
                out[it] = {...children[it],path : path} //加入了节点路径信息
            })
            obj['ids'] = keys;
            formatTree(keys, out);
        }
    })
    return out
}
export const createStateOfTree = (itree) => {
    return formatTree(null, null, itree);
}
export const getDefaultTopNavIid = (name, itree) => {
    let iid = 0;
    itree.ids.map(i => {
        if (itree[i].name === name) iid = i;
    })
    return iid;
}
/**
 * 
 * @param {object} topNode {iid:''} 
 * @param {object} itree {$key:$value}
 * 
 * @return {object} out {path: [],iid: '',name: ''}
 */
export const getSeledSiderNodeBy = (node, itree) => {
    const topNode = itree[node.iid];
    const ids = topNode.ids;
    if (ids && ids.length >= 1) {
        const firstId = ids[0]; //默认第一个子节点
        const secondNode = itree[firstId];
        const sids = secondNode.ids;
        if (sids && sids.length >= 1) {
            const thirdNode = itree[sids[0]];
            return {
                path: [thirdNode.iid, secondNode.iid, topNode.iid],
                iid: thirdNode.iid,
                name: thirdNode.name
            }
        } else {
            //左边栏菜单没有子菜单
            const out = {
                path: [firstId, topNode.iid],
                iid: firstId,
                name: secondNode.name
            };
            return out;
        }
    }
    return null;
}

export const formatTopNavNode = (tree, seledNode) => {
    return (tree.ids || []).map(id => {
        if (seledNode.iid === id) {
            return { ...tree[id], expand: true }
        } else {
            return { ...tree[id], expand: false }
        }
    })
}

//seledNode : {path: [],iid: '',name: ''},
export const formatSiderNavNode = (itree, path) => {
    let out = [];
    path = isArray(path) ? [...path] : [];
    if (path.length > 0) {
        (itree[path.pop()].ids || []).map(i => {
            const cnode = itree[i];
            if (cnode.ids) {
                cnode.children = (cnode.ids || []).map(ci => {
                    // let leafNode = itree[ci];
                    // if (path.some(x => (x == ci))) leafNode.expand = true;
                    // return leafNode
                    return itree[ci];
                });
                //if (path.some(x => (x == i))) cnode.expand = true;
                out.push(cnode);
            } else {
                out.push(cnode);
            }
        })
    }
    return out;
}

export const getDefaultSeled = (itree, seledSiderNode) => {
    if (!seledSiderNode) return { selKey: '', openKey: '' }
    const path = seledSiderNode.path || [];
    if (path && path.length >= 2) {
        const allOpenKey = itree[path[path.length - 1]].ids;
        let out = { selKey: path[0], allOpenKey: allOpenKey }
        if (path.length > 2) {
            out.openKey = path[1];
        } else out.openKey = path[0];
        return out;
    } else {
        return { selKey: '', openKey: '' }
    }
}

export const getNodeInfoByUrl = (itree,url) =>{
    let thizNode = null;
    if(!url) return thizNode;
    Object.keys(itree).forEach(i=>{
        const iurl = itree[i].url;
        if(iurl && iurl === url) thizNode=itree[i]
    });
    return thizNode
}

export const getSeledNodeByUrl = (itree,url) =>{
    const thizNode = getNodeInfoByUrl(itree, url);
    if (!thizNode) throw new Error('没有URL参数,程序忽略.')
    let [selectedTopNode, selectedSiderNode, tree] = [{}, {}, itree];
    //没有PATH的逻辑下为一级导航
    if (!thizNode.path) {
      selectedTopNode = { name: tree[thizNode.iid].name, iid: thizNode.iid };
    } else {//二级及以下导航
      const topNodeId = thizNode.path[thizNode.path.length - 1];
      selectedTopNode = { name: tree[topNodeId].name, iid: topNodeId };
      selectedSiderNode = thizNode;
    }
    return {
        selectedTopNode : selectedTopNode,
        selectedSiderNode : selectedSiderNode
    }
}

export const getCurrentSystemModule = (tree) =>{
    let systemModule = "";
    let currentUrl = window.location.href.match(/#(\S*?)\?/)[1];
    for (let key in tree) {
        if(currentUrl == tree[key].url){
            systemModule = tree[key].name;
            break;
        }
    }
    return systemModule ;
} 