"use strict";
$(function(){

	FB.getLoginStatus(function(response) {
		if (response.status === 'connected') {
		  // the user is logged in and has authenticated your
		  // app, and response.authResponse supplies
		  // the user's ID, a valid access token, a signed
		  // request, and the time the access token 
		  // and signed request each expire
		  var uid = response.authResponse.userID;
		  var accessToken = response.authResponse.accessToken;
		  console.log(uid + " " + accessToken);

		} else {
		  // the user isn't logged in to Facebook.

		  alert('not logged in');

		}
	});


	window.Templates = {};
	window.userModel;
	window.app = new AppRouter;
	Backbone.history.start();
})

var AppRouter = Backbone.Router.extend({

	routes : {
        "" : "landing",
        "layout/:id" : "layout",
        "sandbox" : "sandbox",
        "*actions": 'defaultAction'
	},

	landing : function(){
		(new LandingView()).render();
	},

	layout : function(id) {
		var self = this;
		if (!window.userModel){
			window.userModel = new UserModel();
			window.userModel.fetch(id, function(){
				(new LayoutView({model : window.userModel})).render();
			});
		}
	},

	sandbox : function() {
		var self = this;
		(new SandBox()).render();
	},

	defaultAction : function(){
	}
});


window.loadTemplate = function(name, next){
	$.get('templates/' + name + '.html', function(data) {
		next(data);
	}, 'text');
}

