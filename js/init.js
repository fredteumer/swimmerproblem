//init.js

var canvas = $('#canvas');
var context = canvas.getContext('2d');

function init(){
	context.beginPath();
	context.moveTo(0, 0);
	context.lineTo(400, 50);
	context.stroke();
}