
var spacing;
var colorFill = ['#607FD8', '#72C3FA','#CCF2FF',"#ffffff","#ffffff","#ffffff"];
var nums;
var marginT;
var s=0;

function setup(){
  createCanvas(windowWidth,windowHeight);
  nums = map(width,300,2000,10,45);
  spacing = width/int(nums);
  marginT = height*0.2;
}

function draw(){
  background('#ffffff');
  frameRate(1);
  s =random(4);
  if(s>=0 && s <1){
    case1();
  }else if(s>=1 && s < 2){
    case2();
  }else if(s>=2 && s  <3 ){
    case3();
  }else if(s>=3 && s  <4 ){
    case4();
  }else if(s>=4 && s  <5 ){
    case5();
  }else if(s>=5 && s <6){
    case6();
  }
  
  
}

// function mousePressed(){
//   s++;
//   if(s>3){
//     s=0;
//   }
// }

function case1(){
  noStroke();
  for(var y = marginT  ; y < marginT +15*spacing; y+=spacing){
    for(var x = 0; x< width;x+=spacing){
     b = int(random(6));
     if (random(1) <= 0.25) {            
      fill(colorFill[b]);
      triangle(x, y, x+spacing, y, x+spacing, y+spacing);
    }            
    if (random(1) <= 0.5 &&random(1) > 0.25) {  
      fill(colorFill[b]);
      triangle(x, y, x, y+spacing, x+spacing, y+spacing);
    } 
  }
}
}


function case2(){
  for(var y = marginT ; y <marginT +15*spacing; y+=spacing){
    for(var x = 0; x< width;x+=spacing){
     b = int(random(6));           
     fill(colorFill[b]);
     noStroke();
     ellipse(x+spacing/2, y, spacing,spacing);

   }
 }
}

function case3(){
  for(var y = marginT ; y <marginT +15*spacing; y+=spacing){
    for(var x = 0; x< width;x+=spacing){
     b = int(random(6));           
     fill(colorFill[b]);
     noStroke();
     rect(x, y, spacing,spacing/2);

   }
 }
}


function case4(){
  for(var y = marginT ; y <marginT +15*spacing; y+=spacing){
    for(var x = 0; x< width;x+=spacing){
     b = int(random(6));           
     stroke(colorFill[b]);
     strokeWeight(10);
     strokeCap(SQUARE);
     line(x, y, x+spacing,y+spacing);

   }
 }
}



function case5(){
  for(var y = marginT ; y <marginT +15*spacing; y+=spacing){
    for(var x = 0; x< width;x+=spacing){
     b = int(random(6));           
     fill(colorFill[b]);
     noStroke();
     strokeCap(SQUARE); 
     textSize(spacing*0.8);    
     text("❤",x,y);

   }
 }
}


function case6(){
  for(var y = marginT ; y <marginT +16*spacing; y+=spacing){
    for(var x = 0; x< width;x+=spacing){
      b = int(random(6));
      fill(colorFill[1]);
      // noStroke();
      stroke(colorFill[1]);
      var a = int((x/spacing)%2);
      var b = int((y-marginT)/spacing%2);
      if(a== 0 && b==0){
       triangle(x, y, x+spacing, y, x, y+spacing);
     }else if(a==0&&b==1){
       triangle(x, y, x, y+spacing, x+spacing, y+spacing);
     }
     else if(a==1&&b==0){
       triangle(x, y, x+spacing, y, x+spacing, y+spacing);
     } else if(a==1&&b==1){
       triangle(x, y+spacing, x+spacing, y+spacing, x+spacing, y);
     }
     // print(x%spacing%2,(y-marginT)%spacing%2);
   }
 }
}























