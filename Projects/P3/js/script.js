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
let titleFadeAway = false;

// current state of the program
let state = "START";

// to store font
let themeFont;

// the color of background
const BG_COLOR = "#111";
// color of highlight
const HIGHLIGHT = "#FF7F50";
const GREEN_BLUE = "#7FFFD4";

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
  if (!titleFadeAway){
    mainMenuFontAlpha = lerp(mainMenuFontAlpha, 255, 0.05);
    mainMenuFontHeight = lerp(mainMenuFontHeight, height/2 - height/8, 0.05);
  }else{
    mainMenuFontAlpha = lerp(mainMenuFontAlpha, 0, 0.05);
    mainMenuFontHeight = lerp(mainMenuFontHeight, height + height/8, 0.03);
  }
  fill(127, 255, 212,mainMenuFontAlpha);
  text("The Art of\nBeing Artistic",width/2,mainMenuFontHeight);
  if (mainMenuFontAlpha >= 210 && doOnce){
    var $button = $("<div class='button' id = 'title-button'></div>").text("start").button().click(function(){
      titleFadeAway = true;
      $('#title-button').hide();
    }).hide().fadeIn(500);
    $('body').append($button);
    doOnce = false;
  }
  if (titleFadeAway && mainMenuFontAlpha <= 0){
    state = "TUTORIAL";
  }
  pop();
}
