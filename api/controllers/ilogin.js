/**
 * Created by renyouchao on 14-3-16.
 */
var Account = require('../models/account.js'),
    Constants = require('../common/constants'),
    SessionUtils = require('../utils/sessionUtils');

exports.logon = function (req, res) {
    var account = new Account({
        emailAcc: req.body.emailAcc,
        password: req.body.password
    });
    account.logon(function(err,result,account,closetUser){

        if(err)
            return res.json({status:500, msg: '用户登录错误', data: err});
        else if (result == Constants.loginStates.UP_CORRECT){
            var appGlobal = {
                aid : account.id,
                cid : closetUser.id,
                nickName : closetUser.nickName,
                eacc : account.emailAcc
            }
            SessionUtils.setAppGlobal(req,res,appGlobal);
            return res.json({status:200, msg: '用户登录成功', data: Constants.loginStates.UP_CORRECT});
        }else if (result == Constants.loginStates.UP_INCORRECT){
            return res.json({status:200, msg: '用户名密码不正确', data: Constants.loginStates.UP_INCORRECT});
        }else if (result == Constants.loginStates.BAN_ACCOUNT){
            return res.json({status:200, msg: '安全原因,账号被禁用', data: Constants.loginStates.BAN_ACCOUNT});
        }
    })
};


exports.entenlogon = function (req, res) {
    res.render('logon');
};