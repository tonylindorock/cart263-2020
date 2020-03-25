"use strict";

/********************************************************************

Project 3
The Art of Being Artistic
Yichen Wang

FONT FROM: https://www.urbanfonts.com/fonts/superscript.htm
*********************************************************************/

let mainMenuFontHeight;
let mainMenuFontAlpha = 0;

// current state of the program
let state = "START";

// to store font
let themeFont;

const BG_COLOR = "#111";

function preload() {
  themeFont = loadFont("assets/superscript/SUPERSCR.TTF");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(BG_COLOR);
  textFont(themeFont);
  textStyle(BOLD);
  textSize(16);
  textAlign(CENTER,CENTER);
  rectMode(CENTER);
  ellipseMode(CENTER);

  setupMainMenu();
}

function draw() {
  background(BG_COLOR);
  if state === "START"{
    displayMainMenu();
  }
}

function setupMainMenu(){
  mainMenuFontHeight = height;
}

function displayMainMenu() {
  push();
  textSize(64);
  mainMenuFontAlpha = lerp(mainMenuFontAlpha, 255, 0.05);
  mainMenuFontHeight = lerp(mainMenuFontHeight, height/2, 0.05);
  fill(255,mainMenuFontAlpha);
  text("The Art of\nBeing Artistic",width/2,mainMenuFontHeight);
  pop();
}
