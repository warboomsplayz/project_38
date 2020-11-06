var PLAY = 1;
var END = 0;
var gameState = PLAY;



var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;
var gameOver,isOverImage;
var restart,gameRestart;
var score;


function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
  
  gameRestart = loadImage("restart.png")
  
  isOverImage = loadImage("gameOver.png")
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  
}

function setup() {
  createCanvas(displayWidth,displayHeight);
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided" , trex_collided)
  trex.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  
  
  invisibleGround = createSprite(200,190,ground.width,10);
  invisibleGround.visible = false;
  
  //create Obstacle and Cloud Groups
  obstaclesGroup = createGroup();
  cloudsGroup = createGroup();
  
   restart = createSprite(300,50,50,50);
  restart.addImage ("restarting" , gameRestart)
  restart.scale = 0.3;
  restart.visible = false;
  gameOver = createSprite(300,100,50,50);
  gameOver.addImage ("ending" , isOverImage)
      gameOver.scale = 0.3
  gameOver.visible = false;
   
  trex.setCollider("circle",0,0,40);
  //trex.debug = true
  
  score = 0
}

function draw() {
  background(180);
  //displaying score
  text("Score: "+ score, trex.x+100,30);
  

  
  if(gameState === PLAY){
    //move the ground
    trex.velocityX = 4;
    //scoring
    score = score + Math.round(frameCount/60);
    
    if (trex.x > ground.width/2){
        trex.x = ground.width/4
    }
    
    //jump when the space key is pressed
    if(keyDown("space")&& trex.y >=100) {
        trex.velocityY = -12;
    }
    
    //add gravity
    trex.velocityY = trex.velocityY + 0.8
  
    //spawn the clouds
    spawnClouds();

    spawnObstacles();
    
    if(obstaclesGroup.isTouching(trex)){
        gameState = END;
      trex.changeAnimation ("collided" , trex_collided)
    }
  }
   else if (gameState === END) {

     
     obstaclesGroup.setVelocityXEach(0);
     cloudsGroup.setVelocityXEach(0);
     cloudsGroup.setLifetimeEach (-1);
     obstaclesGroup.setLifetimeEach (-1);
   trex.velocityY = 0
   trex.velocityX = 0 
   restart.visible = true;
   gameOver.visible = true;
   
   }
  
 
  //stop trex from falling down
  trex.collide(invisibleGround);
  camera.position.x = trex.x;
  camera.position.y = trex.y
  
  
  drawSprites();
}

function spawnObstacles(){
 

if (frameCount % 100 === 0){

   var obstacle = createSprite(displayWidth+500,165,100,40);
    obstacle.velocityX = -6;
   
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
   
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 400;
   
   //add each obstacle to the group
    obstaclesGroup.add(obstacle);
 }
}

function spawnClouds() {
  //write code here to spawn the clouds
   if (frameCount % 60 === 0) {
     cloud = createSprite(displayWidth+300,300,40,10);
    cloud.y = Math.round(random(10,60));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 134;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //adding cloud to the group
   cloudsGroup.add(cloud);
    }
}

