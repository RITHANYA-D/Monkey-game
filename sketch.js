//Creating variables
var monkey, monkeyImage;
var banana, bananaImage, bananaGroup;
var stone, stoneImage, stoneGroup;
var ground;
var survivalTime = 0;

function preload() {
  
//Loading images

bananaImage = loadImage("banana.png");  
stoneImage  = loadImage ("obstacle.png");  
monkeyImage = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png");
  
}

function setup() {
  
//Creating the game area
createCanvas(600,500);
  
//Creating monkey
monkey = createSprite(80,315,20,20);
monkey.addAnimation("moving", monkeyImage);
monkey.scale = 0.1;
 
//Creating ground  
ground = createSprite(400,350,900,10);
ground.veloctiyX = -4;
ground.x = ground.width/2;

//Creating new groups  
bananaGroup = new Group(); 
stoneGroup  = new Group();  
  
}

function draw() {
  
//Fxing the background color as white  
background("white");  

//Creating an effect of infinite scrolling ground
if(ground.x < 0) {
ground.x = ground.width/2;  
}

//To make the monkey jump  
if(keyDown("space")){
monkey.velocityY = -12;  
}

//Adding gravity
monkey.velocityY = monkey.velocityY + 0.8;
  
//To make sure that the monkey doesn't fall form the ground
monkey.collide(ground);

if(stoneGroup.isTouching(monkey)){
  
ground.velocityX = 0;  
monkey.velocityY = 0; 
  
stoneGroup.setVelocityXEach(0);
bananaGroup.setVelocityXEach(0);  
  
stoneGroup.setLifetimeEach(-1);
bananaGroup.setLifetimeEach(-1);   
}
  
//To call the below created functions
food();
obstacle();
  
//To draw the sprites
drawSprites(); 
  
//Assigning behaviours for survival time  
stroke("black");
textSize(20); 
fill("black"); 
survivalTime = Math.ceil(frameCount/frameRate())
text("Survival Time : " + survivalTime ,100,50)   
}

//Creating a function for banana
function food() {
if(frameCount % 80 === 0) {
banana = createSprite(600,250,40,10);
banana.velocityX = -5;
banana.lifetime = 300;
banana.addImage(bananaImage);
banana.scale  = 0.05;
banana.y = Math.round(random(120,200)); 
monkey.depth = banana.depth + 1;  
bananaGroup.add(banana);  
}
}

//Creating a function for stone
function obstacle() {
if(frameCount % 300 === 0) {
stone = createSprite(800,320,10,40);
stone.velocityX = -6;
stone.lifetime = 300;
stone.addImage(stoneImage);
stone.scale  = 0.15;
stoneGroup.add(stone);  
}
}