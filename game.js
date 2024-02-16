import k from './src/k.js';

// configuraciones iniciales
setGravity(400);

// constantes y variables
const PLAYER_SPEED = 400;

// personaje
const player = add([
	rect(50, 50),
	pos(10, 5),
	area(),
	body(),
	color(255, 0, 0),
]);

// plataforma
const platform = add([
	rect(width(), 80),
	color(0, 0, 0),
	pos(0, height() - 80),
	area(),
	body({
		isStatic: true
	}),
]);

onUpdate(() => {
	if(isKeyDown('a')){
		player.move(-PLAYER_SPEED, 0);
	}
	if(isKeyDown('d')){
		player.move(PLAYER_SPEED, 0);
	}
});
