function setup () {
  createCanvas (600,600); 
} 

function draw () {
  background (255);
                     

  
  strokeWeight(10);
  fill(245,15,15); //red
  rect(mouseX, 100, 400, mouseY/2); 
  line(mouseX,0,mouseX,height);
  line(0,100,width,100);
  line(mouseX+400,0,mouseX+400,height);

  fill(250,227,23); //yellow
  push();
  rectMode(RIGHT);
  rect(0,mouseY, mouseX, 300);
  pop();
  
  fill(13,127,190);//blue
  rect(mouseX, mouseY+100,200, mouseY-200);
  
  line(-mouseX,0,-mouseX,height);
  line(0,mouseY,width,mouseY);
  line(mouseX+200,100+mouseY/2,mouseX+200,height);

  strokeWeight(20);
  noFill();
  rect(0,0,width,height);       
  stroke(0);              

}