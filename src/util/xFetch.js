//import fetch from 'isomorphic-fetch'
import cookie from 'js-cookie'
import { parseParam, ctx } from './index'

const errorMessages = (res) => `${res.status} ${res.statusText}`;

function check401(res) {
  if (res.status === 401) {
    location.href = '/401';
  }
  return res;
}

function check404(res) {
  if (res.status === 404) {
    return Promise.reject(errorMessages(res));
  }
  return res;
}

function jsonParse(res) {
  return res.json().then(ret =>({ ...res, ret }));
}

function errorMessageParse(res) {
  const { success, message } = res.ret;
  if (!success) {
    return Promise.reject(res.ret);
  }
  return res.ret;
}

function xFetch(url, options) {
  const opts = { ...options, credentials: 'include' };
  opts.headers = {
    ...opts.headers
    //authorization: cookie.get('authorization') || ''  前后端接口访问约定,暂时取消,后面有时间加上 ln 
  };

  if (ctx) url = ctx + url;
  return fetch(url, opts)
    .then(check401)
    .then(check404)
    .then(jsonParse)
    .then(errorMessageParse);
}

export function Post(url, params = {}) {
  const query = parseParam(params);
  return xFetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: query
    //,mode : 'no-cors'
  });
}

export function Get(url, params) {
  const query = parseParam(params);
  return xFetch(`${url}?${query}`, { method: 'GET' });
}

export function PostJsonBody(url, params = '') {
  //const query = parseParam(params);
  return xFetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json;charset=UTF-8'
    },
    body: params
  });
}

export function GetStr(url, params) {
  const query = parseParam({ params : JSON.stringify(params) });
  return xFetch(`${url}?${query}`, { method: 'GET' });
}




export default xFetch;
