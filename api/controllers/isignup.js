var Account = require('../models/account.js'),
    ClosetUser = require('../models/closetUser.js'),
    SessionUtils = require('../utils/sessionUtils');
/*用户注册*/
exports.signupacc = function (req, res) {

    var account = new Account({
        emailAcc: req.body.emailAcc,
        password: req.body.password
    });

    account.register({nickName: req.body.nickName}, function (err, account, closetUser) {
        if (err) {
            return res.json({status:500, msg: '用户注册失败', data: err});
        }
        //写入cookie和session
        var appGlobal = {
            aid : account.id,
            cid : closetUser.id,
            nickName : closetUser.nickName,
            eacc : account.emailAcc
        };
        SessionUtils.setAppGlobal(req,res,appGlobal);

        res.send({status:200, msg: '用户注册成功', data: {
            id: account.account,
            closetUserId: closetUser.id,
            nickName: closetUser.nickName,
            emailAcc: account.emailAcc
        }});
    });
};

exports.signupcloset = function (req, res) {

    ClosetUser.findByIdAndUpdate(req.body.closetUserId, {
        nickName: req.body.nickName,
        sinaWeiBo: req.body.sinaWeiBo,
        closetDescribe : req.body.closetDescribe,
        location : req.body.location
    }, function (err, closetUser) {
        if (err) {
            console.error(err);
            return res.json({status:500,msg: '用户衣橱更新失败', data: err});
        }
        //写入cookie和session
        var appGlobal = {
            nickName : closetUser.nickName
        };
        SessionUtils.setAppGlobal(req,res,appGlobal);
        res.send({status:200, msg:'用户衣橱更新成功', data: {
            id: closetUser.id
        }});
    });

};

exports.signupsns = function (req, res) {

};