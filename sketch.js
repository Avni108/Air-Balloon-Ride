var balloon,balloonImage1,balloonImage2;
var database;
var height;

function preload(){
   bg =loadImage("Hot Air Ballon-01.png");
   balloonImage1 = loadAnimation("Hot Air Ballon-02.png");
   balloonImage2 = loadAnimation("Hot Air Ballon-02.png","Hot Air Ballon-02.png",
   "Hot Air Ballon-02.png","Hot Air Ballon-03.png","Hot Air Ballon-03.png",
   "Hot Air Ballon-03.png","Hot Air Ballon-04.png","Hot Air Ballon-04.png","Hot Air Ballon-04.png");
  }

function setup() {
  database = firebase.database();
  createCanvas(1500,700);

  balloon=createSprite(250,650,150,150);
  balloon.addAnimation("Hot Air Ballon",balloonImage2);
  balloon.scale= 0.5;

  var balloonHeight = database.ref('balloon/height');
  balloonHeight.on("value",readHeight, showError);
  textSize(20); 
}

function draw() {
  background(bg);

  if(keyDown(LEFT_ARROW)){
    balloon.x = balloon.x-10;
  }
   if(keyDown(RIGHT_ARROW)){
    balloon.x = balloon.x+10;
  }
   if(keyDown(UP_ARROW)){
    balloon.y = balloon.y-10;
    balloon.scale = balloon.scale - 0.005;
  }
   if(keyDown(DOWN_ARROW)){
    balloon.y = balloon.y+10;
    balloon.scale = balloon.scale + 0.005;
  }

  drawSprites();
  fill(0);
  stroke("white");
  textSize(25);
  text("**Use arrow keys to move Hot Air Balloon!",40,40);
}


function updateHeight(x,y){
  database.ref('balloon/height').set({
    'x': height.x + x ,
    'y': height.y + y
  })
}

function readHeight(data){
  height = data.val();
  console.log(height.x);
  balloon.x = height.x;
  balloon.y = height.y;
}

function showError(){
  console.log("Error in writing to the database");
}