/** Model stuff**/

var mongodb = require('mongodb');
var server = new mongodb.Server("127.0.0.1", 27017, {});
var db = 'simplyime';

exports.getAll = function(req, res){

	new mongodb.Db(db, server, {}).open(function (error, client) {
		if (error) throw error;
		var collection = new mongodb.Collection(client, 'user');
		var query = {_id: new mongodb.ObjectID(req.query.id)};
		collection.findOne(query, function(err, ret){
			console.log("err " + err);
			console.log("ret " + ret);
		});
	});
}
