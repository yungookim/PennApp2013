window.UserModel = Backbone.Model.extend({
	defaults: {
		display_name : "",
		uid : 0,
		email : ""
	},

	initialize : function(){
	},
	
	fetch : function(id, next){
		console.log(id);
		$.get('/model/getAll', { id : id }, function(ret){
			console.log(ret);
			next(ret);	
		});	
	}
});
