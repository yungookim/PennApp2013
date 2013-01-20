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
				throw err;
				return;
			}
			db.close();
			res.send(ret);
		});
	});
}

exports.findEmail = function(req, res){
	db.open(function(err, client){
		if (err) throw err;

		var collection = new mongodb.Collection(client, 'user');
		var query = {email : req.body.email};
		collection.findOne(query, function(err, ret){
			if (err) throw err;
			
			db.close();
			res.send(ret);
		});

	});

}

exports.saveStalker = function(req, res){

	db.open(function(err, client){
		if (err){
			throw err;
		}
		var collection = new mongodb.Collection(client, 'stalker');
		var date = new Date();
		var ts = String(Math.round(date.getTime() / 1000) + date.getTimezoneOffset() * 60);
		req.body.time = ts;
		collection.insert(req.body, function(err, doc){
			db.close();
			res.send();
		});
	});

}

exports.getStalkers = function(req, res){
	db.open(function(err, client){
		if (err){
			throw err;
		}
		var collection = new mongodb.Collection(client, 'stalker');
		collection.find({ stalkingPage : '#/layout/' + req.body.id}, {limit:30}).toArray(function(err, ret){
			db.close();
			res.send(ret);
		});
	});
}
