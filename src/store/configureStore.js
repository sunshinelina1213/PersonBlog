import { createStore, applyMiddleware, compose } from 'redux'
import { Map } from 'immutable';
import { combineReducers } from 'redux-immutable';
import routing from '../reducers/routeReducer';
import { routerMiddleware,getBrowserHistory } from 'react-router-redux-fixed';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import promiseMiddleware from './middlewares/promiseMiddleware';
import createSocketMiddleware from './middlewares/socket.io.middleware';
import rootReducer from '../reducers';
import {SOCKET_EVENTS} from '../constants/socket.event.config';
import io from 'socket.io-client';
import {ctx} from '../util';

let initState = window.__INITIAL_STATE__?Map(window.__INITIAL_STATE__):Map();

export default function configureStore(initialState = initState) {
  const middleware = [
    thunkMiddleware,
    routerMiddleware(getBrowserHistory()),
    promiseMiddleware({ promiseTypeSuffixes: ['PENDING', 'SUCCESS', 'ERROR'] }), //自定义中间件异步请求的三种状态  ps:ln
    createSocketMiddleware(io(ctx, { path: '/api/socket' }),SOCKET_EVENTS),
    process.env.NODE_ENV === 'development' && createLogger()
  ].filter(Boolean);
  const enhancer = compose(
    applyMiddleware(...middleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  );
  const creducers = combineReducers({
    ...rootReducer, routing,
  });
  const store = createStore(creducers, initialState, enhancer);

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const reducers = require('../reducers');
      console.log('重载主Reducers:',reducers);
      //unmountComponentAtNode(rootElement); 貌似可以解决reducer和action热替换的问题
      const nextReducers = combineReducers({...reducers, routing});
      store.replaceReducer(nextReducers);
    });
  }

  return store
}
