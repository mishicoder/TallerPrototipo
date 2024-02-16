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
function bullet(x, y, danio){
	return [
		rect(8, 4),
		color(247, 255, 5),
		area(),
		pos(x, y),
		offscreen({ destroy: true }),
		'bullet',
		{
			danio: danio
		}
	];
}

//*****************************************
// comportamientos
//*****************************************
// arma
function gun(){

	// variables de control del comportamiento
	let municion = 10;
	let municionMaxima = 10;
	let carga = 10;
	let cargaMaxima = 50;
	let danio = 2;
	let umbral = 0.4;
	let puedeDisparar = true;

	return {
		// identificador del componente
		id: 'gun',
		// requiere de otros componentes
		require: ['timer'],
		// se ejecuta cuando el objeto
		// se agrega a la escena
		add(){},
		// se ejecuta en cada iteracion
		// mientras el objeto exista
		update(){
			this.shoot();
			this.reload();
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
			if(isKeyDown('j') && puedeDisparar && municion > 0){
				add(bullet(playerGun.worldPos().x + 20, playerGun.worldPos().y + 3.6), danio);
				puedeDisparar = false;
				municion--;
				this.wait(umbral, () => {
					puedeDisparar = true;
				});
			}
		},
		reload(){
			if(isKeyPressed('r')){

				if(municion > 0 && municion < municionMaxima) {
					carga += municion;
					municion = 0;
				};
				 
				if(carga == municionMaxima){
					municion += municionMaxima;
					carga = 0;
				}
				else if(carga < municionMaxima){
					municion += carga;
					carga = 0;
				}
				else if(carga > municionMaxima){
					municion += municionMaxima;
					carga -= municionMaxima;
				}
				
			}
		},
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
	timer(),
	gun(),
]);

//*****************************************
// control de balas
//*****************************************
onUpdate('bullet', (b) => {
	b.move(800, 0);
});

//*****************************************
// arma
//*****************************************
const worlGun = add([
	rect(50, 20),
	color(40, 255, 0),
	area(),
	pos(250, height() - 100)
]);

worlGun.onCollide('player', (p) => {
	p.add(playerGun);
	destroy(worlGun);
} );
//*****************************************
// enemigo de prueba
//*****************************************
const enemy = add([
	rect(50, 50),
	color(12, 56, 120),
	area(),
	pos(550, height() - 130),
	{
		health: 100,
	},
	'enemy'
]);
enemy.onCollide('bullet', (b) => {
	enemy.health -= 20;
	console.log(enemy.health);
	destroy(b);
	if(enemy.health <= 0) destroy(enemy);
});

//*****************************************
// plataforma
//*****************************************

const level = addLevel([
	"        ",
	"     *   ",
	"        ",
	"    *    ",
	"  **     ",
	"        ",
	"        ",
	"        ",
	"============="
], {
	tileWidth: 64,
	tileHeight: 64,
	tiles: {
		"=": () => [
			rect(64, 64),
			color(0, 0, 0),
			pos(),
			area(),
			body({ isStatic: true }),
		],
		"*": () => [
			rect(64, 64),
			color(0, 255, 0),
			pos(),
			area(),
			body({ isStatic: true }),
		]
	}
});

