

$(function(){
	window.Templates = {};

	window.app = new AppRouter;
	Backbone.history.start();
})

var AppRouter = Backbone.Router.extend({

	routes : {
        "" : "landing",
        "template1" : "template",
        "sandbox" : "sandbox",
        "*actions": 'defaultAction'
	},

	landing : function(){
		console.log("asdf");
		(new LandingView()).render();
	},

	template : function() {
		var self = this;
		(new TemplateStyle1()).render();
	},

	sandbox : function() {
		var self = this;
		(new SandBox()).render();
	},

	defaultAction : function(){
		console.log("asdfa");
	}
});


window.loadTemplate = function(name, next){
	$.get('templates/' + name + '.html', function(data) {
		next(data);
	}, 'text');
}