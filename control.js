/** Control stuff **/
var mongodb = require('mongodb');

exports.index = function(req, res){
	console.log(req);
	res.render('index');
}

exports.authenticated = function(req, res){
//	res.send(req.query);
	res.redirect('/#/layout/' + req.query.ObjectID);
}
