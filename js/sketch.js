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

let t = ["p5.js","Processing","Ai","Ps","Data","Design","Indesign","Matter.js","AE","QGis","D3.js","THREE.js","BootStrap","Html","css"];
let r= [6,7,7,6,6,3,2,3,3,4,1,1,2,4,3];


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
	groundT = Bodies.rectangle( width/2, -3000,width*3,100,options);
	World.add(world, [ground,groundL,groundR,groundT]);
	for(var i = 0 ; i < t.length; i++){
		var radius = map(r[i],0,10,20,70);
		var n = map(windowWidth,400,2000,1,2.5);
		circles.push(new Circle(random(width),random(-200,-2000), radius*n,t[i]));
	}


	var canvasmouse = Mouse.create(canvas.elt);
	canvasmouse.pixelRatio = 2; 
	var options = {
		mouse: canvasmouse
	}


	mConstraint = MouseConstraint.create(engine,options);
	World.add(world, mConstraint);
} 



function draw () {
	pixelDensity(2);
	background ('#445FAC');
	var percent = norm(sin(PI/2+frameCount/100), -1, 1);
	var between = lerpColor(color('#eedacf'),color('#f3f3f3'), percent);
	fill(between);
	noStroke();
	rect(0,0,width,height);

	fill('#ea7689');
	noStroke();
	var size = map(windowWidth,375,2000,14,22);
	textSize(size);
	textAlign(CENTER);
	textSize(size*2.5);
	// text("HI, I'm Yasai", width/2, height*0.4 );
	// textSize(20);
	// textAlign(LEFT);
	// text("I'm a data visualization designer who is curiosity of data, design and coding. I create elegant and creative vis to tell story. Besides, I have been made ten effective and effient design tools. Have fun：）", width/2-200, height*0.42,size*20,900);

	text("HI, 我是亚赛", width/2, height*0.4 );
	textSize(size);
	textAlign(CENTER);
	text("我是一名数据可视化设计师", width/2, height*0.45);
	text("喜欢用编程和设计去创造优雅并美观的可视化作品", width/2, height*0.48);
	text("也是一名设计工具制造玩家", width/2, height*0.51);
	text("误打误撞产出10款提高效率的设计小工具", width/2, height*0.54);

	for(var i = 0; i < t.length; i++){ 
		circles[i].show();
	}   

}


function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}