"use strict";

$(function(){
	var templateArray = ['LandingView'];
	window.Templates = {};

	// Load all the templates!
	_.each(templateArray, function(name, index){
		console.log('Loading template: ' + name);
		$.get('templates/' + name + '.html', function(template) {
      window.Templates[name] = template;
  	}, 'text');
	});

	window.app = new AppRouter();
	Backbone.history.start();
})

var AppRouter = Backbone.Router.extend({

	routes : {
        "" : "landing"
	},

	$mainDiv : $("#main"),

	render : function(view){
		this.$mainDiv.html(view.render());
	},

	landing : function(){
		this.render(new LandingView());
	}
});
