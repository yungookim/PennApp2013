/** Control stuff **/
var mongodb = require('mongodb');

exports.index = function(req, res){
	console.log(req);
	res.render('index');
}

exports.authenticated = function(req, res){
//	res.send(req.query);
	res.redirect('simplyi.me:3030/#/layout/' + req.query.ObjectID);
}
