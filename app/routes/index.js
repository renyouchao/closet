/*
 * GET home page.
 */
var account = require('../../app/models/account.js');
exports.index = function (req, res) {
//        var account = new Account({name:'renyouchao'}).save(function (err){
//                if (err) return next(err);
//                res.render('index', { title: 'Express' });
//        });

        account.create({ name: 'inserting ' + Date.now() }, function (err, doc) {
                if (err) return next(err);
                res.send(doc);
        })
};