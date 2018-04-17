import React, { PropTypes } from 'react';
import { Router, Route, IndexRoute, Link, IndexRedirect ,hashHistory} from 'react-router';
import loader from '../common/loader.jsx';
import App from '../apps/index';

// import MyPage from '../apps/my.page';
import less from '../entries/index.less';

import NotFound from '../components/NotFound';
import Login from '../apps/login';

import { getCookie } from '../util';
import { message } from 'antd';


function validate(nextState,replaceState) {
  // 在路由群载入时做 filter 处理
  //console.log("--->route change validate...");
}

const appPaths = {};
const context = require.context('../apps/', true, /\.\/.+(index)\.js$/);
context.keys().forEach((item) => {
  const parts = item.split('/'); //parts len:3
  parts.forEach((part, index) => {
    if (part !== '.') {
      let cps = appPaths;//当前路径对象
      const cpath = ['.'];
      for (let i = 1; i < index; i++) {
        const pi = parts[i];
        cpath.push(pi);
        if (!cps[pi]) cps[pi] = {};
        cps = cps[pi];
      }
      if (index == parts.length - 1) {
        cps._index = cpath.join('/');
      }
    }
  })
});

const ghost = (props) => (props.children);

/**
 * 动态生成路由树的方法
 * @param  {[type]} pathObj [description]
 * @return {[type]}         [description]
 */
const generateRoutes = (pathObj) => {  
  const result = [];
  const objKeys = Object.keys(pathObj);
  objKeys.forEach((path, index) => {
    if (path == '_index') return;
    const subPathObj = pathObj[path];
    const compPath = subPathObj['_index'];

    if (Object.keys(subPathObj).some((item) => item == '_index')) {
      const Loader = compPath ? (
        __PRODUCTION__
          ? loader(require.context('bundle?lazy!babel?presets=react!../apps/', true, /^\.\/.+(index)\.js$/)(`${compPath}/index.js`))
          : require.context('../apps/')(`${compPath}/index.js`)
      ) : NotFound;
      result.push(<Route key={path} path={path} component={Loader} ></Route>);
    } else {
      const children = generateRoutes(subPathObj);
      const Loader = compPath ? (
        __PRODUCTION__
          ? loader(require.context('bundle?lazy!babel?presets=react!../apps/', true, /^\.\/.+(index)\.js$/)(`${compPath}/index.js`))
          : require.context('../apps/')(`${compPath}/index.js`)
      ) : ghost;
      result.push(<Route key={path} path={path} component={Loader}>{children}</Route>);
    }
  })
  return result;
}


const onChang = (prevState, nextState , replaceState) => {
  if (nextState.location.action !== 'POP') {
    window.scrollTo(0, 0);
  }
}


export default (

  <Router history={history}>
      {<Route path="/" component={Login}></Route>}
      <Route path="/login" component={Login}></Route>
      <Route path="/apps" component={App} onEnter={validate} onChange={onChang}>
          {generateRoutes(appPaths)}
      </Route>
      <Route path="*" component={NotFound}/>
  </Router>

)



