"use strict";

/********************************************************************

Project 3
The Art of Being Artistic
Yichen Wang

FONT FROM: https://www.urbanfonts.com/fonts/superscript.htm
*********************************************************************/

// the font attributes of title for the animation
let mainMenuFontHeight;
let mainMenuFontAlpha = 0;
let doOnce = true;

// current state of the program
let state = "START";

// to store font
let themeFont;

// the color of background
const BG_COLOR = "#111";

function preload() {
  themeFont = loadFont("assets/font/SUPERSCR.TTF");
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
  if (state === "START"){
    displayMainMenu();
  }
}

function setupMainMenu(){
  mainMenuFontHeight = height;
  mainMenuFontAlpha = 0;
}

function displayMainMenu() {
  push();
  textSize(64);
  mainMenuFontAlpha = lerp(mainMenuFontAlpha, 255, 0.05);
  mainMenuFontHeight = lerp(mainMenuFontHeight, height/2 - height/8, 0.05);
  fill(255,mainMenuFontAlpha);
  text("The Art of\nBeing Artistic",width/2,mainMenuFontHeight);
  if (mainMenuFontAlpha >= 250 && doOnce){
    var $button = $("<div class='button'></div>").text("START").button().click(function(){
      state = "PLAY";
    }).removeClass("ui-corner-all");
    $('body').append($button);
    doOnce = false;
  }
  pop();
}
