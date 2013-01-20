$(function (){
	//plus sign
	$('.plus_sign').wrap('<div class="wraphics" />');
	$('.plus_sign').append('<div></div><div></div></div></div>');
	$('.plus_sign').width($('.plus_sign').data('size'));
	$('.plus_sign').height($('.plus_sign').data('size'));
	//eqaul sign
	$('.equal_sign').wrap('<div class="wraphics" />');
	$('.equal_sign').append('<div></div><div></div></div></div>');
	$('.equal_sign').width($('.equal_sign').data('size'));
	$('.equal_sign').height($('.equal_sign').data('size'));
});