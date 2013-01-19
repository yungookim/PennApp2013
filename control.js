/** Control stuff **/


exports.index = function(req, res){
	res.render('index');
}

exports.allowed = function(req, res){
	console.log(req.query);
	res.send(req.query);
}
