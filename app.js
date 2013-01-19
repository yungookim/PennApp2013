var express = require('express');
var app = express();
var scss = require("scss");

app.configure(function(){
 	app.use(express.static(__dirname + '/public'));	
	app.use(express.bodyParser());
	// app.use(express.methodOverride());
	app.use(app.router);
	app.use(express.logger());
	app.use(express.compress());
	app.use(function(err, req, res, next){
	  console.error(err.stack);
	  res.send(500, 'Something broke!');
	});
});


app.get('/', function(req, res){
  res.render('index');
});


app.listen(80);
