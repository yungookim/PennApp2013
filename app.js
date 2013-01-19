var express = require('express')
  , app = express()
  , config = require('./config')
  , model = require("./model")
  , control = require("./control");

app.configure(function(){
 	app.use(express.static(__dirname + '/public'));	
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(app.router);
	app.use(express.logger());
	app.use(express.compress());
	app.use(function(err, req, res, next){
	  console.error(err.stack);
	  res.send(500, 'Something broke!');
	});
});

app.get('/', control.index);
app.get('/allowed', control.allowed);

//app.get('/model', model);

app.listen(config.port);
