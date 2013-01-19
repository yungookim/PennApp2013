window.TemplateStyle1 = Backbone.View.extend({

	el : $("#main"),

    initialize: function() {
	console.log("template1");
    },

    render: function(eventName) {
        console.log("asdfasdf");
    	var self = this;
    	self.template = window.Templates.TemplateStyle1;

    	if (self.template){
    		$(this.el).html(self.template);
    	} else {
    		window.loadTemplate('TemplateStyle1', function(temp){
    			self.template = window.Templates.TemplateStyle1 = temp;
    			$(self.el).html(self.template);
    		});
    	}
    }
});
