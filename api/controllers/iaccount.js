
var Account = require('../models/account.js');
/*用户注册*/
exports.signup = function (req, res) {
        var account = new Account({
                userName: res.body.userName,
                emailAcc: res.body.emailAcc,
                password: res.body.password
        });
        account.save(function(err, acc){
                if(err) console.error(err);
                res.send({
                        msg : '用户信息注册成功',
                        data: {id:acc.id,userName:acc.userName,emailAcc : acc.emailAcc}
                });
        });

};