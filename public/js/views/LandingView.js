window.LandingView = Backbone.View.extend({

    initialize: function() {
    	this.template = $("#foo").html();
    },

    render: function(eventName) {
    	return this.template;   
    }
});