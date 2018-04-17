const User = require("../system.manage/rights.manager/user.manager/user.manager.model.js");

const q = require("q");
const log4js = require('log4js');
const log = log4js.getLogger("login.controller.js");

/*判断登录*/
exports.doLogin = function(req, res) {
  var params = req.query;
  // console.log('params============',params)

  var promise = getUserOfPromise(params.username, params.password);

  promise.then(function(user) {
    if(user && user.LOGIN_NAME && user.LOGIN_PASSWORD.length > 0){
      return res.status(200).json({success : true, data : user});
    }else{
        return res.status(200).json({success : false});
    }
  }, function(err) {
    return res.status(500).json({ success: false, err: err });
  });
};



/*查询用户*/
function getUserOfPromise(name, password) {
  var deffered = q.defer();
  var cond = { LOGIN_NAME: name };
  if (password && password.length > 0) {
    cond['LOGIN_PASSWORD'] = password;
  }
  User.findOne(cond, function(err, user) {
    return deffered.resolve(user);
  });
  return deffered.promise;
};
