/*****************

Title of Project
Yichen Wang

This is a template. You must fill in the title,
author, and this description to match your project!

******************/

let player = {
  posX: 0,
  posY: 0,
  maxSize: 50,
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
  if (!player.dead){
    displayFood();
    displayPlayer();
    updatePlayerSize();

    playing();
  }
}

function playing(){
  let d = dist(mouseX,mouseY,food.posX,food.posY);
  if (d < player.currentSize/2 + food.size/2){
    player.currentSize += 20;
    player.currentSize = constrain(player.currentSize,0,player.maxSize);
    setupFood();
  }
  if (player.currentSize <= 0){
    player.dead = true;
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
    player.currentSize = constrain(player.currentSize,0,player.maxSize);
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
