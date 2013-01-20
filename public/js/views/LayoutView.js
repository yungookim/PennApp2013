window.LayoutView = Backbone.View.extend({

	el : $("#main"),
	
	initialize: function() {
		console.log("template1");
	},

    render: function(eventName) {
    	var self = this;

    	var m = this.model.toJSON();
    	window.loadTemplate('LayoutView', function(temp){
            $('#templates').html(temp);
            $(self.el).html(temp);
            var tmp = $('#mainTemplate').html();
            $(self.el).html(Mustache.to_html(tmp, m));            
            self.loadMedia();
	
		$('.box').bind('click', function(e) {
			e.preventDefault();
			window.lastClicked = e.currentTarget;
		});

            $('.box').avgrund({
            height: 200,
            holderClass: 'custom',
            showClose: true,
            showCloseText: 'Close',
            enableStackAnimation: true,
            onBlurContainer: '.container',
            template: $('.box').bind('click', function() {
			
			//var src = window.lastClicked;
			//console.log("sdasd");
			//return "<p>test</p>";
		});

	    });
    	});
    },

    loadMedia : function(){
        var $container = $('#imageBox');

        $container.imagesLoaded(function() {
            $container.masonry({
                itemSelector: '.box'
            });
            _.each($(".box img"), function(each){
                var filePath = $(each).attr("src");
                var dot = filePath.lastIndexOf(".");
                var ext = filePath.substring(dot+1, filePath.length);
                var lastSlash = filePath.lastIndexOf('/')+1;
                var fileName = filePath.substring(lastSlash, dot);
                
                switch (ext) {
                    case 'png' || 'jpg' || 'jpeg' || 'bmp' :
                        //as is
                        break;
                    case 'mp3' || 'wmp' || 'ogg':
                        var template = $('#audio').html();
                        var data = {
                            song : fileName,
                            src : filePath,
                            type : 'audio/' + ext
                        };
                        $(each).parent().html(Mustache.to_html(template, data));
                        break;
                }
            });
        });
    }
});
