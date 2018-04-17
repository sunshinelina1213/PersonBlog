
import React, { Component } from 'react'
import { renderToString } from 'react-dom/server'
import { createStore, applyMiddleware, compose } from "redux"
import { match, RouterContext } from 'react-router'
import { Provider } from 'react-redux'


import { combineReducers } from 'redux-immutable'
import routing from './reducers/routeReducer'
import thunkMiddleware from 'redux-thunk'
import rootReducer from './reducers'
import rootRoute from './routes'


var express = require('express');
var fs = require('fs');
var path = require('path');
var router = express.Router();


function renderFullPage(html, initialState) {
    return `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <meta name="renderer" content="webkit">
            <meta http-equiv="X-UA-Compatible" content="IE=Edge,chrome=1">
            <title><%= htmlWebpackPlugin.options.title %></title>
        
          
            <link href="/index.css" rel="stylesheet">
            <link rel="icon" href="./images/ico.png" type="image/x-icon">
            <script src="./js/BrowserType.js" charset="utf-8"></script>
        </head>
        <body>
        <div id="root">${html}</div>
        <script>
            window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}
        </script>
        bbbbb
        <% if (htmlWebpackPlugin.options.hasDlls) { %>
        <script src="./dlls/vendor.dll.js"></script>
        <% } %>
        </body>
        </html> 
    `
}

function auth(token, callback) {
    if (!token) {
        return callback(null)
    }
    fetch(actions.requestAPI + 'auth', {
        method: "POST",
        credentials: 'include',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: 'token=' + token
    }).then(function (res) {
        return res.json()
    }).then(function (res) {
        callback(res)
    })
        .catch(function (e) {
            console.error(e)
        });
}

function initStore() {
    const creducers = combineReducers({
        ...rootReducer
    });
    const store = createStore(
        creducers,
        applyMiddleware(thunkMiddleware)
    )
    return store
}

function handleRender(req, res, next) {
    const store = initStore();
    //auth(req.cookies[config.cookieName],function(res1){

    // if( res1 && res1.code == '1000' ){
    //     store.dispatch(actions.login("loginIn",res1.data))
    // } else {
    //     store.dispatch(actions.login("loginOut"))
    // }

    match({ routes: rootRoute, location: req.url }, (error, redirectLocation, renderProps) => {
        const url = req.url;
        if (url === '/favicon.ico') return res.status(200);
        if (error) {
            res.status(500).end('Internal Server Error');
        } else if (renderProps) {

            let ajaxData = renderProps.components
                .filter(x => x.ajaxData)
                .reduce((prev, current) => {
                    return current.ajaxData(renderProps).concat(prev)
                }, [])
                .map(x => {
                    return store.dispatch(x)
                })
            if (!ajaxData) res.status(404).end('Not found');
            Promise.all(ajaxData)
                .then(function (data) {
                    const html = renderToString(
                        <Provider store={store} >
                            <RouterContext {...renderProps} />
                        </Provider>
                    )
                    const initialState = store.getState();
                    console.log("....");
                    return res.render('index', { __html__: html, __state__: JSON.stringify(initialState) })

                })
                .catch(function (e) {
                    res.status(404).end(e.message);
                });
        } else {
            //res.status(404).end('Not found');
            res.redirect('/login');
        }
    })
    //})
}
router.all('*', function (req, res, next) {
    console.log("req url: ", req.originalUrl);
    handleRender(req, res, next)
})
module.exports = router