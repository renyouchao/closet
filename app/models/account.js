/**
 * Created by renyouchao on 14-3-12.
 */
var mongoose = require('../../config/mongoose').mongoose;
var mySchema = mongoose.Schema(
        { name: String }
);
module.exports = mongoose.model('MyModel', mySchema);