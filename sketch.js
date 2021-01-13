var monkey, obstacleGroup, bananaGroup, mAnimation, oAnimation, banAnimation, bacAnimation, score, survivalTime, ground, gameState, end, play, backgr, ground;

function preload(){
  oAnimation = loadImage("stone.png");
  mAnimation = loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");
  banAnimation = loadImage("banana.png");
  bacAnimation = loadImage("jungle.jpg")
}

function setup() {
  createCanvas(600, 400);
  play = 1;
  end = 0;
  gameState = play;
  survivalTime = 0;
  obstacleGroup = Group();
  bananaGroup = Group();
  monkey = createSprite(70, 280, 20, 20);
  monkey.addAnimation("mAnim", mAnimation);
  monkey.scale = 0.15;
  ground = createSprite(400, 350, 800, 10);
  ground.x = ground.width / 2;
  ground.visible = false;
  score = 0;
  //stroke("black");
  textSize(20);
  fill("white");
  //backgr = createSprite();
}
function food(){
  if(frameCount % 80 == 0){
    var banana = createSprite(400, random(120, 200), 15, 15);
    banana.addImage("banam", banAnimation);
    banana.scale = 0.05;
    banana.velocityX = -5;
    banana.lifetime = 100;
    bananaGroup.add(banana);
  }
}
function obstacles(){
  if(frameCount % 200 == 0){
    var obstacle = createSprite(400, 330, 20, 20);
    obstacle.addAnimation("oAnim", oAnimation);
    obstacle.scale = 0.15;
    obstacle.velocityX = -7
    obstacleGroup.add(obstacle);    
  }
}
function reset(){
  ground.velocityX = -4;
  obstacleGroup.destroyEach();
  bananaGroup.destroyEach();
  gameState = play;
  survivalTime = 0;
  monkey.changeAnimation("mAnim", mAnimation);
  monkey.scale = 0.15;
  score = 0;
}
function draw() {
  background(bacAnimation);
  drawSprites();
  
  monkey.collide(ground);
  
  if(gameState == play){
    if(keyWentDown("space") && monkey.y <  303 && monkey.y > 298) {
      monkey.velocityY = -18;
    } 
    
    if(ground.x < 0){
        ground.x = ground.width/2;
    }
    switch(score){
        case 10: monkey.scale = 0.18;
          break;
        case 20: monkey.scale = 0.21;
          break;
        case 30: monkey.scale = 0.24;
          break;
        case 40: monkey.scale = 0.27;
          break;
        default: break;
        
    }
    monkey.velocityY += 1;
    food();
    obstacles();
    survivalTime += 1;
    text("Survival time = "+survivalTime, 260, 50);
    if(monkey.isTouching(bananaGroup)){
      score += 2;
      bananaGroup.destroyEach();
    }
    if(monkey.isTouching(obstacleGroup)){
      gameState = end;
    }
  }
  else if(gameState == end){
    ground.velocityX = 0;
    monkey.velocityY = 0;
    obstacleGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
    if(keyDown("r")){
      reset();
    }
    
    text("GAME OVER", 220, 160);
    text("Press R to restart", 210, 180);
  }
  text("Score: "+score, 500, 50);
}