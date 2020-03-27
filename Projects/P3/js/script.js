"use strict";
/********************************************************************

Project 3
Questionable Logic
Yichen Wang

A point & click adventrue.

FONT FROM: https://www.urbanfonts.com/fonts/superscript.htm
*********************************************************************/

// the font attributes of title for the animation
let mainMenuFontHeight;
let mainMenuFontAlpha = 0;
let titleFadeAway = false;

let tutorialFontAlpha = 0;
let tutorialFadeAway = false;

let doOnce = true;

// current state of the program
let state = "START";
// the dir the player is facing
let current_Dir = 0;

let $body;

let showTextBox = true;
let textBox;

let inventory;

// to store font
let themeFont;

const TEXT_TUTORIAL = "Hi,"
+"\n\nI know it has been many years since we were"
+"\ntogether, but there's something I need to tell you."
+"\n\nThe Cube is real! I got in! And I escaped!"
+"\nIt was incredible! No one would ever believe me."
+"\nBut I know you will. It's not a MYTH any more."
+"\n\nI'm going in again. Wish me luck."
+"\n\nBest wishes,"
+"\nOliver";

// the color of background
const BG_COLOR = "#111";
// color of highlight
const HIGHLIGHT = "#FF7F50";
const GREEN_BLUE = "#7FFFD4";

function preload() {
  themeFont = loadFont("assets/font/superscript/SUPERSCR.TTF");
}

function setup() {
  $body = $('body');

  createCanvas(windowWidth, windowHeight);
  background(BG_COLOR);
  textFont(themeFont);
  textStyle(BOLD);
  textSize(16);
  textAlign(CENTER,CENTER);
  rectMode(CENTER);
  ellipseMode(CENTER);
  noStroke();

  textBox = new TextBox("What happened? Did I fall asleep? Where am I?");
  inventory = new Inventory();

  setupMainMenu();
}

function setupMainMenu(){
  mainMenuFontHeight = height;
  mainMenuFontAlpha = 0;
}

function draw() {
  background(BG_COLOR);
  if (state === "START"){
    displayMainMenu();
  }else if (state === "TUTORIAL"){
    displayTutorial();
  }else if (state === "PLAY"){
    if(showTextBox){
      textBox.display();
    }
    inventory.display();
  }
}

function displayMainMenu() {
  push();
  textSize(32);
  fill(255,mainMenuFontAlpha);
  text("Special Episode: The Cube",width/2,height-height/8);
  textSize(64);
  if (!titleFadeAway){
    mainMenuFontAlpha = lerp(mainMenuFontAlpha, 255, 0.05);
    mainMenuFontHeight = lerp(mainMenuFontHeight, height/2 - height/8, 0.05);
  }else{
    mainMenuFontAlpha = lerp(mainMenuFontAlpha, 0, 0.05);
    mainMenuFontHeight = lerp(mainMenuFontHeight, height + height/8, 0.03);
  }
  // fill the title
  fill(127,255,212,mainMenuFontAlpha);
  text("Questionable\nLogic",width/2,mainMenuFontHeight);

  if (mainMenuFontAlpha >= 210 && doOnce){
    var $button = $("<div class='button' id = 'title-button'></div>").text("Start").button().click(function(){
      titleFadeAway = true;
      $('#title-button').remove();
    }).hide().fadeIn(500);
    $body.append($button);
    doOnce = false;
  }
  if (titleFadeAway && mainMenuFontAlpha <= 10){
    state = "TUTORIAL"; // to the next state
    doOnce = true; // reset doOnce
  }
  pop();
}

function displayTutorial(){
  push();
  textSize(28);
  textAlign(LEFT);
  if (!tutorialFadeAway){
    tutorialFontAlpha = lerp(tutorialFontAlpha, 255, 0.05);
  }else{
    tutorialFontAlpha = lerp(tutorialFontAlpha, 0, 0.1);
  }
  fill(255,tutorialFontAlpha);
  text(TEXT_TUTORIAL,width/12,height/2);
  if (doOnce){
    var $button = $("<div class='button' id = 'tutorial-button'></div>").text("Next").button().click(function(){
      tutorialFadeAway = true;
      $('#tutorial-button').remove();
    }).hide().fadeIn(500);
    $body.append($button);
    doOnce = false;
  }
  if (tutorialFadeAway && tutorialFontAlpha <= 1){
    state = "PLAY";
    doOnce = true;
  }
  pop();
}

function keyPressed() {
  if (state === "PLAY" && textBox.update){
    textBox.fullText();
  }
}
function mousePressed(){
  if (state === "PLAY" && textBox.update){
    textBox.fullText();
  }
}
