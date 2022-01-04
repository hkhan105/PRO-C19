var path,Car,gas,wrench,coin,nail;
var pathImg,CarImg,wrenchImg,coinImg,gasImg,nailImg;
var scoreCollection = 0;
var gasG,wrenchG,coinG,nailGroup;
var gameOver, endImg


var PLAY=1;
var END=0;
var gameState=1;

function preload(){
  pathImg = loadImage("Road.png");
  CarImg = loadAnimation("Car.png");
  gasImg = loadImage("gas.png");
  wrenchImg = loadImage("wrench.png");
  coinImg = loadImage("coin.png");
  nailImg = loadImage("nail.png");
  endImg =loadImage("gameOver.png");
}

function setup(){

createCanvas(windowWidth,windowHeight);

path=createSprite(width/2,200);
path.addImage(pathImg);
path.velocityY = 4;



Car = createSprite(width/2,height/2+150,20,20);
Car.addAnimation("Car", CarImg);
Car.scale = 0.5;


  
gasG=new Group();
wrenchG=new Group();
coinG=new Group();
nailGroup=new Group();

}

function draw() {

  if(gameState===PLAY){
  background(0);
  Car.x = World.mouseX;
  
  edges= createEdgeSprites();
  Car.collide(edges);
  

  if(path.y > height ){
     path.y = height/2;
   }
  
    creategas();
    createwrench();
    createcoin();
    createnail();

    if (gasG.isTouching(Car)) {
      gasG.destroyEach();
      scoreCollection=scoreCollection + 50;
    }
    else if (wrenchG.isTouching(Car)) {
      wrenchG.destroyEach();
      gameState=END;
      
    }else if(coinG.isTouching(Car)) {
      coinG.destroyEach();
      scoreCollection= scoreCollection + 150;
      
    }else{
      if(nailGroup.isTouching(Car)) {
        gameState=END;
        
        Car.addAnimation("Car.png",endImg);
        Car.x=width/2;
        Car.y=height/2;
        Car.scale=0.6;
        
        gasG.destroyEach();
        wrenchG.destroyEach();
        coinG.destroyEach();
        nailGroup.destroyEach();
        
        gasG.setVelocityYEach(0);
        wrenchG.setVelocityYEach(0);
        coinG.setVelocityYEach(0);
        nailGroup.setVelocityYEach(0);


        gameOver = createSprite(width/2, height/2)
        gameOver.addImage("gameOver", endImg);
  
     
    }
  }
  
  drawSprites();
  textSize(20);
  fill(255);
  text("Score: "+ scoreCollection,width-150,30);
  }

}

function creategas() {
  if (World.frameCount % 200 == 0) {
  var gas = createSprite(Math.round(random(50, width-50),40, 10, 10));
  gas.addImage(gasImg);
  gas.scale=0.2;
  gas.velocityY = 5;
  gas.lifetime = 200;
  gasG.add(gas);
  }
}

function createwrench() {
  if (World.frameCount % 320 == 0) {
  var wrench = createSprite(Math.round(random(50, width-50),40, 10, 10));
  wrench.addImage(wrenchImg);
  wrench.scale=0.1;
  wrench.velocityY = 5;
  wrench.lifetime = 200;
  wrenchG.add(wrench);
}
}

function createcoin() {
  if (World.frameCount % 410 == 0) {
  var coin = createSprite(Math.round(random(50, width-50),40, 10, 10));
  coin.addImage(coinImg);
  coin.scale=0.2;
  coin.velocityY = 5;
  coin.lifetime = 200;
  coinG.add(coin);
  }
}

function createnail(){
  if (World.frameCount % 530 == 0) {
  var nail = createSprite(Math.round(random(50, width-50),40, 10, 10));
  nail.addImage(nailImg);
  nail.scale=0.2;
  nail.velocityY = 4;
  nail.lifetime = 200;
  nailGroup.add(nail);
  }
}

