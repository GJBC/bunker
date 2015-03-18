var my_array = [];

var car = new Object;
car.position = 0;
car.move = function ( vitesse ) {
	this.position += vitesse;
};

for (var i=0; i<2; i++) {
	vitesse = 3;
	
	car.move( vitesse );
	car.comeback( vitesse );
}

console.log ( car.position );