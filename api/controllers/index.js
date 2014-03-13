/*
 * GET home page.
 */
//var User = require('../models/user.js');
exports.index = function (req, res) {
//        var account = new Account({name:'renyouchao'}).save(function (err){
//
        res.render('index', { title: 'Express' });

//        var user = {
//                "username" : "gccjava",
//                "password" : "rycfox84"
//        };
//
//        User.create(user, function (err, doc) {
//                if (err) {
//                        console.error(err);
////                        throw err;
////                       // return next(err);
//                }
//                res.send(doc);
//        });
};