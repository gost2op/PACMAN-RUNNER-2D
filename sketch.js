var PLAY = 0;
var END = 1;
var gameState = PLAY;
var pacman, pacmanPng,pacmanDed;
var ghost, ghost1, ghost2, ghost3, ghostGrp;
var sky, skyPng;
var coin,coinGrp,coinSound,coinPng;
var score=0;
var ground,title,titlePng,myFont;
var gameOver,restart,gameOverPng,restartPng;

function preload() {
  pacmanPng = loadImage("pacman.png")
  skyPng = loadImage("sky.png")
  ghost1 = loadImage("ghost1.png")
  ghost2 = loadImage("ghost3.png")
  ghost3 = loadImage("ghost4.png")
  titlePng = loadImage("title.png")
  gameOverPng = loadImage("gameover.png")
  restartPng = loadImage("restart.png")
  coinPng = loadImage("coin.png")
  coinSound = loadSound("coin.mp3")
  myFont = loadFont("crackman.ttf")
}

function setup() {
  createCanvas(700,400)

  pacman = createSprite(50, 360, 20, 20)
  pacman.addImage(pacmanPng)
  pacman.scale = 0.18

  sky = createSprite(350, 100, 1000, 100)
  sky.addImage(skyPng)
  sky.scale = 0.9;
  
  ground = createSprite(100,390,1000,10)
  ground.shapeColor = ("black")
  
  gameOver = createSprite(350,200,10,10)
  gameOver.addImage(gameOverPng)
  gameOver.scale = 0.03
  
  restart = createSprite(355,285,10,10)
  restart.addImage(restartPng)
  restart.scale = 0.02
  
  ghostGrp = new Group();
  coinGrp = new Group();
  
  title = createSprite(350,90,100,50)
  title.addImage(titlePng)
  title.scale = 0.1 
  
  gameOver.visible = false;
  restart.visible = false;
  
}

function draw() {
  background("black")
  frameRate(60);
  
  textFont(myFont)
  fill("yellow")
  textSize(25)
  text("SCORE  " + score , 550,50)
  
  ghosts();
  coins();

  pacman.setCollider("rectangle",50,70,105,105)
  
  if(gameState === PLAY ){
    
    if(keyDown("space") && pacman.y > 310 ){
    pacman.velocityY = -8;
  }
  
  pacman.velocityY = pacman.velocityY + 0.5
    
  pacman.collide(ground)
  ghostGrp.collide(ground);
  
  if (ground.x < 0){
      ground.x = ground.width/2;
  }
    
  if(coinGrp.isTouching(pacman)){
    score = score+1
    coinGrp.destroyEach()
    coinSound.play()
  }
  
  if(ghostGrp.collide(pacman)){
    gameState = END;
  }
 }
   else if(gameState === END){
    ghostGrp.destroyEach()
    coinGrp.destroyEach()
    pacman.x = 50
    pacman.y = 360
     
    ghostGrp.lifetime = -1;
    ground.x = 0;
    
    gameOver.visible = true;
    restart.visible = true;
    
  }
 
  if(mousePressedOver(restart)){
    resetGame()
  } 
  
  drawSprites();
}

function ghosts() {
  if (frameCount % 120 === 0) {
    ghost = createSprite(700, 360, 20, 20);
    var rand = Math.round(random(1, 3))
    switch (rand) {
      case 1: ghost.addImage(ghost1);
        break;
      case 2: ghost.addImage(ghost2);
        break;
      case 3: ghost.addImage(ghost3);
        break;
    }
    
    ghost.velocityX = -(6 + 3*score/100);
    ghost.scale = 0.05
    ghost.lifetime = 120;
    
    ghostGrp.add(ghost);
  }
}

function coins(){
  if(frameCount % 150 === 0){
  coin = createSprite(700,300,10,10)
  coin.addImage(coinPng)
  coin.scale = 0.1;
  coin.velocityX = -(6 + 3*score/100);
  coin.lifetime = 120;
  coinGrp.add(coin)
  }
}

function resetGame(){
  gameState = PLAY
  gameOver.visible = false
  restart.visible = false
  score = 0;
  coin.velocityX = -5;
  ghost.velocityX = -4;
}