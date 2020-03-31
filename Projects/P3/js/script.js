"use strict";
/********************************************************************

Project 3
Questionable Logic: The Cube
Yichen Wang

A point & click adventrue.

FONT FROM: https://www.urbanfonts.com/fonts/superscript.htm
*********************************************************************/

// the font attributes of title for the animation
let mainMenuFontHeight;
let mainMenuFontAlpha = 0;
let titleFadeAway = false;

// tutorial text animation attributes
let tutorialFontAlpha = 0;
let tutorialFadeAway = false;

let doOnce = true; // do only once

// current state of the program
let state = "START";
// the direction the player is facing
let currentDir = 0;

let $body; // store the html body

// text box
let showTextBox = true;
let textBox; // store the obj

// text box
let inventory; // store the obj

// background manager
let gameBackground; // store the obj

const TEXT_TUTORIAL = "Hi,"
+"\n\nI know it has been many years since we departed,"
+"\nbut there's something I need to tell you."
+"\n\nThe Cube is real! I got in! And I escaped!"
+"\nIt was incredible! No one would ever believe me."
+"\nBut I know you will. It's not a MYTH any more."
+"\n\nI'm going in again. Wish me luck."
+"\n\nBest wishes,"
+"\nOliver";

const BG_COLOR = "#262626"; // the color of background

// colors
const HIGHLIGHT = "#FF7F50";
const GREEN_BLUE = "#7FFFD4";

// * game assests * //
let THEME_FONT; // store the font
// backgrounds
let BG_MM;
let BG_FRONT;
let BG_LEFT;
let BG_RIGHT;
let BG_BACK;
let BG_DOWN;
let BG_UP;
let bgArray;
// objs appear in the bgs
let OBJ_BOOKLET;
let OBJ_CABIN_BOTTOM_OUT;
let OBJ_CABIN_LEFT_OUT;
let OBJ_CABIN_RIGHT_OUT;
let OBJ_DRAWER_LEFT_OUT;
let OBJ_DRAWER_RIGHT_OUT;
let OBJ_PANEL;
let OBJ_PANEL_OPENED;
let OBJ_PLANT;
let OBJ_PLANT_MOVED;
// closer look at objs
let CLOSE_KEYPAD;

// preload()
//
//
function preload() {
  THEME_FONT = loadFont("assets/font/superscript/SUPERSCR.TTF");

  BG_FRONT = loadImage("assets/images/Dir_front.png");
  BG_LEFT = loadImage("assets/images/Dir_left.png");
  BG_RIGHT = loadImage("assets/images/Dir_right.png");
  BG_BACK = loadImage("assets/images/Dir_back.png");
  BG_DOWN = loadImage("assets/images/Dir_down.png");
  BG_UP = loadImage("assets/images/Dir_up.png");
  bgArray = [BG_FRONT,BG_LEFT,BG_RIGHT,BG_BACK,BG_DOWN,BG_UP];
  OBJ_BOOKLET = loadImage("assets/images/Booklet.png");
  OBJ_CABIN_BOTTOM_OUT = loadImage("assets/images/Cabin_bottom_out.png");
  OBJ_CABIN_LEFT_OUT = loadImage("assets/images/Cabin_left_out.png");
  OBJ_CABIN_RIGHT_OUT = loadImage("assets/images/Cabin_right_out.png");
  OBJ_DRAWER_LEFT_OUT = loadImage("assets/images/Drawer_left_out.png");
  OBJ_DRAWER_RIGHT_OUT = loadImage("assets/images/Drawer_right_out.png");
  OBJ_PANEL = loadImage("assets/images/Panel.png");
  OBJ_PANEL_OPENED = loadImage("assets/images/Panel_opened.png");
  OBJ_PLANT = loadImage("assets/images/Plant.png");
  OBJ_PLANT_MOVED = loadImage("assets/images/Plant_moved.png");
}

// setup()
//
//
function setup() {
  $body = $('body');
  // style/theme
  createCanvas(windowWidth, windowHeight);
  background(BG_COLOR);
  textFont(THEME_FONT);
  textStyle(BOLD);
  textSize(16);
  textAlign(CENTER,CENTER);
  rectMode(CENTER);
  imageMode(CENTER);
  noStroke();

  gameBackground = new Background(BG_FRONT);
  inventory = new Inventory();
  textBox = new TextBox("What happened? Where am I? How did I get here?"
  +"\n\n[press any key to continue]");

  setupMainMenu();
}

// setupMainMenu()
//
//
function setupMainMenu(){
  mainMenuFontHeight = height;
  mainMenuFontAlpha = 0;
}

// draw()
//
//
function draw() {
  background(BG_COLOR);
  if (state === "START"){
    displayMainMenu();
  }else if (state === "TUTORIAL"){
    displayTutorial();
  }else if (state === "PLAY"){
    gameBackground.display();
    if(showTextBox){
      textBox.display();
    }
    inventory.display();
  }
}

// keyPressed()
//
//
function keyPressed() {
  if (state === "PLAY" && textBox.update){
    textBox.fullText();
  }
}

// mousePressed()
//
//
function mousePressed(){
  if (state === "PLAY" && textBox.update){
    textBox.fullText();
  }
}

// displayMainMenu()
//
//
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

// displayTutorial()
//
//
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

function useItem(item_id){

}
