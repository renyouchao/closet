/**
 * Created by renyouchao on 14-3-12.
 */
var mongoose = require('mongoose'),
        Schema = mongoose.Schema,
        bcrypt = require('bcrypt'),
        SALT_WORK_FACTOR = 10,
        createdModifiedPlugin = require('mongoose-createdmodified').createdModifiedPlugin;

var UserSchema = new Schema({
        username: { type: String, required: true, index: { unique: true } },
        password: { type: String, required: true },
        loginAttempts: { type: Number, required: true, default: 0 }
});

UserSchema.plugin(createdModifiedPlugin);

UserSchema.index({ username: 1, password: 1 });

UserSchema.statics.failedLogin = {
        NOT_FOUND: 0,
        PASSWORD_INCORRECT: 1,
        MAX_ATTEMPTS: 2
};

UserSchema.pre('save', function (next) {
        var user = this;

        // only hash the password if it has been modified (or is new)
        if (!user.isModified('password')) return next();

        // generate a salt
        bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
                if (err) return next(err);
                // hash the password along with our new salt
                bcrypt.hash(user.password, salt, function (err, hash) {
                        if (err) return next(err);
                        // override the cleartext password with the hashed one
                        user.password = hash;
                        next();
                });
        });
});
/**
 * 对比密码用bcrypt加密
 */
UserSchema.methods.comparePassword = function (candidatePassword, cb) {
        bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
                if (err) return cb(err);
                cb(null, isMatch);
        });
};

module.exports = mongoose.model('User', UserSchema);