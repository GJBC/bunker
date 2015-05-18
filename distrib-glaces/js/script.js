// Script fait en : 23 min !

var glaces_container = document.getElementById('glaces_container');

while ( confirm('Voulez-vous des glaces ?') ) {
	priceDisplaying = 'Prix : 1.20 € /glaces, 0.90 € /glaces à partir de 5 glaces.'
	nb = parseInt( prompt('Combien en voulez-vous ?' + '\n' + priceDisplaying) );
	price = nb >= 5 ? 1.2*nb : 0.9*nb;
	payment = parseFloat( prompt('Mettez vos pièces.' + '\n' + priceDisplaying) );
	
	while ( payment < price ) {
		payment += parseFloat( prompt('Il reste ' + (price-payment) + ' € à payer.') );
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
