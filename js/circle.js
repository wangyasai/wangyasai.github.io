function Circle( x, y, r,t){
 var options = {
  friction: 0.1,
  restitution: 3
 }

 this.body = Bodies.circle(x,y,r);
 this.r = r;
 World.add(world, this.body);

 this.show = function(){
  var pos = this.body.position;
  var angle = this.body.angle;

  push();
  translate(pos.x, pos.y);
  fill('#3B32C2'); 
  rotate(angle);
  rectMode(CENTER);
  strokeWeight(2.5);
  stroke(20);
  ellipse(0,0,this.r*2);
  stroke(255);
  arc(0, 0, this.r*2*0.85, this.r*2*0.85, -PI/2, -PI/4);
  arc(0, 0, this.r*2*0.85, this.r*2*0.85, -PI/5, -PI/7);
  fill(250);
  noStroke();
  textSize(this.r/3.5);
  textAlign(CENTER);
  text(t,0,5);
  pop();

 }
}