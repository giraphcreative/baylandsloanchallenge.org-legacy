

$(function(){

	$('.header h1').fitText( 1.3, { minFontSize: 40 } );
	$('.header h2').fitText( 4.2, { minFontSize: 20 } );


	$('.more-info h3').fitText( 2, { minFontSize: 30 } );
	$('.more-info p').fitText( 2.5, { minFontSize: 20 } );

	$('.rate-display h2').fitText( 0.3, { matchMedia: 'only screen and (min-width: 768px)' } );

	$('.footer-bar').fitText( 3.6, { matchMedia: 'only screen and (min-width: 768px)', maxFontSize: 40 });

});

