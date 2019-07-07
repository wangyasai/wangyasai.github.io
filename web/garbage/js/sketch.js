
// module aliases
var Engine = Matter.Engine,
Render = Matter.Render,
World = Matter.World,
Bodies = Matter.Bodies,
Runner = Matter.Runner,
Sleeping = Matter.Sleeping,
MouseConstraint = Matter.MouseConstraint,
Mouse = Matter.Mouse,
Constraint = Matter.Constraint;

// create an engine
var engine,world;

var texts = [];
var title;
var mConstraint;
var img = [];
var imageNums = 10;
var circles = [];

var img1,img2,img3;

var others =[];
var otherNums = 2;
var otherImg = [];
var ground,groundL,groundR,groundT,ground1,ground2,ground3,ground4;
var nums;
var button;

function preload(){
	for(var i =0; i <imageNums;i++){
		img[i] = loadImage("../web/garbage/img//7 ("+i+").png"); 
	}

	for(var i =0; i <otherNums;i++){
		otherImg[i] = loadImage("../web/garbage/img/other ("+i+").png"); 
	}
}

function setup () {
	var canvas =createCanvas (windowWidth, windowHeight); 
	if(width<450){
		nums = map(height,667,812,imageNums*6,imageNums*8);
	}else{
		nums = map(width,640,1000,imageNums*7,imageNums*12);
	}
	

	engine = Engine.create();
	world = engine.world;
	Engine.run(engine);
	

	var options = {
		isStatic: true
	}

	if(width<=640){
		ground = Bodies.rectangle( width/2, height+25-width*button.height/button.width-6, width*3,50, options);
	}else{
		ground = Bodies.rectangle( width/2, height+25-6, width*3,50, options);
	}
	
	groundL = Bodies.rectangle( -25, height/2, 50,height*3,options);
	groundR = Bodies.rectangle( width+25, height/2, 50, height*3,options);
	groundT = Bodies.rectangle( width/2, -2500, width*3,50, options);
	World.add(world, [ground,groundL,groundR,groundT]);

	
	for(var i = 0 ; i < nums; i++){
		var pic = int(random(imageNums));
		var s = 0.7;
		circles.push(new Circle(random(width),-random(500,200)-pic*300, img[pic].width*s, img[pic].height*s, img[pic]));//-100-pic*200
	}	

	for(var i = 0 ; i < 2; i++){
		var pic = int(i%otherNums) ;
		var s = 1;
		others.push(new Circle(random(width),-random(500,200)-200*pic, otherImg[pic].width*s, otherImg[pic].height*s, otherImg[pic]));//-100-pic*200
	}


	var canvasmouse = Mouse.create(canvas.elt);
	canvasmouse.pixelRatio = 2; 
	var options = {
		mouse: canvasmouse,
	}

	mConstraint = MouseConstraint.create(engine,options);
	World.add(world, mConstraint);
} 



function draw () {

	pixelDensity(2);
	background (255);

	for(var x = 10 ; x < width;x+=20){
		for(var y = 10 ; y < height;y+=20){
			fill(50);
			noStroke();
			ellipse(x,y,1,1);
		}
	}

	for(var i = 0; i < nums; i++){
		circles[i].show();
	}
	for(var i = 0; i < otherNums; i++){
		others[i].show();
	}

	if(width<=640){
		image(button, 0, height-width*button.height/button.width, width,width*button.height/button.width);
	}
	
}







