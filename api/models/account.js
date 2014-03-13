/**
 * Created by renyouchao on 14-3-12.
 */
var mongoose = require('mongoose'),
        Schema = mongoose.Schema,
        bcrypt = require('bcryptjs');
        SALT_WORK_FACTOR = 10,
        createdModifiedPlugin = require('mongoose-createdmodified').createdModifiedPlugin;

var accountSchema = new Schema({
        userName: { type: String, required: true, index: { unique: true } },
        emailAcc: { type: String, required: true, index: { unique: true } },
        password: { type: String, required: true },
        phone : { type: String },
        forgetCode : { type: String },
        alipyAcc : { type: String },
        loginAttempts: { type: Number, required: true, default: 0 },
        isBan : {type: Boolean, required: true, default: false}
});

accountSchema.plugin(createdModifiedPlugin);

accountSchema.index({ username: 1, password: 1 });

accountSchema.statics.failedLogin = {
        NOT_FOUND: 0,
        PASSWORD_INCORRECT: 1,
        MAX_ATTEMPTS: 2
};

accountSchema.pre('save', function (next) {
        var account = this;

        // only hash the password if it has been modified (or is new)
        if (!account.isModified('password')) return next();


        bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
                bcrypt.hash(account.password, salt, function (err, hash) {
                        if (err) return next(err);
                        // override the cleartext password with the hashed one
                        account.password = hash;
                        next();
                });
        });
});
/**
 * 对比密码用bcrypt加密
 */
accountSchema.methods.comparePassword = function (candidatePassword, cb) {
        bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
                if (err) return cb(err);
                cb(null, isMatch);
        });
};

module.exports = mongoose.model('account', accountSchema);