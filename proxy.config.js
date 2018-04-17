// Learn more on how to config.
// - https://github.com/dora-js/dora-plugin-proxy#规则定义

const ip = 'localhost';
module.exports = {

  'GET /api/*': 'http://'+ip+':8001/',
  'POST /api/*': 'http://'+ip+':8001/'
};
