
// module aliases
var Engine = Matter.Engine,
Render = Matter.Render,
World = Matter.World,
Bodies = Matter.Bodies;

// create an engine
var engine,world;
var circles = [];


var ground,groundL,groundR;
let t = ["p5.js","processing","Ai","Ps","Data","Design","Python","Indesign","Matter.js","Github","Yasai","AE"];
let r= [6,7,7,6,6,6,3,3,4,3,8,5,4];


function setup () {
	createCanvas (windowWidth, windowHeight); 
	engine = Engine.create();
	world = engine.world;
	Engine.run(engine);
	var options = {
		isStatic: true
	}
	ground = Bodies.rectangle( width/2, height, width*2,1, options);
	groundL = Bodies.rectangle( 0, height/2, 1,height,options);
	groundR = Bodies.rectangle( width, height/2, 1, height,options);
	World.add(world, [ground,groundL,groundR]);
	for(var i = 0 ; i < t.length; i++){
		var radius = map(r[i],0,10,30,70);
		var n = map(windowWidth,400,2000,1,2.5);
		circles.push(new Circle(random(width),random(-500), radius*n,t[i]));
	}
} 



function draw () {
	background ('#E76988');

	fill(255,70);
	noStroke();
	textSize(40);
	textAlign(CENTER);
	text("HI, 我是亚赛", width/2, height/3 );
	text("数据可视化设计师", width/2, height/2.4);
	text("设计工具制造玩家", width/2, height/2 );

	for(var i = 0; i < t.length; i++){
		circles[i].show();
	}   
}