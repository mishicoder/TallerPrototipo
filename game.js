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
const gun = add([
	rect(50, 20),
	color(40, 255, 0),
	area(),
	pos(500, height() - 100)
]);

gun.onCollide('player', (p) => {
	p.color = rgb(0, 0, 255);
	destroy(gun);
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

