
var rows;
var cols;
var data17,data8,data19;
var posX = [];
var y17 = [];
var y18 = [];
var y19 = [];
var posY = [];
var sum17 = [];
var sum18 = [];
var sum19 = [];
var avg17 = [];
var avg18 = [];
var avg19 = [];
var left,right,above,bottom;
var s;
let fireworks17 = [];
let fireworks18 = [];
let fireworks19 = [];
let r = [];
let oneFirework;
let firework17;
let firework18;

var time;
var s;
var a = 0;
var alpha = 255;

var alpha = [];
var viewW,viewH;

var policy =["升级为禁放","升级为禁放","扩大禁放范围","维持禁放","升级到或维持禁放","无禁限措施"];
var policyS = [1,1,12,21,34,43];
var policyE = [11,11,20,33,42,50];

var rank = -1;
var index = 1;
//中转值
var temp17 = [];
var temp18 = [];
var temp19 = [];
var btW = 45;
var btH = 20;

var targetX17 = [];
var targetX18 = [];
var targetX19 = [];

var startLx =[];
var lx =[];
var targetLx = [];
var alpha18,alpha17 = 255;


var hlcolor = (255,0,74);
var unhlcolor = (220);

var hltxt = 250;
var unhltxt = 100;



var txtBlack  = 20;
var txtWhite = 255;
var nullColor = 33;
var yellowColor = '#FFDE55';
var redColor ='#FE5269';
var goldColor = '#F2D5AB';

var btnYear17 = '#FE5269';
var btnYear18 = '#FFDE55';
var btnRankAll = '#F2D5AB';
var btnRank17 = nullColor;
var btnRank18 = nullColor;
var btnCompare = nullColor;



var txtYear17 = txtBlack;
var txtYear18 = txtBlack;
var txtRankAll = txtBlack;
var txtRank17 = txtWhite;
var txtRank18 = txtWhite;
var txtCompare = txtWhite;


var button = "a";
var btnY = 80;
var btn1, btn2, btn3; //按钮
var btnW = 60;
var btnH = 30;

var count17 = 1;
var count18 = 1;

var logo,legend;

function preload(){
  data17 = loadTable("web/firework/data/2017.csv", 'csv');
  data18 = loadTable("web/firework/data/2018.csv", 'csv');
  data19 = loadTable("web/firework/data/2019.csv", 'csv');
  logo = loadImage("web/firework/images/logo.png","png");
  legend = loadImage("web/firework/images/legend.jpg","jpg");
}


function setup(){
  if(windowWidth<750){
    viewH = windowHeight;
    viewW = viewH*16/9;
  }else{
    viewH = windowHeight;
    viewW = windowWidth;
  }
  createCanvas(viewW,viewH);
  rows = data17.getRowCount();
  cols = data17.getColumnCount();

  if(windowWidth > 1000){
    left = width*0.1;
    right = width*0.9;
  }else{
    left = width*0.1;
    right = width*0.9;
  }
  above = height*0.2;
  bottom = height*0.8;



  for(var i = 1 ; i < 6;i++){
    startLx[i] = map(policyS[i]+1, 1, 50, left, right);
    targetLx[i]= map(policyE[i]+1, 1, 50, left, right);
    lx[i] = startLx[i];
  }


  for(var j = 1; j < cols; j++){
    sum17[j] = 0;
    sum18[j] = 0;   
    sum19[j] = 0;
    r[j]=[];

    for(var i = 3; i < rows; i++){
      sum17[j] += data17.getNum(i,j);
      sum18[j] += data18.getNum(i,j);
      sum19[j] += data19.getNum(i,j);
      r[j][i]= 0;
    }

    avg17[j] = sum17[j]/24;
    avg18[j] = sum18[j]/24;
    avg19[j] = sum19[j]/24;
    posX[j] = map(int((j+1)), 1, 50, left, right);
    y17[j] = map(avg17[j], 0, 200, bottom, above);  
    y18[j] = map(avg18[j], 0, 200, bottom, above); 
    y19[j] = map(avg19[j], 0, 200, bottom, above);   
    posY[j] = bottom;
    alpha[j] = 255;

    temp17[j] = avg17[j];
    temp18[j] = avg18[j];
    temp19[j] = avg18[j];
    targetX17[j] = posX[j];
    targetX18[j] = posX[j];
    targetX19[j] = posX[j];
    fireworks17[j] = new Firework(posX[j],posY[j], targetX17[j],y17[j]);
    fireworks18[j] = new Firework(posX[j],posY[j], targetX18[j],y18[j]);
    fireworks19[j] = new Firework(posX[j],posY[j], targetX19[j],y19[j]);

  }
  oneFirework = new Firework(width/2, bottom-50,width/2,y17[1]);
  firework18 = new Firework(width/2,  bottom-50,width/2,y18[1]+100);

  selection(temp17, rank);
  selection(temp18, rank);
  selection(temp19, rank);
}



function draw(){ 
  background(33);  
  
  if(a==0){
    push();
    if(windowWidth < 750){
      translate(-width/3,0);
    }
    intro();
    pop();
  }

  if(a==1){ 
    drawBtn(btnY) ;
    fireworkStart();
    image(logo,right-55,90,120,25);
    
    fill(180);
    ellipse(left-20,100,25,25);
    imageMode(RIGHT);

    fill(33);
    textSize(20);
    textAlign(CENTER);
    text("?",left-20,100);

    fill(120);
    textAlign(LEFT);
    textSize(14);
    noStroke();
    text("数据来源：全国城市空气质量实时发布平台",left+20,bottom+110);
    text("注：由于烟花爆竹燃烧影响的主要是PM2.5，而CO（一氧化碳）受烟花燃烧的影响非常小，因此PM2.5与CO的比值可以排除气象因素的影响。",left+20,bottom+130);
    if(dist(mouseX,mouseY,left-20,90)<=20 ){
      fill(33,220);
      rect(0,0,width,height);
      imageMode(CENTER);
      image(legend,width/2,height/2,400,600);
      noFill();
      stroke(255);
      rectMode(CENTER);
      rect(width/2,height/2,400,600);
    }

  }  


}


function drawBtn(btnY) {
  rectMode(CORNER);
  strokeCap(ROUND);
  noStroke();
  fill(255);
  textAlign(RIGHT);
  textSize(16);
  text("显示年份",width/2-5*btnW-4,btnY+btH-5);
  text("排序",width/2-2*btnW-4,btnY+btH-5);
  stroke(220);
  strokeWeight(1);

  fill(btnYear17);
  rect(width/2-5*btnW, btnY, btnW, btnH);
  fill(btnYear18);
  rect(width/2-4*btnW, btnY, btnW, btnH);

  fill(btnRankAll);
  rect(width/2-2*btnW, btnY, btnW, btnH);
  fill(btnRank17);
  rect(width/2-1*btnW, btnY, btnW, btnH);
  fill(btnRank18);
  rect(width/2,btnY, btnW, btnH);

  fill(btnCompare);
  rect(width/2+2*btnW, btnY, btnW, btnH);

  noStroke();
  textAlign(CENTER, CENTER);
  textSize(14);

  fill(txtYear17);
  text("2017", width/2-5*btnW, btnY, btnW, btnH);

  fill(txtYear18);
  text("2018", width/2-4*btnW, btnY, btnW, btnH);

  fill(txtRankAll);
  text("政策", width/2-2*btnW, btnY, btnW, btnH);

  fill(txtRank17);
  text("2017", width/2-1*btnW, btnY, btnW, btnH);

  fill(txtRank18);
  text("2018", width/2, btnY, btnW, btnH);

  fill(txtCompare);
  text("对比", width/2+2*btnW, btnY, btnW, btnH);
}

function mousePressed() {
 if(a==0){
  s = frameCount; 
}
a =1; 
if (mouseX > width/2-2*btnW && mouseX< width/2-1*btnW && mouseY > btnY && mouseY< btnY + btnH) {
  button = "a";
  count17 = 1;
  count18 = 1;
  btnYear17 = redColor;
  btnYear18 = yellowColor;
  btnRank17 = nullColor;
  btnRank18 = nullColor;
  btnRankAll = goldColor;
  btnCompare = nullColor;

  txtRankAll = txtBlack;
  txtYear17 = txtBlack;
  txtYear18 = txtBlack; 
  txtRank17 = txtWhite;
  txtRank18 = txtWhite;
  txtCompare = txtWhite;
} else if (mouseX > width/2-1*btnW && mouseX < width/2&&mouseY> btnY && mouseY < btnY + btnH) {
  button = "b";
  count17 = 0;
  btnRank17 = redColor;
  btnRank18 = nullColor;
  btnRankAll = nullColor;
  btnYear17 = redColor;
  btnYear18 = nullColor;
  btnCompare = nullColor;

  txtYear17 = txtBlack;
  txtYear18 = txtWhite;
  txtRankAll = txtWhite;
  txtRank17 = txtBlack;
  txtRank18 = txtWhite;
  txtCompare = txtWhite;
} else if (mouseX > width/2&& mouseX < width/2+btnW&&mouseY> btnY && mouseY < btnY + btnH) {
  button = "c";
  count18=0;
  btnRank17 = nullColor;
  btnRank18 = yellowColor;
  btnRankAll = nullColor;
  btnYear17 = nullColor;
  btnYear18 = yellowColor;
  btnCompare = nullColor;


  txtYear18 = txtBlack;
  txtYear17 = txtWhite;
  txtRankAll = txtWhite;
  txtRank17 = txtWhite;
  txtRank18 = txtBlack;
  txtCompare = txtWhite;
} else if (mouseX > width/2+2*btnW && mouseX < width/2+3*btnW&&mouseY> btnY && mouseY < btnY + btnH) {
  button = "d";
  count17=0;
  count18=0;
  btnRank17 = nullColor;
  btnRank18 = nullColor;
  btnRankAll = nullColor;
  btnYear17 = nullColor;
  btnYear18 = nullColor;
  btnCompare = goldColor;

  txtYear17 = txtWhite;
  txtYear18 = txtWhite;
  txtRankAll = txtWhite;
  txtRank17 = txtWhite;
  txtRank18 = txtWhite;
  txtCompare = txtBlack;

} 

if (mouseX > width/2-5*btnW && mouseX < width/2-4*btnW&&mouseY> btnY && mouseY < btnY + btnH && button == "a") {
  count17++;
  if(count17%2==0){
    btnYear17 = nullColor;
    txtYear17 = txtWhite;
  }else{
    btnYear17 = redColor;
    txtYear17 = txtBlack;
  }
}else if (mouseX > width/2-4*btnW && mouseX < width/2-3*btnW&&mouseY> btnY && mouseY < btnY + btnH && button == "a") {
  count18++;
  if(count18%2==0){
   btnYear18 = nullColor;
   txtYear18 = txtWhite;
 }else{
   btnYear18 = yellowColor;
   txtYear18 = txtBlack;
 }
}
}






function intro(){
  oneFirework.colLines(1);
  var angle = map(frameCount,100,150,PI*1.5,PI*3.5);
  noFill();
  stroke(255);
  strokeWeight(1);

  if(frameCount>60 && frameCount<=90){ 
    arc(width/2, height/3+60,120,120,PI*1.5,angle); 
  }else if(frameCount>=90){
    ellipse(width/2, height/3+60,120,120); 
  }


  fill(255);
  textSize(16);
  textAlign(CENTER);
  text("每一根柱子代表每个时间段PM2.5/CO的值",width/2,above);
  noFill();
  stroke(255);
  strokeWeight(1);
  rect(width/2 -180, above-25,360,35);

  fill(255);  
  noStroke();
  textSize(12);
  var rr = 90;


  if(frameCount>60){
    text("除夕中午12点",width/2,height/3+60-rr);
  }
  if(frameCount>70){
    text("除夕下午6点",width/2+rr*1.3,height/3+60+5);
  }
  if(frameCount>80){
    text("大年初一0点",width/2,height/3+60+rr);
  }
  if(frameCount>90){
    line(width/2+rr+0,height/3,width/2+rr-10,height/3+60);
    text("大年初一中午12点",width/2-rr*1.4,height/3+5+60);
  }

  for(var i =0; i<4; i++){
    if(frameCount>60+i*10){
      push();
      translate(width/2,height/3+60);
      rotate(PI+i*PI/2);
      stroke(255);
      strokeWeight(1);
      line(0,60,0,70);
      pop();
    }
  }

  oneFirework.display(1,data17);
  oneFirework.move();
  oneFirework.city(1);

  if(frameCount>100){

    firework18.display(2,data18);
    firework18.move();
    fill(255,222,85);
    text("2018年数据",width/2+100,y18[2]);
    fill(254,82,105);
    text("2017年数据",width/2+100,y18[2]-40);

  }

  if(frameCount>150){
    fill(255,510*sin(frameCount/10));
    text("点击屏幕看城市烟花秀",width/2,height*0.7);
  }    
}


function fireworkStart(){
  time = frameCount-s;

  //dot line
  for(var j = 1; j < cols; j++){
    if(j <= time){
      fireworks17[j].colLines(j);
      fireworks18[j].colLines(j);
    }
  } 
  

  if(time>0){ 
    for(var i = 0 ; i < 5; i++){
      var lineY = map(i, 0, 4,bottom, above);
      for(var j = left-40; j < right+40; j+=10){
       stroke(100);
       strokeWeight(1);
       line(j,lineY,j+5,lineY);
     }
     textAlign(RIGHT);
     textSize(14);
     fill(255);
     noStroke();
     text(50*i,left-40,lineY);
   }

   var lengends = "春节零点前后十二小时的PM2.5/CO的均值";
   for (var i = 0; i < lengends.length; i++) { 
    push();
    translate(left-85,lineY+15*i);
    rotate(PI/2);
    text(lengends.charAt(i), 0,0);
    pop();
  }
}

    //fireworks
    for(var j = 1; j < cols; j++){
      if(j<= time){ 
        fireworks17[j].move();
        fireworks17[j].display(j,data17);   
        fireworks17[j].city(j);
        fireworks17[j].infor(j,avg17,data17);   
        fireworks18[j].move();
        fireworks18[j].display(j,data18);   
        fireworks18[j].infor(j,avg18,data18);   
      } 
    }
  }

  function policies(){ 
    for(var i = 1; i<6;i++){

      if(policyS[i]<= time){ 
        lx[i] += (targetLx[i]-lx[i])*0.09;
        stroke(241,214,171);
        strokeWeight(3);
        strokeCap(SQUARE);
        line(startLx[i],bottom, lx[i],bottom);

        fill(241,214,171);
        noStroke();
        textAlign(CENTER);
        text(policy[i],(targetLx[i]-startLx[i])/2+startLx[i],bottom-10)
      }
    }
  }

  class Firework{
    constructor(posX,posY,targetX,targetY) {
      this.x = posX;
      this.y = posY;
      this.tY = targetY;
      this.tX = targetX;
      this.easing = 0.09;
      this.w = 80;
      this.r = 0; 
    }


    display(j,data){  
      for(var i = 3; i < rows; i++ ){
        push();
        translate(this.x,this.y);     
        noStroke();

        var n ;
        rotate(-PI-TWO_PI/24*(i-2));  
        if(width>1000){
          n = 1.9;
        }else{
          n = 3;
        }

        r[j][i]+= (data.getNum(i,j)/n-r[j][i])*this.easing;
        this.r = r[j][i];
        var n_ = map(width,0,2000,0,5);
        var offset = map(data.getNum(i,j),0,300,0,n_);
        if (data.getNum(1,j)==2018) {
        fill(255,222,85,alpha18);//黄色 2018
      } else if (data.getNum(1,j)==2017){
        fill(254,82,105,alpha17);//红色 2017
      }

      noStroke();
      if(time>j && a==1){
        beginShape();
        vertex(0,0);
        vertex(-offset ,this.r/n);
        vertex( offset ,this.r/n);
        endShape(CLOSE);
        arc(0,this.r/n,offset*2,offset*2,PI*2,PI*3);
      }else if(frameCount >60+ (24-i) && a==0){
        beginShape();
        vertex(0,0);
        vertex(-offset ,this.r/n);
        vertex( offset ,this.r/n);
        endShape(CLOSE);
        arc(0,this.r/n,offset*2,offset*2,PI*2,PI*3);
      }

      pop();        
    }    
  }


  move(){
    this.y += (this.tY - this.y)*this.easing;
    this.x += (this.tX - this.x)*this.easing;
  }

  //city name
  city(j){
    fill(220);
    noStroke();
    var n_;
    if(width>1000){
      n_= 16;
    }else{
      n_ = 12;
    }
    textSize(n_);
    textAlign(CENTER);
    for (var i = 0; i < data17.getString(0, j).length; i++) { 
      text(data17.getString(0, j).charAt(i), this.x, bottom+25+(n_+3)*i);
    }
  }


  // city connect firework 
  colLines(){
    stroke(100);
    strokeWeight(1);
    for(var i = bottom ; i >this.y ; i-=10){
      line(this.x,i,this.x,i-5);
    }
  }


  //show 2017 / 2018  width*0.75+i*(btW+btH*1.2),above/2 + j*(btH+10)
  infor(j,avg,data){


   if(button == "d"){ 
     count17 = 0;
     count18 = 0;

     alpha18 = 50;
     alpha17 = 50;

      if(y17[j]<y18[j]){ //17年小于18年
        fill(255);  
        var r_ = map(windowWidth,0,2000,0,4);
        var offset = map(y18[j]-y17[j],0,100,0,r_);     
        beginShape();
        vertex(this.x,y17[j]);
        vertex(this.x-offset,y18[j]);
        vertex(this.x+offset,y18[j]);
        endShape(CLOSE);
        arc(this.x,y18[j],offset*2,offset*2,PI*2,PI*3);
      }else{//18年小于17年
        fill(255);
        var r_ = map(windowWidth,0,2000,0,4);
        var offset = map(y18[j]-y17[j],0,100,0,r_);  
        beginShape();
        vertex(this.x,y17[j]);
        vertex(this.x-offset,y18[j]);
        vertex(this.x+offset,y18[j]);
        endShape(CLOSE);
        arc(this.x,y18[j],offset*2,offset*2,PI,PI*2);
      }
    } 

    if(button == "b"){    
      alpha17 = 255;  
      alpha18 =50;
      this.tX = map(int((temp17[j]+52)), 1, 50, left, right);
    }else if(button == "c"){    
      alpha18 = 255;  
      alpha17 = 50;  
      this.tX = map(int((temp18[j]+52)), 1, 50, left, right);
    }else if(button == "a"){ 
      this.tX = map(int(j+1), 1, 50, left, right);
      if(count17%2==1 && count18%2 == 0){       
       alpha18 = 50;
       alpha17 = 255;
     }else if(count18%2==1 && count17%2 == 0){     
       alpha18 = 255; 
       alpha17 = 50; 
     }else if(count18%2==1 && count17%2==1){
       alpha18 = 255;
       alpha17 = 255;
     }else if(count18%2==0 && count17%2==0){
       alpha18 = 50;
       alpha17 = 50;
     }

     if(j==1){
       policies();
     }
   }

   if(dist(mouseX,mouseY,this.x,this.y)<10){
    fill(255);
    textSize(15);
    text(nfc(avg[j],2),this.x,this.y);
  }
}
}



//排序，但不变化位置
function selection(tempX, rankX){
  for(var i = 1; i < cols; i++){
    var record = -1;
    var selectedBar = index;

    for(var j = selectedBar; j < cols; j++){
      if( tempX[j] > record ){
        selectedBar = j;
        record = tempX[j];
      }
    }
    tempX[selectedBar] = rankX;//afRank 没有变化位置，只是把value变成rank的值
    rankX--;
  }
}









