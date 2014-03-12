/**
 * Created by renyouchao on 14-3-12.
 */

var mongoose = require('mongoose');
mongoose.connect('mongodb://biz-db/zeus?poolSize=4');
exports.mongoose = mongoose;