/*****************

Title of Project
Yichen Wang

This is a template. You must fill in the title,
author, and this description to match your project!

******************/

let start = false;
let score = 0;

let player = {
  posX: 0,
  posY: 0,
  MAX_SIZE: 50,
  currentSize: 50,
  dead: false
};

let food = {
  posX: 0,
  posY: 0,
  size: 65
};

function preload() {

}

function setup() {
  createCanvas(windowWidth,windowHeight);
  background("#262626");
  noCursor();

  setupFood();
}

function setupFood(){
  food.posX = random(0,windowWidth);
  food.posY = random(0,windowHeight);
}

function draw() {
  background("#262626");
  if (start){
    if (!player.dead){
      displayFood();
      displayPlayer();
      updatePlayerSize();

      playing();
    }
  }else{
    displayPlayer();
    displayStartMenu();
  }
  displayScore();
}

function playing(){
  let d = dist(mouseX,mouseY,food.posX,food.posY);
  if (d < player.currentSize/2 + food.size/2){
    player.currentSize += 20;
    player.currentSize = constrain(player.currentSize,0,player.MAX_SIZE);
    setupFood();

    score ++;
  }
  if (player.currentSize <= 0){
    player.dead = true;
    start = false;
    resetPlayer();
  }
}

function displayPlayer(){
  push();
  ellipseMode(CENTER);
  noStroke();
  fill(255);
  player.posX = mouseX;
  player.posY = mouseY;
  ellipse(player.posX, player.posY, player.currentSize);
  pop();
}

function updatePlayerSize(){
  if (player.currentSize > 0){
    player.currentSize -= 0.45;
    player.currentSize = constrain(player.currentSize,0,player.MAX_SIZE);
  }
}

function displayFood(){
  push();
  ellipseMode(CENTER);
  noStroke();
  fill(0,255,0);
  ellipse(food.posX, food.posY, food.size);
  pop();
}

function displayScore(){
  push();
  fill(255);
  textSize(64);
  textStyle(BOLD);
  textAlign(CENTER,CENTER);
  text(score, windowWidth/2,75);
  pop();
}

function displayStartMenu(){
  push();
  fill(255);
  textSize(64);
  textStyle(BOLD);
  textAlign(CENTER,CENTER);
  text("CLICK TO PLAY!", windowWidth/2,windowHeight/2);
  pop();
  if (mouseIsPressed){
    resetPlayer();
    start = true;
    score = 0;
  }
}

function resetPlayer(){
  player.currentSize = player.MAX_SIZE;
  player.dead = false;
}
