function Circle( x, y, w,h,img){
  var options = {
    friction: 0.8,//摩擦力
    restitution: 5,//弹性
    isStatic: true
  }

  this.body = Bodies.rectangle(x,y,w,h);
  this.w = w;
  this.h = h;
  World.add(world, this.body);

  this.show = function(){
    var pos = this.body.position;
    var angle = this.body.angle;

    push();
    translate(pos.x, pos.y);

    rotate(angle);
    imageMode(CENTER);

    image(img,0,0,this.w*1.11,this.h*1.11);

    pop();

  }
}