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
		group: "base",
		strokeStyle: "#000",
		strokeWidth: 1.5,
		x: 240, y: 320,
		radius: 50,
		name: 'C'
	});
	
	canvas.drawArc({
		layer: true,
		group: "base",
		fillStyle: "#000",
		x: 240, y: 320,
		radius: 2,
		name: 'c'
	});
	
	canvas.drawText({
		layer: true,
		group: "base",
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
		group: "base",
		strokeStyle: "#000",
		strokeWidth: 1.5,
		x1: 0, y1: 370,
		x2: 480, y2: 370,
		x3: 0, y3: 370,
		x4: 0, y4: 370,
		name: "l"
	});
	
	canvas.drawText({
		layer: true,
		group: "base",
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
		name: "T1",
		group: "swimmers3"
	});
	
	canvas.drawLine({
		layer: true,
		strokeStyle: "#000",
		strokeWidth: 1.5,
		x1: x, y1: y,
		x2: l[1].x+c_x, y2: l[1].y+c_y,
		x3: l[1].x+c_x, y3: l[1].y+c_y,
		name: "T2",
		group: "swimmers3"
	});
	
	extendTangent(canvas.getLayer("T1"), canvas.getLayer("T2"));
	
	//canvas.getLayer("p").dragstop = function{ updateTangent(x, y); }
	
}

function extendTangent(T1, T2){
	var m1 = (T1.y2 - T1.y1) / (T1.x2 - T1.x1);
	var m2 = (T2.y2 - T2.y1) / (T2.x2 - T2.x1);
	
	var y_bot = canvas.getLayer("l").y1;
	T1.y3 = y_bot;
	T2.y3 = y_bot;
	
	T1.x3 = ((y_bot-T1.y2)/m1) + T1.x2;
	T2.x3 = ((y_bot-T2.y2)/m2) + T2.x2;
}

function getAngle(L1_x1, L1_x2, L1_y1, L1_y2, L2_x1, L2_x2, L2_y1, L2_y2){
	var dy1 = L1_y1 - L1_y2;
	var dx1 = L1_x1 - L1_x2;
	var dy2 = L2_y1 - L2_y2;
	var dx2 = L2_x1 - L2_x2;
	
	var angle1 = Math.atan2(dy1, dx1);
	var angle2 = Math.atan2(dy2, dx2);
	var angle = Math.abs(angle1-angle2);
	return angle;
}

function setNumberOfSwimmers(numberOfSwimmers){
	if(numberOfSwimmers==1){ beginOneSwimmer(); }
	else if(numberOfSwimmers==2){ beginTwoSwimmers(); }
	else if(numberOfSwimmers==3){ beginThreeSwimmers(); }
	else if(numberOfSwimmers=="k"){ beginkSwimmers(); }
	else{ alert("Something bad happened! Invalid number of swimmers!"); }
}

function beginOneSwimmer(){
	
	$('#swim1button').attr('value', 'RESET');
	$('#swim1button').attr('disabled', true);
	$('#swim2button').attr('disabled', true);
	$('#swim3button').attr('disabled', false);
	$('#swim3button').attr('value', '3 Swimmers');
	$('#swimkbutton').attr('disabled', true);
	
	canvas.removeLayerGroup("swimmers1");
	canvas.removeLayerGroup("swimmers2");
	canvas.removeLayerGroup("swimmers3");
	canvas.removeLayerGroup("swimmersk");
	
	$('#info').html("<p>In the one swimmer case, shown in <span class=\'red\'>RED</span>, it is \
	obvious to the casual observer that the best path home is directly to shore. Since the swimmer \
	is unable to see which direction shore is, however, the path could be close to the entire \
	circumference!</p> \
	<p>Drag the <span class=\'oj\'>ORANGE</span> point to the desired location for the swimmer to \
	swim towards and see how far it takes him to get home!</p>");
		
	canvas.drawArc({
		layer: true,
		draggable: true,
		cursor: "pointer",
		fillStyle: "orange",
		x: 240, y: 200,
		radius: 7,
		name: "p",
		group: "swimmers1"
	});
	
	$('#GObutton').attr('onclick', 'go1Swimmer(canvas.getLayer("p").x, canvas.getLayer("p").y)');
}

function beginTwoSwimmers(){
	alert('in 2 swimmer case! -- not finished yet!');
}

function beginThreeSwimmers(){
	
	$('#swim1button').attr('disabled', true);
	$('#swim2button').attr('disabled', true);
	$('#swim3button').attr('value', 'RESET');
	$('#swim3button').attr('disabled', false);
	$('#swimkbutton').attr('disabled', true);
	
	canvas.removeLayerGroup("swimmers1");
	canvas.removeLayerGroup("swimmers2");
	canvas.removeLayerGroup("swimmers3");
	canvas.removeLayerGroup("swimmersk");
	canvas.removeLayerGroup("path_grp");
	
	$('#info').html("<p>In the case of 3 swimmers, each must cover an arc of the circle.</p> \
		<p>Each swimmer has a color: <span class=\'red\'>Swimmer 1</span> is \
		<span class=\'red\'>RED</span>, <span class=\'blu\'>Swimmer 2</span> is \
		<span class=\'blu\'>BLUE</span>, and <span class=\'grn\'>Swimmer 3</span> is \
		<span class=\'grn\'>GREEN</span>.</p> \
		<p>The <span class=\'oj\'>ORANGE</span> point at the top can be dragged to designate \
		the two tangents, T1 and T2.</p> \
		<p>Drag the orange point to the desired location and press \
		<span class=\'grn\'>GO</span> when ready.</p>");
		
	canvas.drawArc({
		layer: true,
		draggable: true,
		cursor: "pointer",
		fillStyle: "orange",
		x: 240, y: 200,
		radius: 7,
		name: "p",
		group: "swimmers3"
	});
	
	$('#GObutton').attr('onclick', 'go3Swimmers(canvas.getLayer("p").x, canvas.getLayer("p").y)');
}

function beginkSwimmers(){
	alert('in k swimmer case! -- not finished yet!');
}

function go3Swimmers(p_x, p_y){
	
	canvas.removeLayer("red_path_length_label");
	canvas.removeLayer("blu_path_length_label");
	canvas.removeLayer("grn_path_length_label");
	canvas.removeLayer("red_path_length");
	canvas.removeLayer("blu_path_length");
	canvas.removeLayer("grn_path_length");

	drawTangent(p_x, p_y);
	canvas.getLayer("l").x3 = canvas.getLayer("T2").x3;
	canvas.getLayer("l").x4 = canvas.getLayer("T1").x3;
	
	canvas.drawText({
		layer: true,
		group: "swimmers3",
		fillStyle: "#000",
		strokeStyle: "#000",
		strokeWidth: .25,
		x: 50, y: 10,
		fontSize: "8pt",
		fontFamily: "Arial, sans-serif",
		text: "Red Path Length:",
		name: 'red_path_length_label'
	});
	
	canvas.drawText({
		layer: true,
		group: "swimmers3",
		fillStyle: "#000",
		strokeStyle: "#000",
		strokeWidth: .25,
		x: 50, y: 25,
		fontSize: "8pt",
		fontFamily: "Arial, sans-serif",
		text: "Blue Path Length:",
		name: 'blu_path_length_label'
	});
	
	canvas.drawText({
		layer: true,
		group: "swimmers3",
		fillStyle: "#000",
		strokeStyle: "#000",
		strokeWidth: .25,
		x: 55, y: 40,
		fontSize: "8pt",
		fontFamily: "Arial, sans-serif",
		text: "Green Path Length:",
		name: 'grn_path_length_label'
	});
	
	draw3SwimmerPath();
}

function draw3SwimmerPath(){
	canvas.removeLayerGroup("path_grp");
	drawSwimmerPath("red");
	drawSwimmerPath("grn");
	drawSwimmerPath("blu");
}

function drawSwimmerPath(clr){ //clr is the color of the swimmer (r/b/g)
	var red_apex = [canvas.getLayer("T1").x1, canvas.getLayer("T1").y1];
	var red_theta = getAngle(canvas.getLayer("T1").x1, canvas.getLayer("T1").x2, 
		canvas.getLayer("T1").y1, canvas.getLayer("T1").y2, canvas.getLayer("T2").x1,
		canvas.getLayer("T2").x2, canvas.getLayer("T2").y1, canvas.getLayer("T2").y2);
	
	var blu_apex = [canvas.getLayer("T2").x3, canvas.getLayer("T2").y3];
	var blu_theta = getAngle(canvas.getLayer("T2").x3, canvas.getLayer("T2").x1, 
		canvas.getLayer("T2").y3, canvas.getLayer("T2").y1, canvas.getLayer("l").x3,
		canvas.getLayer("l").x2, canvas.getLayer("l").y3, canvas.getLayer("l").y2);
	
	var grn_apex = [canvas.getLayer("T1").x3, canvas.getLayer("T1").y3];
	var grn_theta = getAngle(canvas.getLayer("T1").x3, canvas.getLayer("T1").x1, 
		canvas.getLayer("T1").y3, canvas.getLayer("T1").y1, canvas.getLayer("l").x4,
		canvas.getLayer("l").x1, canvas.getLayer("l").y4, canvas.getLayer("l").y1);
	
	if(clr == "red"){
		var theta = red_theta;
		var apex = red_apex;
		var p_l = drawPath("red_path", "#FF0000", theta, apex, canvas.getLayer("T1"), canvas.getLayer("T2"));
		
		canvas.drawText({
			layer: true,
			group: "swimmers3",
			fillStyle: "#000",
			strokeStyle: "#000",
			strokeWidth: .25,
			x: 150, y: 10,
			fontSize: "8pt",
			fontFamily: "Arial, sans-serif",
			text: p_l.toString(),
			name: 'red_path_length'
		});
		
	}
	
	
	else if(clr == "grn"){
		var theta = grn_theta;
		var apex = grn_apex;
		var p_l = drawPath("grn_path", "#00FF00", theta, apex, canvas.getLayer("l"), canvas.getLayer("T1"));
		
		canvas.drawText({
			layer: true,
			group: "swimmers3",
			fillStyle: "#000",
			strokeStyle: "#000",
			strokeWidth: .25,
			x: 160, y: 40,
			fontSize: "8pt",
			fontFamily: "Arial, sans-serif",
			text: p_l.toString(),
			name: 'grn_path_length'
		});
	}
	
	
	else if(clr == "blu"){
		var theta = blu_theta;
		var apex = blu_apex;
		var p_l = drawPath("blu_path", "#0000FF", theta, apex, canvas.getLayer("T2"), canvas.getLayer("l"));
		
		canvas.drawText({
			layer: true,
			group: "swimmers3",
			fillStyle: "#000",
			strokeStyle: "#000",
			strokeWidth: .25,
			x: 150, y: 25,
			fontSize: "8pt",
			fontFamily: "Arial, sans-serif",
			text: p_l.toString(),
			name: 'blu_path_length'
		});
	}
	
	
	else{ alert('something bad happened! - the color is incorrect! -- IN drawSwimmerPath'); }
}

function drawPath(name, clr, theta, apex, T1, T2){
	if(theta >= (Math.PI/3)){
		canvas.drawLine({
			layer: true,
			strokeStyle: clr,
			strokeWidth: 1.5,
			x1: c_x, y1: c_y,
			x2: apex[0], y2: apex[1],
			name: name,
			group: "path_grp"
		});
		
		return Distance_Formula(c_x, c_y, apex[0], apex[1]);
	}
	else if( (theta >= (Math.PI/6)) && (theta < (Math.PI/3)) ){
		alpha = Math.PI/2 - theta;
		var m = getSlopeFromAngle(alpha, T1);
		var intersection1 = getIntersection(c_x, c_y, m, T1);
		var m2 = getSlopeFromAngle(Math.PI/2, T2);
		var intersection2 = getIntersection(intersection1[0], intersection1[1], m2, T2);
		
		if(intersection2[1] > canvas.getLayer("l").y1){
			intersection2[1] = canvas.getLayer("l").y1;
		}
		
		canvas.drawLine({
			layer: true,
			strokeStyle: clr,
			strokeWidth: 1.5,
			x1: c_x, y1: c_y,
			x2: intersection1[0], y2: intersection1[1],
			x3: intersection2[0], y3: intersection2[1],
			name: name,
			group: "path_grp"
		});
		
		return Distance_Formula(c_x, c_y, intersection1[0], intersection1[1]) + Distance_Formula(intersection1[0], intersection1[1], intersection2[0], intersection2[1]);
	}
	else if(theta < (Math.PI/6)){
		alpha = Math.PI/2 - theta;
		var m = getSlopeFromAngle(alpha, T1);
		var intersection_T1 = getIntersection(c_x, c_y, m, T1);
		var m2 = getSlopeFromAngle(Math.PI/2, T2);
		var intersection_T2 = getIntersection(intersection_T1[0], intersection_T1[1], m2, T2);
		var intersection_C1 = getCircleIntersections(intersection_T1[0], intersection_T1[1], m2, T2);
		//now you have the point at which the line intersects the circle
		var m3 = -1/getSlope(T2); 
		//this is the slope of the line from the opposite tangent that forms a 90 degree angle
		var intersection_C2 = getCircleIntersections(intersection_T2[0], intersection_T2[1], m3, T2);
		
		canvas.drawLine({
			layer: true,
			strokeStyle: clr,
			strokeWidth: 1.5,
			x1: c_x, y1: c_y,
			x2: intersection_T1[0], y2: intersection_T1[1],
			x3: intersection_C1[0][0], y3: intersection_C1[0][1],
			name: name+"_seg1",
			group: "path_grp"
		});	
		
		if(intersection_C2[1][1] > canvas.getLayer("l").y1){
			intersection_C2[1][1] = canvas.getLayer("l").y1;
		}
		
		canvas.drawLine({
			layer: true,
			strokeStyle: clr,
			strokeWidth: 1.5,
			x1: intersection_T2[0], y1: intersection_T2[1],
			x2: intersection_C2[1][0], y2: intersection_C2[1][1],
			name: name+"_seg2",
			group: "path_grp"
		});
		
		$("canvas").drawArc({
			layer: true,
			strokeStyle: clr,
			strokeWidth: 1.5,
			x: c_x, y: c_y,
			radius: C_radius,
			start: getArcAngle(intersection_C2[1][0], intersection_C2[1][1]), end: 	getArcAngle(intersection_C1[0][0], intersection_C1[0][1]),
				name: name+"_arc",
				group: "path_grp"
		});
		
		return Distance_Formula(c_x, c_y, intersection_T1[0], intersection_T1[1]) + Distance_Formula(intersection_T1[0], intersection_T1[1], intersection_C1[0][0], intersection_C1[0][1]) + Distance_Formula(intersection_T2[0], intersection_T2[1], intersection_C2[1][0], intersection_C2[1][1]) + getArcLength(getArcAngle(intersection_C2[1][0], intersection_C2[1][1]), getArcAngle(intersection_C1[0][0], intersection_C1[0][1]));
	}
	else{ 
		alert('something bad happened! the angle is not right! -- IN drawPath'); 
		return 0;
	}
}

function getSlope(T){
	var dx = T.x2 - T.x1;
	var dy = T.y2 - T.y1;
	return dy/dx;
}

function getSlopeFromAngle(alpha, T){
	var m2 = getSlope(T);
	var m1 = (m2 + Math.tan(alpha))/(1-(Math.tan(alpha)*m2));
	return m1;
}

function getB(m,x,y){
	return y-(m*x);
}

function getIntersection(x, y, m, L){
	var m2 = getSlope(L);
	var b1 = getB(m,x,y);
	var b2 = getB(m2,L.x1,L.y1);
	
	var x_ans = (b2-b1)/(m-m2);
	var y_ans = ((m*x_ans)+b1);
	
	return [x_ans,y_ans];
}

function getCircleIntersections(x,y,m){
	var b = getB(m,x,y);
	var A = Math.pow(m,2)+1;
	var B = 2*(m*b-m*c_y-c_x);
	var C = Math.pow(c_y,2)-Math.pow(C_radius,2)+Math.pow(c_x,2)-2*b*c_y+Math.pow(b,2);
	
	var x_ans1 = (-B+Math.sqrt(Math.pow(B,2)-(4*A*C)))/(2*A);
	var x_ans2 = (-B-Math.sqrt(Math.pow(B,2)-(4*A*C)))/(2*A);
	
	var y_ans1 = (m*x_ans1)+b;
	var y_ans2 = (m*x_ans2)+b;
	
	return [[x_ans1,y_ans1],[x_ans2,y_ans2]];
}

function getArcAngle(x,y) {
    var p0 = {x: c_x, y: c_y - Math.sqrt(Math.abs(x - c_x) * Math.abs(x - c_x)
            + Math.abs(y - c_y) * Math.abs(y - c_y))};
    return (2 * Math.atan2(y - p0.y, x - p0.x)) *180/Math.PI;
}

function getArcLength(alpha, beta){
	var theta = alpha - beta;
	return (theta/360)*2*Math.PI*C_radius;
}




