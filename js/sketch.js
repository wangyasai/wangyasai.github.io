
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
let t = ["p5.js","Processing","Ai","Ps","Data","Design","Indesign","Matter.js","Yasai","AE","QGis","D3.js","THREE.js","BootStrap","Html","css"];
let r= [6,7,7,6,6,3,2,3,5,3,4,1,1,2,4,3];


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
		var radius = map(r[i],0,10,30,70);
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
	var between = lerpColor(color('#eedacf'),color('#EADAB9'), percent);
	fill(between);
	noStroke();
	rect(0,0,width,height);

	fill(255, 160);
	noStroke();
	var size = map(windowWidth,375,2000,22,30);
	textSize(size);
	textAlign(CENTER);
	text("HI, 我是亚赛", width/2, height*0.4 );
	text("数据可视化设计师", width/2, height*0.45);
	text("设计工具制造玩家", width/2, height*0.5);

	// text('广告学背景，做了新闻业的数据可视化设计师',width/2, height*0.55);
	// text('喜欢用设计和编程去把数据描绘的有吸引力',width/2, height*0.60);

	for(var i = 0; i < t.length; i++){
		
 
		circles[i].show();
	}   

}


function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}






