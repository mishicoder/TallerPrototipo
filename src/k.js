import kaboom from "https://unpkg.com/kaboom@3000/dist/kaboom.mjs";

const k = kaboom({
	width: 800,
	height: 600,
	canvas: document.querySelector('#game'),
});

export default k;