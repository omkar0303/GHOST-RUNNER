var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup(){
  createCanvas(600,600);
 // spookySound.play();
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  
   ghost = createSprite(200,200,50,50);
  ghost.addImage("ghost",ghostImg);
  ghost.scale=0.5
  
  doorsGroup = new Group();
  climbersGroup =new Group();
}
function draw(){
  background(0);
  
  
  if (gameState === "play") {
   
    if(tower.y > 400){
      tower.y = 300
    }
    spawnDoors();
     if(keyDown("left")){
   ghost.x=ghost.x-3
  }
     if(keyDown("right")){
   ghost.x=ghost.x+3
  }
  if(keyDown("space")){
   ghost.velocityY=-10 
 
  }
   ghost.velocityY = ghost.velocityY+0.8
  if(climbersGroup.isTouching(ghost)||doorsGroup.isTouching(ghost)||ghost.y>600)
 { gameState="end"
  tower.velocityY=0;
  ghost.destroy();
  climbersGroup.setVelocityEach(0)
  doorsGroup.setVelocityEach(0)
 } 
  
  }
  
  
    drawSprites();

  if (gameState === "end"){
    textSize(30)
    fill("red")
    text("Game Over", 230,250)
    
  }

}

function spawnDoors() {
  //write code here to spawn the doors in the tower
  if (frameCount % 240 === 0) {
    var door = createSprite(200,50);
    var  climber = createSprite(200,100)
    door.x = Math.round(random(120,400));
    climber.x=door.x
    door.addImage(doorImg);
    climber.addImage(climberImg);
    door.velocityY = 1;
    climber.velocityY = 1;
   //assign lifetime to the variable
    door.lifetime = 800;
    climber.lifetime = 800;
    //add each door to the group
    doorsGroup.add(door);
    climbersGroup.add(climber);
  }
}
