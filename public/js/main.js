"use strict";

$(function(){
	window.Templates = {};

	window.app = new AppRouter();
	Backbone.history.start();
})

var AppRouter = Backbone.Router.extend({

	routes : {
    "" : "landing",
    "a" : "b",
    "template1" : "template"
	},
	
	landing : function(){
		var self = this;
		(new LandingView()).render();
	},

	b : function(){
		console.log("test");
	},

	template : function() {
		console.log("asdfasdf");
		var self = this;
		(new TemplateStyle1()).render();
	}
});


window.loadTemplate = function(name, next){
	$.get('templates/' + name + '.html', function(data) {
		next(data);
	}, 'text');
}