window.LandingView = Backbone.View.extend({

		$mainDiv : $("#main"),

    initialize: function() {

    },

    render: function(eventName) {
    	var self = this;
    	self.template = window.Templates.LandingView;

    	if (self.template){
    		$mainDiv.html(self.template);
    	} else {
    		window.loadTemplate('LandingView', function(temp){
    			self.template = window.Templates.LandingView = temp;
    			self.$mainDiv.html(self.template);
    		});
    	}
    }
});