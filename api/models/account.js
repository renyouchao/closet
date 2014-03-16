/**
 * Created by renyouchao on 14-3-12.
 */
var mongoose = require('mongoose'),
    ClosetUser = require('./closetUser'),
    Schema = mongoose.Schema,
    bcrypt = require('bcryptjs'),
    SALT_WORK_FACTOR = 10,
    createdModifiedPlugin = require('mongoose-createdmodified').createdModifiedPlugin,
    Constants = require('../common/constants');

var accountSchema = new Schema({
    emailAcc: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true},
    phone: { type: String },
    forgetCode: { type: String },
    alipyAcc: { type: String },
    lastLoginDate: {type: Date},
    isBan: {type: Boolean, default: false}
});


accountSchema.plugin(createdModifiedPlugin);

accountSchema.index({ emailAcc: 1, password: 1, isBan: 1 });

accountSchema.pre('save', function (next) {
    var account = this;
    // only hash the password if it has been modified (or is new)
    if (!account.isModified('password'))
        return next();
    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
        bcrypt.hash(account.password, salt, function (err, hash) {
            if (err) return next(err);
            account.password = hash;
            next();
        });
    });
});
/**
 * 对比密码用bcrypt加密
 */
accountSchema.methods.comparePassword = function (candidatePassword, password, cb) {
    bcrypt.compare(candidatePassword, password, function (err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};


accountSchema.methods.logon = function (cb) {
    var that = this;

    this.model('account').findOne({emailAcc: this.emailAcc}, function (err, account) {
        if (err) {
            console.error(err);
            return cb(err);
        }
        if (account) {
            if (!account.isBan){
                bcrypt.compare(that.password, account.password, function(err, res) {
                    if (res){
                        //都正确
                        ClosetUser.findOne({account: account.id}, function (err, closetUser) {
                            if (err) {
                                console.error(err);
                                return cb(err);
                            }
                            return cb(null, Constants.loginStates.UP_CORRECT,account,closetUser);
                        });
                    }else{
                        //密码错误
                        return cb(null, Constants.loginStates.UP_INCORRECT);
                    }
                });
            }else
                return cb(null, Constants.loginStates.BAN_ACCOUNT);
        } else {
            //TODO redis重试了太多次，并且需要验证码
            return cb(null, Constants.loginStates.UP_INCORRECT)
        }
    });

};


accountSchema.methods.register = function (closetUser, callback) {
    this.save(function (err, acc) {
        if (err) {
            console.error(err);
            return callback(err);
        }
        ClosetUser.create({nickName: closetUser.nickName, account: acc}, function (err, closetUser) {
            if (err) {
                console.error(err);
                acc.remove(function (err, product) {
                    if (err) {
                        console.error(err);
                        return callback(err);
                    }
                });
            }
            return callback(null,acc,closetUser);
        });
    });

};

module.exports = mongoose.model('account', accountSchema);