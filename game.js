import k from './src/k.js';

//*****************************************
// configuraciones iniciales
//*****************************************
setGravity(2000);

//*****************************************
// constantes y variables
//*****************************************
const PLAYER_SPEED = 400;
const PLAYER_JUMP_FORCE = 760;

//*****************************************
// comportamientos
//*****************************************
// arma
function gun(){

	// variables de control del comportamiento
	let municion = 10;
	let municionMaxima = 50;
	let danio = 2;
	let umbral = 0.4;
	let puedeDisparar = true;

	return {
		// identificador del componente
		id: 'gun',
		// requiere de otros componentes
		require: [],
		// se ejecuta cuando el objeto
		// se agrega a la escena
		add(){},
		// se ejecuta en cada iteracion
		// mientras el objeto exista
		update(){},
		// se ejecuta en cada iteracion despues
		// de update, siempre que el objeto exista
		draw(){},
		// se ejecuta cuando el objeto es
		// destruido
		destroy(){},
		// modo ispector
		inspect(){},
	};

}

//*****************************************
// personaje
//*****************************************
const player = add([
	rect(50, 50),
	pos(10, 400),
	area(),
	body(),
	color(255, 0, 0),
	'player',
]);
onUpdate(() => {
	if(isKeyDown('a')){
		player.move(-PLAYER_SPEED, 0);
	}
	if(isKeyDown('d')){
		player.move(PLAYER_SPEED, 0);
	}
});

onKeyPress('space', () => {
	if(player.isGrounded()){
		player.jump(PLAYER_JUMP_FORCE);
	}
});
onKeyPress('w', () => {
	if(player.isGrounded()){
		player.jump(PLAYER_JUMP_FORCE);
	}
});

//*****************************************
// arma
//*****************************************
const worlGun = add([
	rect(50, 20),
	color(40, 255, 0),
	area(),
	pos(500, height() - 100)
]);

worlGun.onCollide('player', (p) => {
	p.color = rgb(0, 0, 255);
	destroy(worlGun);
} );

//*****************************************
// plataforma
//*****************************************
const platform = add([
	rect(width(), 80),
	color(0, 0, 0),
	pos(0, height() - 80),
	area(),
	body({
		isStatic: true
	}),
]);

