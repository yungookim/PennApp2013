"use strict";

$(function(){
	window.Templates = {};

	window.app = new AppRouter();
	Backbone.history.start();
	
})

var AppRouter = Backbone.Router.extend({

	routes : {
        "" : "landing"
	},

	el : $("#main"),

	landing : function(){
		var self = this;
		(new LandingView()).render();
	}
});


window.loadTemplate = function(name, next){
	$.get('templates/' + name + '.html', function(data) {
		next(data);
	}, 'text');
}