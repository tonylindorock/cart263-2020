/*****************

Title of Project
Yichen Wang

This is a template. You must fill in the title,
author, and this description to match your project!

******************/
let mySquare;
let myCircle;
let myOtherCircle;
let myLine;

function preload() {

}

function setup() {
  createCanvas(windowWidth,windowHeight);
  let squareX = random(0,width);
  let squareY = random(0,width);
  let squareSize = 100;
  mySquare = new Square(squareX,squareY,squareSize);
  myCircle = new Circle(random(0,width),random(0,height),200,color(100,100,200));
  myOtherCircle = new Circle(random(0,width),random(0,height),200,color(200,100,200));
  myLine = new Line(random(0,width),random(0,height),random(0,width),random(0,height));
}
function draw() {
  background(255);
  mySquare.update();
  myCircle.update();
  myOtherCircle.update();
  myLine.update();

  mySquare.display();
  myCircle.display();
  myOtherCircle.display();
  myLine.display();
}
