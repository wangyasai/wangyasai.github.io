var theta;
var a;
var col;
var num;
var r;

function setup() {
  createCanvas(windowWidth,windowHeight);
}

function draw() {
  background('#F2F2F2');  push();
  translate(width/2, height/2);
  theta = map(sin(millis()/1000.0), -1, 1, 0, PI/6);

  var num=10;
  for (var i=0; i<num; i++) {
    a = map(sin(millis()/1000.0), -1, 1, 0, 300);
    rotate(TWO_PI/num);
    strokeWeight(1);
    branch(a);
  }
  pop();
  fill(20);




  var s = map(width,375,2000,20,50);

  stroke('#F2F2F2');
  strokeWeight(s*1.5);
  line(0,height/2,width,height/2);

  noStroke();
  textSize(s);
  textAlign(CENTER,CENTER);
  fill(200, 0, 74);

  text("Hi，我是亚赛，一名可视化设计师。",width/2, height/2)
}

function branch(len) {
  col=map(len, 0, 90, 150, 255);
  stroke (col, 0, 74);
  line(0, 0, 0, -len/2);

  fill(col, 0, 74);
  r = map(a, 0, 300, 10, 2);
  ellipse(0, -len, r, r);
  len-=50;


  //枝干
  if (len>20) {
    push(); 
    translate(0, -30);
    rotate(theta);
    branch(len); 
    pop();

    push();
    translate(0, -30);
    rotate(-theta);
    branch(len); 
    pop();
  }
}