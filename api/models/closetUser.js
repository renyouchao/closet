/**
 * Created by renyouchao on 14-3-15.
 */
var mongoose = require('mongoose'),
    account = require('./account')
    Schema = mongoose.Schema,
    createdModifiedPlugin = require('mongoose-createdmodified').createdModifiedPlugin;

var closetUserSchema = new Schema({

    nickName: { type: String, required: true },
    sinaWeiBo: { type: String },
    account : { type : Schema.ObjectId, required: true, ref : 'account'},
    closetDescribe: { type: String },
    location: { province: String , city: String},
    followersNum: {type : Number, default: 0},
    followingNum: {type : Number, default: 0},
    ListingsNum: {type : Number, default: 0}
});


closetUserSchema.plugin(createdModifiedPlugin);

closetUserSchema.index({nickName: 1});

module.exports = mongoose.model('closetUser', closetUserSchema);
