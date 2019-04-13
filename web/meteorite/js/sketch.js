var mapimg;
var fontBold;
var fontRegular;

var clat = 0;
var clon = 0;

var ww = 1024;
var hh = 666;

var zoom = 1;
var data;

var lat = [];
var lon = [];
var mag = [];
var alp = [];

var num1 = 0;
var num2 = 0;
var num3 = 0;
var num4 = 0;
var num5 = 0;

var mag_ = [];

var day = [];
var counts = [];//计算每天发生地震的数量

var barH = [];

var posX = [];
var posX1 = [];
var posX2 = [];
var posY = [];
var posY2 = [];
var loc = [];

var d = [];
var targetD =[];
var temp = 1;
var rows;
var easing = 0.5;
var r = 4;
//button
var button = "a";
var btnY = -666/2+50;
var btn1, btn2, btn3; //按钮
var btnW = 90;
var btnH = 30;
var btn1c = (255,255,255,200);
var btn2c = (255,255,255,40);
var btn1Color = (255,255,255,200);
var btn2Color = (255,255,255,40);
var txt1 = 20;
var txt2 = 255;
var txt1Color = 20;
var txt2Color = 255;
var boxw = 140;
var boxh = 60;

// mapbox://styles/wangyasai0724/cji1e8q2b2sxg2rqm20i149kr
// https://api.mapbox.com/styles/v1/wangyasai0724/0,0,1/1024x666?fresh=true&title=true&access_token=pk.eyJ1Ijoid2FuZ3lhc2FpMDcyNCIsImEiOiJjajAxeTYzMnAwNmc4MzNwM2ZwMjY1dG12In0.q-06SWsxCu0D8TQPAHfjbQ#1.7/12.371257/-3.359555/0

// https://api.mapbox.com/styles/v1/wangyasai0724/cji1e8q2b2sxg2rqm20i149kr.html?fresh=true&title=true&access_token=pk.eyJ1Ijoid2FuZ3lhc2FpMDcyNCIsImEiOiJjajAxeTYzMnAwNmc4MzNwM2ZwMjY1dG12In0.q-06SWsxCu0D8TQPAHfjbQ#1.7/12.371257/-3.359555/0
// https://api.mapbox.com/styles/v1/mapbox/dark-v8/static/0,0,1/1024x666?access_token=pk.eyJ1IjoiY29kaW5ndHJhaW4iLCJhIjoiY2l6MGl4bXhsMDRpNzJxcDh0a2NhNDExbCJ9.awIfnl6ngyHoB3Xztkzarw

function preload() {
  // mapimg = loadImage('https://api.mapbox.com/styles/v1/mapbox/streets-v10/static/url-https%3A%2F%2Fwww.mapbox.com%2Fimg%2Frocket.png(-76.9,38.9)/-76.9,38.9,15/1000x1000?&access_token=pk.eyJ1Ijoid2FuZ3lhc2FpMDcyNCIsImEiOiJjajAxeTYzMnAwNmc4MzNwM2ZwMjY1dG12In0.q-06SWsxCu0D8TQPAHfjbQ#1.12/0/0');
  mapimg = loadImage('https://api.mapbox.com/styles/v1/mapbox/dark-v8/static/' +
    clon + ',' + clat + ',' + zoom + '/' +
    ww + 'x' + hh +
    '?access_token=pk.eyJ1IjoiY29kaW5ndHJhaW4iLCJhIjoiY2l6MGl4bXhsMDRpNzJxcDh0a2NhNDExbCJ9.awIfnl6ngyHoB3Xztkzarw');
  // mapimg = loadImage('https://api.mapbox.com/styles/v1/wangyasai0724/cji1e8q2b2sxg2rqm20i149kr/' +
  //   clon + ',' + clat + ',' + zoom + '/' +
  //   ww + 'x' + hh +
  //   '?fresh=true&title=true?access_token=pk.eyJ1Ijoid2FuZ3lhc2FpMDcyNCIsImEiOiJjajAxeTYzMnAwNmc4MzNwM2ZwMjY1dG12In0.q-06SWsxCu0D8TQPAHfjbQ#1.7/12.371257/-3.359555/0');

  data = loadTable("web/Meteorite/data/world_map.csv","header");
  fontBold = loadFont("web/Meteorite/data/Anton-Regular.ttf");
  fontRegular = loadFont("web/Meteorite/data/NotoSansSC-Medium.otf");
}

function mercX(lon) {
  lon = radians(lon);
  var a = (256 / PI) * pow(2, zoom);
  var b = lon + PI;
  return a * b;
}

function mercY(lat) {
  lat = radians(lat);
  var a = (256 / PI) * pow(2, zoom);
  var b = tan(PI / 4 + lat / 2);
  var c = PI - log(b);
  return a * c;
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  rows = data.getRowCount();
  for (var i = 0; i < rows; i++) {
    lat[i] = data.getNum(i,3);
  
    lon[i] = data.getNum(i,4);  

    mag[i] = data.getNum(i,5);

    day[i] = data.getNum(i,0);
    barH[i] = 0;
    counts[i]= 0;
    d[i] = 0;
    alp[i] = 200;
    if(mag[i]<=10){
      targetD[i] = r;    
    }else if(mag[i]>10 & mag[i] <=100){
      targetD[i] = 2*r;   
    }else if(mag[i]>100 & mag[i] <=1000){
      targetD[i] = 3*r;   
    }else if(mag[i]>1000 & mag[i] <=10000){
      targetD[i] = 4*r;   
    }else if(mag[i]>10000){
      targetD[i] = 5*r;   
    }

    posX[i] = mercX(lon[i]) - mercX(clon);
    posY[i] = mercY(lat[i]) - mercY(clat);

    if( posX[i] < - width/2) {
      posX[i] += width;
    } else if( posX1[i] > width / 2) {
      posX[i] -= width;
    }
    posX1[i] = posX[i];
    posX2[i] = posX[i];
    posY2[i] = posY[i];
  }
  allcounts();

}


function allcounts(){
  //计算同一天发生地震的数量
  for(var j = 0; j<rows; j++){  
    if(day[j] == day[temp]){
      counts[temp]++;
    }else if(day[j] > day[temp]){
      counts[temp]++;
      temp = j;
    }  
  } 

  //计算不同震级的数量
  for(var k = 0; k<rows; k++){
    if(mag[k] <= 10){
      num1++;
      mag_[k] = num1;
      
    }else if(mag[k]>10 && mag[k]<=100){
      num2++;
      mag_[k] = num2;
      
    }else if(mag[k]>100 && mag[k]<=1000){
      num3++;
      mag_[k] = num3;
      
    }else if(mag[k]>1000 && mag[k]<=10000){
      num4++;
      mag_[k] = num4;
      
    }else if(mag[k]>10000 ){
      num5++;
      mag_[k] = num5;    
    }
  }

}


function draw(){  
  fill(44);
  var w = (width-ww)/2;
  noStroke();
  rect(0,0,width,w);
  rect(0,0,w,height);
  rect(width-w,0,w,height);
  rect(0,height-w,width,w);

  translate(width / 2, height / 2);

  imageMode(CENTER);
  image(mapimg, 0, 0);
 
  if (button == "a") {   
    for(var i = 0; i < rows; i++){
      posX2[i] = posX[i];
      posY2[i] = posY[i];
    }
      earthquake();
      drawDays();
  }else if(button == "b") {
    showMag();
  }
}

function earthquake(){
    for (var i = 0; i < rows; i++) {      
        var a = 0;
        var alpha_ =200;
        if(frameCount> i/600){
          d[i] += (targetD[i]-d[i])*0.05;
          alp[i] += ( 0 - alp[i])*0.2;
       
           if(mag[i]<=10){
            fill(255,243,131,alpha_); 
          }else if(mag[i]>10 & mag[i] <=100){
            fill(255,186,155,alpha_);  
          }else if(mag[i]>100 & mag[i] <=1000){
            fill(255,130,100,alpha_);
          }else if(mag[i]>1000 & mag[i] <=10000){
            fill(255,74,84,alpha_);  
          }else if(mag[i]>10000){
            fill(255,18,69,alpha_);  
          }
    
       
          noStroke();
          posX1[i] += (posX[i] - posX1[i])*0.05;
          ellipse(posX1[i], posY[i], d[i], d[i]);  

      
     
          strokeWeight(1);
          noFill();
          if(mag[i]<=10){
            stroke(255,243,131,alp[i]-30);
          }else if(mag[i]>10 & mag[i] <=100){ 
            stroke(255,186,155,alp[i]-30); 
          }else if(mag[i]>100 & mag[i] <=1000){
            stroke(255,130,100,alp[i]-30);
          }else if(mag[i]>1000 & mag[i] <=10000){
            stroke(255,74,84,alp[i]-30);
          }else if(mag[i]>10000){
            stroke(255,18,69,alp[i]-30);
          }
          
          ellipse(posX1[i], posY[i], d[i]/0.1, d[i]/0.1);      
        }  
   }
}

function drawDays(){ 
  var left = -300;
  var right = 300;
  strokeWeight(7);
  strokeCap(SQUARE);
  
  for(var i = 0; i <rows; i++){  
      var x = map(day[i],day[0],day[rows-1],left ,right);
      var h = map(counts[i],0,1000,0,20);
      barH[i] += (h-barH[i]);

      if(frameCount> i/600){
        stroke(255);
        line(x,260,x,260-barH[i]);

      }

  }



}
