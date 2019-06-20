
var color;


function setup () {
  createCanvas (windowWidth,windowHeight*1.15); 
  colors = ['#F9678D','#FFFFFF','#2452FF'];
} 

function draw () {
  background ('#FC8AA3');

  var percent = norm(sin(frameCount/100), -1, 1);
  var between = lerpColor(color('#FC8AA3'),color('#97E4FF'), percent);
  fill(between);
  noStroke();
  rect(0,0,width,height);

  var n = map(windowWidth,400,2000,1,2);
  textSize(20*n);
  textAlign(CENTER);
  fill(250);
  noStroke();
  text("页面建设中", width/2,height*0.4);

  smooth();
  strokeWeight(5);
  for(var i = 0; i <3; i++) {
    stroke(colors[i]);
    noFill();
    beginShape();
    for(var w = -20; w < width + 20; w += 5) {
      var h = height / 2;
      h += 60 * sin(w * 0.007 + frameCount * 0.05 + i * TWO_PI /3) * pow(abs(sin(w * 0.001 + frameCount * 0.02)),5);
      curveVertex(w, h);
    }    
    endShape();
  }

}