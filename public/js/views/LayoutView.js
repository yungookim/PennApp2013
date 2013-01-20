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
            self.getStalkers();
            $(".masonry-brick").click(function(e) {
                console.log(this);
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
    }, 

    getStalkers : function(){
	this.model.getStalkers(localStorage.getItem('identifiyer'), 
       		function(ret){
			var html = Mustache.to_html($("#stalkers").html(), {data:ret});
			$('#footer').append(html);

			_.each($(".time"), function(each){
				var unixTime = $(each).html();
				var date = new Date(unixTime*1000);
				$(each).html(date);
			});
        	 });	
	}
});
