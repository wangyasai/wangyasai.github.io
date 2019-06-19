
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
let radius = [];


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
		var radius = random(40,70);
		circles.push(new Circle(random(width),random(-500), radius,t[i]));
	}
} 



function draw () {
	background ('#3B32C2');

	fill(240);
	noStroke();
	textSize(40);
	textAlign(CENTER);
	text("HI, 我是亚赛", width/2, height/3 );
	text("数据可视化设计师", width/2, height/2.4 );
	text("设计工具制造玩家", width/2, height/2 );


	for(var i = 0; i < t.length; i++){
		circles[i].show();
	}   
}