/** Control stuff **/
var mongodb = require('mongodb');

exports.index = function(req, res){
	console.log(req);
	res.render('index');
}

exports.authenticated = function(req, res){
	res.redirect('/#/init/' + req.query.ObjectID);
}
