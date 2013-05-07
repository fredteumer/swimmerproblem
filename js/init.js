//init.js

var canvas = $('canvas');

$(document).ready(function(){
	init();
});

var c_x = 240;
var c_y = 320;
var C_radius = 50;

function init(){
	canvas.drawArc({
		layer: true,
		strokeStyle: "#000",
		strokeWidth: 1.5,
		x: 240, y: 320,
		radius: 50,
		name: 'C'
	});
	
	canvas.drawArc({
		layer: true,
		fillStyle: "#000",
		x: 240, y: 320,
		radius: 2,
		name: 'c'
	});
	
	canvas.drawText({
		layer: true,
		fillStyle: "#000",
		strokeStyle: "#000",
		strokeWidth: .25,
		x: 250, y: 330,
		fontSize: "12pt",
		fontFamily: "Arial, sans-serif",
		text: "c",
		name: 'c-label'
	});
	
	canvas.drawLine({
		layer: true,
		strokeStyle: "#000",
		strokeWidth: 1.5,
		x1: 0, y1: 370,
		x2: 480, y2: 370,
		name: "l"
	});
	
	canvas.drawText({
		layer: true,
		fillStyle: "#000",
		strokeStyle: "#000",
		strokeWidth: .25,
		x: 10, y: 380,
		fontSize: "12pt",
		fontFamily: "Arial, sans-serif",
		text: "l",
		name: 'l-label'
	});
	
}

function findIntersection(l1, l2){}

function Distance_Formula(x1, y1, x2, y2){
	var d = Math.sqrt(Math.pow((x2-x1), 2) + Math.pow((y2-y1), 2));
	return d;
}

function findTangent(x,y){ //x and y are the coordinates of the ORANGE point
	var dx = c_x - x;
	var dy = c_y - y;
	var dist = Distance_Formula(c_x, c_y, x, y);
	var a = Math.asin(C_radius/dist);
	var b = Math.atan2(dy, dx);
	
	t = b - a;
	var ta = ta = { x:C_radius * Math.sin(t), y:C_radius * -Math.cos(t) };
    
    t = b + a
    var tb = { x:C_radius * -Math.sin(t), y:C_radius * Math.cos(t) };
    
    return [ta, tb];
}

function drawTangent(x,y){
	canvas.removeLayer("T1");
	canvas.removeLayer("T2");

	var l = findTangent(x,y);
	
	canvas.drawLine({
		layer: true,
		strokeStyle: "#000",
		strokeWidth: 1.5,
		x1: x, y1: y,
		x2: l[0].x+c_x, y2: l[0].y+c_y,
		x3: l[0].x+c_x, y3: l[0].y+c_y,
		name: "T1"
	});
	
	canvas.drawLine({
		layer: true,
		strokeStyle: "#000",
		strokeWidth: 1.5,
		x1: x, y1: y,
		x2: l[1].x+c_x, y2: l[1].y+c_y,
		x3: l[1].x+c_x, y3: l[1].y+c_y,
		name: "T2"
	});
	
	extendTangent(canvas.getLayer("T1"), canvas.getLayer("T2"));
	
}

function extendTangent(T1, T2){
	var y_bot = canvas.getLayer("l").y1;
	T1.y3 = y_bot;
	T2.y3 = y_bot;
	
	T1.x3 = T1.x2+(T1.x2-T1.x1);
	T2.x3 = (((y_bot-T2.y2)(T2.x2-T2.x1)) / (T2.y2 - T2.y1)) + T2.x2
}

function setNumberOfSwimmers(numberOfSwimmers){
	if(numberOfSwimmers==1){ beginOneSwimmer(); }
	else if(numberOfSwimmers==2){ beginTwoSwimmers(); }
	else if(numberOfSwimmers==3){ beginThreeSwimmers(); }
	else if(numberOfSwimmers=="k"){ beginkSwimmers(); }
	else{ alert("Something bad happened! Invalid number of swimmers!"); }
}

function beginOneSwimmer(){
	alert('in 1 swimmer case! -- not finished yet!');
}

function beginTwoSwimmers(){
	alert('in 2 swimmer case! -- not finished yet!');
}

function beginThreeSwimmers(){
	
	$('#swim1button').attr('disabled', true);
	$('#swim2button').attr('disabled', true);
	$('#swim3button').attr('disabled', true);
	$('#swimkbutton').attr('disabled', true);
	
	$('#info').html("<p>In the case of 3 swimmers, each must cover an arc of the circle.</p> \
		<p>Each swimmer has a color: <span class=\'red\'>Swimmer 1</span> is \
		<span class=\'red\'>RED</span>, <span class=\'blu\'>Swimmer 2</span> is \
		<span class=\'blu\'>BLUE</span>, and <span class=\'grn\'>Swimmer 3</span> is \
		<span class=\'grn\'>GREEN</span>.</p> \
		<p>The <span class=\'oj\'>ORANGE</span> point at the top can be dragged to designate \
		the two tangents, T1 and T2.</p> \
		<p>Try it out and see what is the optimal configuration for the three swimmers!</p>");
		
	canvas.drawArc({
		layer: true,
		draggable: true,
		cursor: "pointer",
		fillStyle: "orange",
		x: 240, y: 200,
		radius: 7,
		name: "p"
	});
	
	drawTangent(canvas.getLayer("p").x, canvas.getLayer("p").y);
}

function beginkSwimmers(){
	alert('in k swimmer case! -- not finished yet!');
}