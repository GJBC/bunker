// Script fait en : 23 min !

var glaces_container = document.getElementById('glaces_container');

if ( confirm('Voulez-vous des glaces ?') ) {
	var priceDisplaying = 'Prix : 1.20 € /glaces, 0.90 € /glaces à partir de 5 glaces.',
		nb, price, payment;
	
	do {
		nb = parseInt( prompt('Combien en voulez-vous ?' + '\n' + priceDisplaying) );
	} while ( isNaN(nb) );
	
	price = nb >= 5 ? 1.2*nb : 0.9*nb;
	
	do {
		payment = parseFloat( prompt('Mettez vos pièces.' + '\n' + priceDisplaying) );
	} while ( isNaN(payment) );
	
	while ( payment < price ) {
		var complement;
		do {
			complement = parseFloat( prompt('Il reste ' + (price-payment) + ' € à payer.') );
		} while ( isNaN(complement) );
		payment += complement;
	}
	
	if ( payment > price ) {
		alert('Cette machine ne rend pas la monnaie');
	}
	
	for ( i = 0; i < nb; i++ ) {
		var img = document.createElement('img');
		img.src = 'img/glace' + parseInt( Math.random()*6 +1 ) + '.jpg';
		img.alt = 'Une glace';
		glaces_container.appendChild(img);
	}
	
	alert('Voilà vos glaces !');
}
