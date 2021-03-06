"use strict";
$(function(){

	$('#modalNo').bind('click', function(){
		window.location = "http://simplyi.me";
	});

	$('.search-query').bind('keydown', function(e) {
		if(e.keyCode==13){
			var searchKey = $('.search-query').val();
			//from here we use search key to look for friends
			$.post('/findEmail', {email : searchKey}, function(ret){
				$('#myModalLabel').text(ret.display_name);
				console.log(ret);
				$('<div class="modal-body"><p>is using Simplyi Me as well</p><br/><a href="http://simplyi.me/#/layout/'+ret._id+'">Let\'s visit!</a></div>').replaceAll('.modal-body');
				$('#myModal').modal();
			});			
		} //else do nothing
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
