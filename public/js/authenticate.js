$('#dropbox_login').bind("click", function(e) {
	e.preventDefault();
	$.post('/authenticate', function(data) {
		if (data.err) {
			//if Error
			console.log(data);
			return;
		}
		window.location = data;
	})
});