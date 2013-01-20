"use strict";
$(function(){

	$('#modalNo').bind('click', function(){
		window.location = "http://simplyi.me";
	});

	window.Templates = {};
	window.userModel;
	window.app = new AppRouter;
	Backbone.history.start();
})

var AppRouter = Backbone.Router.extend({

	routes : {
        "" : "landing",
	"init/:id" : "init",
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

	init : function(id){
		localStorage.setItem("identifiyer", id);
		this.layout(id);
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