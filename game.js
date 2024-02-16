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
// objetos predefinidos
//*****************************************
function bullet(x, y){
	return [
		rect(8, 4),
		color(247, 255, 5),
		area(),
		pos(x, y),
		'bullet'
	];
}

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
		update(){
			this.shoot();
		},
		// se ejecuta en cada iteracion despues
		// de update, siempre que el objeto exista
		draw(){},
		// se ejecuta cuando el objeto es
		// destruido
		destroy(){},
		// modo ispector
		inspect(){},

		// funciones personalizadas
		shoot(){
			if(isKeyPressed('j')){
				add(bullet(playerGun.worldPos().x + 20, playerGun.worldPos().y + 3.6));
			}
		},
		reload(){},
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
// objeto arma
//*****************************************
const playerGun = make([
	rect(20, 10),
	color(24, 125, 45),
	pos(50, 10),
	gun(),
]);

//*****************************************
// control de balas
//*****************************************
onUpdate('bullet', (b) => {
	b.move(400, 0);
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
	p.add(playerGun);
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

