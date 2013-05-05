//init.js

var canvas = $('canvas');

$(document).ready(function(){
	init();
});

function init(){
	$('canvas').drawEllipse({
		layer: true,
		strokeStyle: "#000",
		strokeWidth: 1.5,
		x: 240, y: 320,
		width: 100,
		height: 100,
		name: 'C'
	});
	
	$('canvas').drawEllipse({
		layer: true,
		fillStyle: "#000",
		x: 240, y: 320,
		width: 5,
		height: 5,
		name: 'c'
	});
	
	$('canvas').drawText({
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
	
	$('canvas').drawLine({
		layer: true,
		strokeStyle: "#000",
		strokeWidth: 1.5,
		x1: 0, y1: 370,
		x2: 480, y2: 370,
		name: "l"
	});
	
	$('canvas').drawText({
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

function setNumberOfSwimmers(numberOfSwimmers){
	if(numberOfSwimmers==1){ beginOneSwimmer(); }
	else if(numberOfSwimmers==2){ beginTwoSwimmers(); }
	else if(numberOfSwimmers==3){ beginThreeSwimmers(); }
	else if(numberOfSwimmers=="k"){ beginkSwimmers(); }
	else{ alert("Something bad happened! Invalid number of swimmers!"); }
}

function beginThreeSwimmers(){
	
	$('#swim1button').attr('disabled', false);
	$('#swim2button').attr('disabled', false);
	$('#swim3button').attr('disabled', true);
	$('#swimkbutton').attr('disabled', false);
	
	$('#info').html("<p>In the case of 3 swimmers, each must cover an arc of the circle.</p> \
		<p>Each swimmer is a color: <span class=\'red\'>Swimmer 1</span> is \
		<span class=\'red\'>RED</span>, <span class=\'blu\'>Swimmer 2</span> is \
		<span class=\'blu\'>BLUE</span>, and <span class=\'grn\'>Swimmer 3</span> is \
		<span class=\'grn\'>GREEN</span></p> \
		<p>The <span class=\'oj\'>ORANGE</span> point at the top can be dragged to designate \
		the two tangents, T1 and T2.</p> \
		<p>Try it out and see what is the optimal configuration for the three swimmers!</p>");
		
	canvas.drawArc({
		layer: true,
		draggable: true,
		cursor: "pointer",
		fillStyle: "orange",
		x: 240, y: 250,
		radius: 5
	})
	//alert('in 3 swimmer case');
}