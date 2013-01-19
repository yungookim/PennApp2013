"use strict";

$(function(){
	window.Templates = {};

	window.app = new AppRouter();
	Backbone.history.start();
	
})

var AppRouter = Backbone.Router.extend({

	routes : {
        "" : "landing",
        "template1" : "template",
        "sandbox" : "sandbox"
	},

	el : $("#main"),

	landing : function(){
		var self = this;
		(new LandingView()).render();
	},

	template : function() {
		var self = this;
		(new TemplateStyle1()).render();
	},

	sandbox : function() {
		var self = this;
		(new SandBox()).render();
	}
});


window.loadTemplate = function(name, next){
	$.get('templates/' + name + '.html', function(data) {
		next(data);
	}, 'text');
}