/** Model stuff**/

var mongodb = require('mongodb'),
    server  = new mongodb.Server("127.0.0.1", 27017, {'auto_reconnect': true}),     
    db      = new mongodb.Db('simplyime', server, {safe:true});

exports.getAll = function(req, res){

	db.open(function (error, client) {
		if (error) throw error;
		var collection = new mongodb.Collection(client, 'user');
		var query = {_id: new mongodb.ObjectID(req.query.id)};
		collection.findOne(query, function(err, ret){
			if (err){
				throw error;
				return;
			}
			db.close();
			res.send(ret);
		});
	});
}

exports.saveStalker = function(req, res){

	console.log(req.body);

	db.open(function(err, client){
		if (err){
			throw err;
		}
		var collection = new mongodb.Collection(client, 'stalker');
		collection.insert(req.body, function(err, doc){
			db.close();
			res.send();
		});
	});

}