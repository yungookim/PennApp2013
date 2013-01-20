window.LandingView = Backbone.View.extend({

	el : $("#main"),

	events : {
		"click #dropbox_login" : "login"
	},

    initialize: function() {
    },

    render: function(eventName) {
    	var self = this;
    	self.template = window.Templates.LandingView;

    	if (self.template){
    		$(this.el).html(self.template);
    	} else {
    		window.loadTemplate('LandingView', function(temp){
    			self.template = window.Templates.LandingView = temp;
    			$(self.el).html(self.template);
    		});
    	}
    },

    login : function(){
        // Authenticate through webpy server at port 3000
    	window.location = "http://localhost:3000";
    }
});