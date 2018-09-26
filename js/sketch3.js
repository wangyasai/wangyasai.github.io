var particles = [];
var maxLife;
var noiseScale = 1500;
var maxLife;
var Length = 10;
var nums =400;
var MaxRadius = 2;
var MinRadius =2;
var cover;
var targetW = 220;
var w = 0;
var r = 5;
var noiseScale=600;
var canvas = document.getElementById('myCanvas');
var margin;

function setup(){
  createCanvas(windowWidth,windowHeight);
}



function draw(){
  background(255);
  fill('#019959');
  rect(0,height*0.2,width,height);
  smooth();
  if(width<800){
    margin=50;
  }else{
    margin=100;
  }
  for(var x = margin; x < width-margin; x+=50){
    for(var  y = margin+height*0.2; y<height-margin;y+=50){
      var from = color("#EFC3CA");
      var to = color("#EFC3CA");
      var percent = norm(x,0,width);
      var between = lerpColor(from, to, percent);
      fill(between);

      var n = noise(x *noiseScale, y *noiseScale, frameCount * 0.05);
      s = map(n,0,1,1,30);
      noStroke();
      ellipse(x,y,s,s);

      if(dist(mouseX,mouseY,x,y)<50){
        s = s*5;   
        ellipse(x,y,s,s);
      }
      if(s == 30){
        s==30;
      }
    }
  }
}



