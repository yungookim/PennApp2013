/** Control stuff **/
var mongodb = require('mongodb');

exports.index = function(req, res){
	res.render('index');
}

exports.authenticated = function(req, res){
	res.send(req.query);
}
