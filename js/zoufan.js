var volhistory = [];
var amp;
var song;
var button;
var data;

var rows;
var emotion =[];
var year =[];
var month =[]; 
var day =[]; 
var hour =[];
var weibo =[];
var negative =[]; 
var d =[];
var targetD =[]; 
var alp =[]; 
var alp2 =[]; 
var posX =[]; 
var posY =[]; 
var x =[]; 
var y =[]; 
var targetY =[]; 
var finalX =[] ;
var count = [] ;
var a1, a2, b1, b2 =0;
var time=[];
var context=[];
var positive = [];
var dMin = 920;
var h;
var speed;


var n = 6;
var pos1 = -100;
var lengendPY ;
var lengendNY;
var pY1, pY2, pY3, pY4;
var a = 0;
var w1 = 2;
var w2 = 4;
var w3 = 6;
var w4 = 4;
var padding;

var bars = [];
var barsAll = [];
var vol;
var tCount =0;
var margin;

var s = 0;
var lt = 0;
var b = 0;
var cAlpha = 0;
var tAlpha1 = -50;
var tAlpha2 = -100;
var tAlpha3 = -250;

function preload() {
  song = loadSound('../web/zoufan/zoufan.mp3');
  data = loadTable("../web/zoufan/data/sentiment_by_hour.csv","header");
}

function setup() {
  createCanvas(windowWidth,windowHeight*0.8);
  frameRate(30);
  rows = data.getRowCount(); 
  speed = song.duration()*30/rows;

  lengendPY  = height/2;
  lengendNY = height/2;
  pY1= height/2; 
  pY2= height/2; 
  pY3= height/2;  
  pY4= height/2;

  if(width <= 450){
    padding = 5;
  }else if(width> 450 && width <= 1000){
    padding = 20;
  }else if(width> 1000&& width <= 1500){
    padding = width*0.1;
  }else if(width> 1500&& width <= 2000){
    padding = width*0.2;
  }else{
    padding = width*0.25;
  }

  margin= 200;
  for (var i = 0; i<rows; i++) {   
    positive[i] = data.getNum(i,"positive");
    year[i] = data.getNum(i, "year");
    month[i] = data.getNum(i, "month");
    day[i] = data.getNum(i, "day");    
    hour[i] = data.getNum(i, "hour");  
    count[i] =data.getNum(i, "count");       
    context[i]= data.getString(i, "context_c");
    weibo[i] = data.getString(i, "weibo");    
    d[i] = 0;
    alp[i] = 0;
    alp2[i] = 255;    
    posX[i] = width-padding;
    posY[i] = height/2;   
    x[i] = map(i, 0, rows, padding, width-padding);
    y[i] = map(positive[i], 0, 1, height*0.97, height*0.89);
    targetY[i] = map(positive[i], 1, 0, height/2 - height*0.25, height/2 + height*0.25); 
    finalX[i] = map(i, 0, rows, 50, width-50);

    var b = new Bar( posX[i], count[i]*2, targetY[i], weibo[i], context[i]);
    bars.push(b);


    var bAll = new Bar( x[i], count[i], y[i], weibo[i], context[i]);
    barsAll.push(bAll);
  } 
}



function draw() {
  background('#f3f3f3');

  if(tCount==0 && s==0){
    scene1();
    if(frameCount >100){
      playButton();
    }
    
  }

  if(s==1){
    legendMotion();
  }

  if(s==2){
    for (var i = bars.length-1; i >= 0; i--) {
      if (i <= tCount/speed ) {
        if( bars[i].x > padding){
          bars[i].display();
          bars[i].update();
          bars[i].text();
        }
        barsAll[i].showAll();   
      }
    }

    infor();
    legend();

    strokeWeight(0.5);
    stroke(100);
    line(padding, height*0.8, width-padding, height*0.8);
    tCount++;
  }
}



function Bar(x,w,targetY,weibo,context){
  this.x = x;
  this.y = height/2;
  this.w = w;
  this.targetY = targetY;
  this.easing = 0.21;
  this.alpha = 255;
  this.weibo = weibo;
  this.context = context;

  this.display = function(){
    if(this.targetY > height/2){
      stroke(48, 58, 93, this.alpha); //negative
    }else{
      stroke(245, 121, 141, this.alpha); //positive
    }
    strokeWeight(this.w);
    line(this.x, height/2, this.x, this.y);
  }


  this.update = function(){
    if(this.x < padding+20){
      this.alpha += ( 0 - this.alpha )*this.easing;
    }
    if(this.x > padding){
      this.x -- ;
    }
    this.y += (this.targetY  - this.y)*this.easing;
  }


  this.showAll = function(){
    if(this.targetY > height*0.93){
      stroke(48, 58, 93, this.alpha); //negative
    }else{
      stroke(245, 121, 141, this.alpha); //positive
    }
    strokeWeight(this.w/2);
    line(this.x, height*0.93, this.x, this.targetY );
  }


  this.text = function(){
    if(this.weibo == 1 && this.x > width*0.7){
      fill(50);
      noStroke();
      textSize(16);
      textAlign(RIGHT);
      text(this.context, width-padding, height*0.8+30);

      fill(color('rgba(0, 0, 0, 0.05)'));
      rectMode(CENTER);
      rect(this.x, height/2, 20, height*0.6);

      fill(color('rgba(0, 0, 0, 0.5)'));
      beginShape();
      vertex(this.x-5, height*0.8);
      vertex(this.x+5, height*0.8);
      vertex(this.x, height*0.8-10);
      endShape();
    }
  }

  this.isFinished = function(){
    if(this.x < padding){
      return true;
    }else{
      return false;
    }
  }

}



function infor(){  
  textAlign(RIGHT); 
  textSize(14);
  noStroke()
  fill(48,58,93, 200)
  rect(width-padding-20,40,20,3);
  text("+微博发布时间段", width-padding-10,  60) ;  
  text("+发布数量", width-padding-10, 110) ;     
  text("+平均情绪值", width-padding-10, 160) ;    

  for (var i=0; i<rows; i++) {  
    if ((tCount/speed) >= i && (tCount/speed) < i +1) {    
      fill(48,58,93); 
      text( year[i]+"/"+month[i]+"/"+day[i] , width-padding-60, 80);   
      text( hour[i]+":00", width-padding-10, 80); 
      text(count[i], width-padding-10, 130);      
      text(nfc((positive[i]-0.5),2), width-padding-10, 180);
    }  
  } 

  if ((tCount/speed) >= rows-1) {  
    fill(48,58,93); 
    text( year[rows-1]+"/"+month[rows-1]+"/"+day[rows-1] , width-padding-80, 80);   
    text( hour[rows-1]+":00", width-padding-10, 80);   
    text(count[rows-1], width-padding-10, 130);     
    text((positive[rows-1]-0.5), width-padding-10, 180);
  }

  fill(245, 121, 141, 200); //positive
  text("积\n极\n情\n绪",width-padding+20,height/2-60);
  fill(48, 58, 93, 150); //negative
  text("消\n极\n情\n绪",width-padding+20,height/2+20);
}



function scene1(){
  textAlign(CENTER);
  textSize(16);
  noStroke();  


  tAlpha1 += (255-tAlpha1)*0.05;
  fill(48,58,93,tAlpha1); 
  text("2012年3月18日，网友@走饭在其微博上留下了自杀遗言。第二天，江宁公安证实，她已自杀身亡。" , width/2,height*0.4);


  tAlpha2 += (255-tAlpha2)*0.01;
  fill(48,58,93,tAlpha2); 
  text("澎湃新闻对@走饭的所有微博（包括小号）进行了文本情感分析，并依次生成了专属于她的“情感乐章”。"  , width/2,height*0.4+40);
  
}



function playButton(){
  if(dist(mouseX,mouseY,width/2,height*0.7)<=40){
    cAlpha += (255-cAlpha)*0.05;
    fill(48,58,93,cAlpha);
    noStroke();
    strokeWeight(1);
    ellipse(width/2,height*0.7,80,80);
    fill("f3f3f3");
    text("查看乐章",width/2, height*0.7+5);
  }else{
    cAlpha = 0;
    stroke(48,58,93,cAlpha);
    noFill();   
    strokeWeight(1);
    ellipse(width/2,height*0.7,80,80);
    tAlpha3 += (255-tAlpha3)*0.05;
    fill(48,58,93,tAlpha3);
    noStroke();
    text("查看乐章",width/2, height*0.7+5);
  }
  stroke(48,58,93);
  noFill();
  var n = map(sin(frameCount/20),1,-1,0,1);
  strokeWeight(1.2-n)
  ellipse(width/2,height*0.7,80+20*n,80+20*n);
}


function mousePressed(){
  if(dist(mouseX,mouseY,width/2,height*0.7)<=40){
    s = 1;  
  }
}


function legend(){
  textAlign(LEFT);
  textSize(14);
  noStroke()
  fill(48,58,93, 200);
  text("粗细为一小时内微博发布数量", padding+ 40, 60) ;     
  text("长度为情绪值（-0.5～0.5 | 消极～积极）", padding+ 40, 90) ;    

  for(var i =0;i<3;i++){
   stroke(48,58,93);
   strokeWeight(i+1);
   line(padding+i*10, 45, padding+i*10,65);
 }

 for(var i =0;i<3;i++){
   stroke(48,58,93);
   strokeWeight(2);
   line(padding+i*10, 95, padding+i*10,85-i*5);
 }
}


function legendMotion(){
   var blue = color(48,58,93); //BLUE
   var pink = color('#f5798d'); //PINK      
   var grey= color(80);  

   stroke(grey); 
   strokeCap(ROUND);  

   if (lt > 100) {
    pY1+= ( height/2-60 - pY1)*0.1;    
    if (lt >= 200) {  
      w1 += (w4 - w1)*0.05;
    } 
    if (lt >= 300) {    
      stroke(pink);
    } 
    strokeWeight(w1);  
    line(width/2-40, height/2, width/2-40, pY1);
  }     

  if (lt >= 300) {    
    strokeWeight(w4);  
    stroke(blue); 
    pY4+= ( height/2+60 - pY4)*0.2;
    line(width/2+40, height/2, width/2+40, pY4);
  } 

  if (lt >0 &&  lt< 300) {
    if (lt >0) {  
      strokeWeight(w2);  
      pY2+= ( height/2-60 - pY2)*0.1; 
    }
    if (lt >= 200) {  
      strokeWeight(w2);  
      pY2+= ( height/2-100 - pY2)*0.1;
    } 
    line(width/2, height/2, width/2, pY2 );
  }

  if (lt >= 100 && lt< 300) { 
    strokeWeight(w3);   
    if (lt >= 100) {
      pY3+= ( height/2-60 - pY3)*0.1;
    } 
    if (lt >= 200) {   
      w3 += (w4 - w3)*0.2;  
      pY3+= ( height/2-120 - pY3)*0.1;
    } 
    line(width/2+40, height/2, width/2+40, pY3);
  }


  stroke('#f3f3f3');
  strokeWeight(15);
  line(width/2-50, height/2, width/2+50, height/2);  

  textAlign(CENTER);  
  textSize(16);
  if ( lt>= 20 &&lt < 100) {    
    fill(48,58,93,220);
    a+=5;
    text("一条柱形代表一个小时内发布的微博情况", width/2, height/2+25);
  }
  if (lt >= 100 && lt < 200) {      
    text("粗细代表一个小时内发布微博的数量", width/2, height/2+25);
  } 

  if (lt>= 200 && lt < 300) {    
    text("长短代表一个小时内微博的平均情绪强度", width/2, height/2+25);
  }   


  if (lt >= 300) {  
    textAlign(LEFT);
    text("积极情绪", width/2-20, height/2-30);    
    textAlign(RIGHT);
    text("消极情绪", width/2+20, height/2+30);
  }


  if(lt<400){
    s = 1;
  }else{
    s = 2;
    song.play();
  }
  lt++;
}