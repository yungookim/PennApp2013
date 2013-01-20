window.UserModel = Backbone.Model.extend({
	defaults: {
		display_name : "",
		uid : 0,
		email : ""
	},

	initialize : function(){
	},
	
	fetch : function(id, next){
		var self = this;
		$.get('/model/getAll', { id : id }, function(ret){
			self.set('id' , id);
			self.set('country', ret.country);
			self.set('display_name', ret.display_name);
			self.set('email', ret.email);
			self.set('files', ret.files);
			self.set('quota_info', ret.quota_info);
			self.set('uid', ret.uid);
			
			next(ret);	
		});	
	},

	getStalkers : function(id, next){
		$.post('/getStalkers', { id : id }, function(ret){
			next(ret);
		});
	}

});
