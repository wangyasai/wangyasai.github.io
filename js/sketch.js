
// module aliases
var Engine = Matter.Engine,
Render = Matter.Render,
World = Matter.World,
Bodies = Matter.Bodies,
Runner = Matter.Runner,
MouseConstraint = Matter.MouseConstraint,
Mouse = Matter.Mouse,
Constraint = Matter.Constraint;

// create an engine
var engine,world;
var circles = [];
var mConstraint;



var ground,groundL,groundR;
let t = ["p5.js","Processing","Ai","Ps","Data","Design","Python","Indesign","Matter.js","Github","Yasai","AE","QGis"];
let r= [6,7,7,6,6,6,1,3,2,3,8,5,4,4];


function setup () {
	var canvas =createCanvas (windowWidth, windowHeight); 
	engine = Engine.create();
	world = engine.world;
	Engine.run(engine);
	var options = {
		isStatic: true
	}
	ground = Bodies.rectangle( width/2, height, width*3,2, options);
	groundL = Bodies.rectangle( 0, height/2, 2,height*3,options);
	groundR = Bodies.rectangle( width, height/2, 2, height*3,options);
	groundT = Bodies.rectangle( width/2, -300,width*3,100,options);
	World.add(world, [ground,groundL,groundR,groundT]);
	for(var i = 0 ; i < t.length; i++){
		var radius = map(r[i],0,10,30,70);
		var n = map(windowWidth,400,2000,1,2.5);
		circles.push(new Circle(random(width),random(-200), radius*n,t[i]));
	}


	var canvasmouse = Mouse.create(canvas.elt);
	console.log(canvasmouse);
	canvasmouse.pixelRatio = 2; 
	var options = {
		mouse: canvasmouse
	}


	mConstraint = MouseConstraint.create(engine,options);
	World.add(world, mConstraint);


} 



function draw () {
	pixelDensity(2);
	background ('#FC8AA3');
	var percent = norm(sin(frameCount/100), -1, 1);
	var between = lerpColor(color('#97E4FF'),color('#FC8AA3'), percent);
	fill(between);
	noStroke();
	rect(0,0,width,height);

	fill(255,70);
	noStroke();
	textSize(30);
	textAlign(CENTER);
	text("HI, 我是亚赛", width/2, height/3 );
	text("数据可视化设计师", width/2, height/2.4);
	text("设计工具制造玩家", width/2, height/2 );

	for(var i = 0; i < t.length; i++){
		circles[i].show();
	}   


	if(mConstraint.body){	 
		print("!");
		fill('#3B00C2');
		var pos = mConstraint.body.position;
		ellipse(pos.x, pos.y,this.r*2);
	}

}







