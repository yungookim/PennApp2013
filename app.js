"use strict";

var path = require('path')
  , fs = require('fs')
  , express = require('express')
  , app = express()
  , config = require('./config')
  , model = require("./model")
  , control = require("./control")
  , sass = require("node-sass");

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
	app.use(function(req, res, next){
		if (path.extname(req.path) === '.css'){
			if (fs.existsSync(req.path)){
				next(req, res);
				return;
			} else {
				var scssPath = __dirname + '/public' 
											+ path.dirname(req.path) 
											+ '/' +  path.basename(req.path, '.css') 
											+ '.scss';
				var scss = fs.readFileSync(scssPath, 'utf8');
				var css = sass.render(scss, function(err, css){
					if (err){
						res.send({ error : err });
						return;
					}
					res.setHeader('Content-Type', 'text/css');
					res.send(css);
					return;
				});
			}
		}
	});
});

app.get('/authenticated', control.authenticated);
app.get('/model/getAll', model.getAll);
app.post('/stalk', model.saveStalker);

app.listen(config.port);
