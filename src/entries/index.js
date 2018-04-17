import promise from 'es6-promise'
import 'antd/dist/antd.less'
import './index.less';
import ReactDOM from 'react-dom';
import React from 'react';
import RedBox from 'redbox-react';
import { Router, Route } from 'react-router';
import { syncHistoryWithStore, getBrowserHistory } from 'react-router-redux-fixed';
import NotFound from '../components/NotFound.jsx';
import Login from '../apps/login';

promise.polyfill();


require('fetch-ie8');
const Provider = require('react-redux').Provider;
const configureStore = require('../store/configureStore');
const store = configureStore();

//连接redux和router
const history = syncHistoryWithStore(getBrowserHistory(), store, {
  selectLocationState(state) {
    return state.get('routing');
  }
});

////render//
let render = () => {
  const routes = require('../routes');
  ReactDOM.render(
    <Provider store={store}>
      <Router history={history} >
        <Route path="/login" component={Login} />
        {routes}
        <Route path="*" component={NotFound} ></Route>
      </Router>
    </Provider>,
    document.getElementById('root')
  );
};

if (module.hot) {
  const renderNormally = render;
  const renderException = (error) => {
    ReactDOM.render(<RedBox error={error} />, document.getElementById('root'));
  };
  render = () => {
    try {
      renderNormally();
    } catch (error) {
      renderException(error);
      console.error('error', error);
    }
  };
  module.hot.accept('../routes', () => {
    render()
  });
}

render();
