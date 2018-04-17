/**
 * @desc SOCKET监听与广播中间件
 * 
 * @param events {} 详细的定义请参见 ../constants/socket.event.config.js
 * 
 * @auth ln
 * @date 2017-06-28
 */
let _ = require('lodash');
function handleForOnEvent(next, socket, events) {
    if (_.isEmpty(events)) return;
    Object.keys(events).forEach(function (key) {
        let on = events[key].on;
        if (!on) return;
        Object.keys(on).forEach(function (k) {
            let name = [key, k].join('_').toUpperCase();
            //监听的事件等于模块名+事件名 module_on_name
            socket.on(name, function (data) {
                if (on[k]) next(on[k](data))
            })
        })
    })
}

function getEmitEvent(events) {
    let out = {}
    if (_.isEmpty(events)) return out;
    Object.keys(events).forEach(function (moduleName) {
        let emit = events[moduleName].emit;
        if (!emit) return;
        emit.forEach(function (emitEventName) {
            if (!emitEventName) return
            //广播的事件等于模块名+事件名 module_emit_name
            let name = [moduleName, emitEventName].join('_').toUpperCase();
            out[name] = name;
        });
    })
    return out;
}
function handleForEmitEvent(action, next, socket, events) {
    if (_.isEmpty(events)) return;
    Object.keys(events).forEach(function (key) {
        // 比较ACTION的TYPE,如果等于该模块下的广播事件,则发出SOCKET广播事件
        if (action.type === key) socket.emit(key, action)
    })
}

function createSocketMiddleware(socket, events) {
    let init = false, emitEvents = {};
    return store => next => action => {
        if (!init) {
            //处理监听事件
            handleForOnEvent(next, socket, events);
            //获取广播事件及事件函数
            emitEvents = getEmitEvent(events);
            init = true;
        }
        handleForEmitEvent(action, next, socket, emitEvents);
        return next(action);
    }
}

export default createSocketMiddleware
