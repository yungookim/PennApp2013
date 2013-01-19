window.TemplateStyle1 = Backbone.View.extend({

	el : $("#main"),

    initialize: function() {
	console.log("template1");
    },

    render: function(eventName) {
        console.log("TemplateStyle1");
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

$('#inner').ready(function() {
    renderTemplate();
});

function renderTemplate() {
    // This is a sample JSON object that will work with index.html if the files exist in their
    // correct locations.
    var data = {
            title: "ImageViewer",
            author: "JAMES CHOI",
            media: [
                {"img":true, "src":"img/japan.jpg"},
                {"img":true, "src":"img/mountain.jpg"},
                {"img":true, "src":"img/passport.jpg"},
                {"img":true, "src":"img/ski.jpg"},
                {"img":true, "src":"img/arrow_countries.jpeg"},
                {"img":true, "src":"img/boat.jpg"},
                {"img":true, "src":"img/china.jpg"},
                {"img":true, "src":"img/hk.jpg"},
                {"audio":true, "src":"media/gangnam_style.mp3", "type":"audio/mp3", "song":"Gangnam Style by PSY", "imgSrc":"img/gangnam_style_pic.jpg"},
                {"video":true, "src":"media/officially_missing_you.mp4", "type":"video/mp4", "name":"Officially Missing You, Too by Geeks"},
                {"text":true, "titleText":"Testing", "message":"There are many factors to consider when determining what to wear. First thing to consider is whether or not the pieces of clothing we have chosen match the overall look. For example, we choose a shirt, jeans, shoes, and maybe accessories like bracelet, hat, and watch. After choosing, we always want to ensure that what we have chosen matches the overall style as we do not want to wear mismatching clothing."},
            ],
            about: "Testing About:",
            aboutMsg: "SO FUCKING COLD IN HERE BIT**!!!!!",
        };

    var template = $('#inner').html();
    var html = Mustache.to_html(template, data);
    $('#inner').html(html);

    var $container = $('#container');   
    $container.imagesLoaded( function() {
    $container.masonry({
            itemSelector: '.img'
        });         
    });
}