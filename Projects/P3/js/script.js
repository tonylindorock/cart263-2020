"use strict";
/********************************************************************

Project 3
Questionable Logic: The Cube
Yichen Wang

HIGHLIGHTS:
+ A "simple" point & click adventrue
+ 6 scenes to explore and over 10 puzzles to solve
+ Listen to the ambient and interact with the environment
+ Logic is questionable

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
let state = "PLAY";
// the direction the player is facing
let currentDir = 0;
let dirChanged = false;

let $body; // store the html body
let $objTrigger;
let $front;
let $left;
let $right;
let $back;
let $down;
let $up;
let dirArray;

// text box
let showTextBox = true;
let textBox; // store the obj

// text box
let inventory; // store the obj

// background manager
let gameBackground; // store the obj

const TEXT_TUTORIAL = "Hi," +
  "\n\nI know it has been many years since we departed," +
  "\nbut there's something I need to tell you." +
  "\n\nThe Cube is real! I got in! And I escaped!" +
  "\nIt was incredible! No one would ever believe me." +
  "\nBut I know you will. It's not a MYTH any more." +
  "\n\nI'm going in again. Wish me luck." +
  "\n\nBest wishes," +
  "\nOliver";

const TEXT_BEGIN = [
  "What happened? Where am I? How did I get here?\n\n[press any key to continue]",
  "I don't... remember anything.\nI should probably get out of here."
];
let begin = true;

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
  BG_FRONT = loadImage("assets/images/Dir_front.png");
  BG_LEFT = loadImage("assets/images/Dir_left.png");
  BG_RIGHT = loadImage("assets/images/Dir_right.png");
  BG_BACK = loadImage("assets/images/Dir_back.png");
  BG_DOWN = loadImage("assets/images/Dir_down.png");
  BG_UP = loadImage("assets/images/Dir_up.png");
  bgArray = [BG_FRONT, BG_LEFT, BG_BACK, BG_RIGHT, BG_DOWN, BG_UP];
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
  CLOSE_KEYPAD = loadImage("assets/images/Keypad.png");

}

// setup()
//
//
function setup() {
  $body = $('body');
  $front = $("#front");
  $left = $("#left");
  $right = $("#right");
  $back = $("#back");
  $down = $("#down");
  $up = $("#up");
  dirArray = [$front, $left, $back, $right, $down, $up];
  // style/theme
  createCanvas(windowWidth, windowHeight);
  background(BG_COLOR);
  textFont("Gill Sans");
  textStyle(BOLD);
  textSize(16);
  textAlign(CENTER, CENTER);
  rectMode(CENTER);
  imageMode(CENTER);
  noStroke();

  // create objects
  gameBackground = new Background(BG_FRONT);
  inventory = new Inventory();
  textBox = new TextBox();
  textBox.insertText(TEXT_BEGIN[0]);
  textBox.buffer(TEXT_BEGIN[1]);

  setupMainMenu(); // set up main menu
  setupObjTriggers(); // set up triggers
  showTriggers();
}

// setupMainMenu()
//
//
function setupMainMenu() {
  mainMenuFontHeight = height;
  mainMenuFontAlpha = 0;
}

function setupObjTriggers() {
  $("#front").hide();
  $("#left").hide();
  $("#right").hide();
  $("#back").hide();
  $("#down").hide();
  $("#up").hide();
  $(".obj-trigger").button();
  // front triggers
  $("#keypad").click({
    id: 0
  }, objTriggered);
  $("#switch").click({
    id: 0
  }, objTriggered);
  $("#panel").click({
    id: 0
  }, objTriggered);
  $("#door").click({
    id: 0
  }, objTriggered);
  // left triggers
  $("#plant").click({
    id: 1
  }, objTriggered);
  $("#card").click({
    id: 1
  }, objTriggered);
  $("#drawer-left").click({
    id: 1
  }, objTriggered);
  $("#drawer-right").click({
    id: 1
  }, objTriggered);
  $("#book").click({
    id: 1
  }, objTriggered);
}

// draw()
//
//
function draw() {
  background(BG_COLOR);
  if (state === "START") {
    displayMainMenu();
  } else if (state === "TUTORIAL") {
    displayTutorial();
  } else if (state === "PLAY") {
    gameBackground.display();
    if (showTextBox) {
      textBox.display();
    }
    inventory.display();
  } else if (state === "END") {

  }
}

// keyPressed()
//
//
function keyPressed() {
  if (state === "PLAY") {
    if (textBox.update) {
      textBox.fullText();
    } else {
      if (textBox.bufferText != null) {
        textBox.insertBuffer();
        return;
      } else {
        if (textBox.showing){
          textBox.hide();
          return;
        }
      }
    }
    if (keyCode === UP_ARROW){
      if (currentDir === 4){
        gameBackground.changeDirTo(gameBackground.lastDir);
      }else{
        if (currentDir != 5){
          gameBackground.changeDirTo(5);
        }
      }
    }else if (keyCode === DOWN_ARROW){
      if (currentDir === 5){
        gameBackground.changeDirTo(gameBackground.lastDir);
      }else{
        if (currentDir != 4){
          gameBackground.changeDirTo(4);
        }
      }
    }else if (keyCode === LEFT_ARROW){
      if (currentDir != 4 && currentDir != 5){
        if (currentDir < 3){
          currentDir++;
          gameBackground.changeDirTo(currentDir);
        }else if (currentDir === 3){
          gameBackground.changeDirTo(0);
        }
      }
    }else if (keyCode === RIGHT_ARROW){
      if (currentDir != 4 && currentDir != 5){
        if (currentDir > 0){
          currentDir--;
          gameBackground.changeDirTo(currentDir);
        }else if (currentDir === 0){
          gameBackground.changeDirTo(3);
        }
      }
    }
    showTriggers();
    currentDir = gameBackground.dir;
  }
}

// mousePressed()
//
//
function mousePressed() {
  if (state === "PLAY") {
    if (textBox.update) {
      textBox.fullText();
    } else {
      if (textBox.bufferText != null) {
        textBox.insertBuffer();
      } else {
        textBox.hide();
      }
    }
  }
}

// displayMainMenu()
//
//
function displayMainMenu() {
  push();
  textSize(28);
  fill(255, mainMenuFontAlpha);
  text("SPECIAL EPISODE: THE CUBE", width / 2, height - height / 8);
  textSize(64);
  if (!titleFadeAway) {
    mainMenuFontAlpha = lerp(mainMenuFontAlpha, 255, 0.05);
    mainMenuFontHeight = lerp(mainMenuFontHeight, height / 2 - height / 8, 0.05);
  } else {
    mainMenuFontAlpha = lerp(mainMenuFontAlpha, 0, 0.05);
    mainMenuFontHeight = lerp(mainMenuFontHeight, height + height / 8, 0.03);
  }
  // fill the title
  fill(127, 255, 212, mainMenuFontAlpha);
  text("QUESTIONABLE\nLOGIC", width / 2, mainMenuFontHeight);

  if (mainMenuFontAlpha >= 210 && doOnce) {
    var $button = $("<div class='button' id = 'title-button'></div>").text("start").button().click(function() {
      titleFadeAway = true;
      $('#title-button').remove();
    }).hide().fadeIn(500);
    $body.append($button);
    doOnce = false;
  }
  if (titleFadeAway && mainMenuFontAlpha <= 10) {
    state = "TUTORIAL"; // to the next state
    doOnce = true; // reset doOnce
  }
  pop();
}

// displayTutorial()
//
//
function displayTutorial() {
  push();
  textSize(28);
  textAlign(LEFT);
  if (!tutorialFadeAway) {
    tutorialFontAlpha = lerp(tutorialFontAlpha, 255, 0.05);
  } else {
    tutorialFontAlpha = lerp(tutorialFontAlpha, 0, 0.1);
  }
  fill(255, tutorialFontAlpha);
  text(TEXT_TUTORIAL, width / 12, height / 2);
  if (doOnce) {
    var $button = $("<div class='button' id = 'tutorial-button'></div>").text("next").button().click(function() {
      tutorialFadeAway = true;
      $('#tutorial-button').remove();
    }).hide().fadeIn(500);
    $body.append($button);
    doOnce = false;
  }
  if (tutorialFadeAway && tutorialFontAlpha <= 1) {
    state = "PLAY";
    doOnce = true;
  }
  pop();
}

function showTriggers() {
  dirArray[gameBackground.lastDir].hide();
  dirArray[gameBackground.dir].show();
}

function objTriggered(event) {
  // if the textBox is not on the screen, handle the trigger
  if (!textBox.showing) {
    // front
    if (event.data.id === 0) {
      if ($(this).is("#keypad")) {
        textBox.insertText("Only if I know the code...\nMaybe I can find something in this room\n\n[Press arrowkeys to change your facing direction]");
      } else if ($(this).is("#switch")) {
        if (gameBackground.fuseInstalled) {

        } else {
          textBox.insertText("It doesn't do anything\nIs it broken?");
        }
      } else if ($(this).is("#panel")) {
        if (gameBackground.panelOpened) {

        } else {
          textBox.insertText("A panel held by 4 screws\nI wonder if I can get it open with something");
        }
      } else if ($(this).is("#door")) {
        if (gameBackground.doorOpened) {

        } else {
          textBox.insertText("Door is locked\nI need to enter some kinda of passcode or something?");
        }
      }
      // left
    } else if (event.data.id === 1) {
      if ($(this).is("#plant")) {
        if (gameBackground.plantMoved) {
          textBox.insertText("There's a number hidden under it\nWhy is it 4?");
        } else {
          textBox.insertText("I moved the plant\nThere's a number hidden under it");
          gameBackground.plantMoved = true;
        }
      } else if ($(this).is("#card")) {
        textBox.insertText("A birthday card!\n\nI hope you will enjoy\nthis heat changeing mug.\n--Oliver");
      } else if ($(this).is("#drawer-left")) {
        if (gameBackground.drawerLeftOut) {
          textBox.insertText("There's nothing left");
        } else {
          textBox.insertText("There's a screwdriver in this drawer");
          $(this).css({
            "height": "9%",
            "bottom": "19%"
          });
          gameBackground.drawerLeftOut = true;
        }
      } else if ($(this).is("#drawer-right")) {
        if (gameBackground.drawerRightOut) {
          textBox.insertText("I found nothing in this drawer");
        } else {
          textBox.insertText("It's empty");
          $(this).css({
            "height": "9%",
            "bottom": "19%"
          });
          gameBackground.drawerRightOut = true;
        }
      } else if ($(this).is("#book")) {
        textBox.insertText("The green book named\n\"The Key to the Light Is Under the Cube\"\nhas nothing written on it");
        textBox.buffer("The red book is fully blank");
      }
    // back
    } else if (event.data.id === 2) {
    // right
    } else if (event.data.id === 3) {
      // down
    } else if (event.data.id === 4) {
      // up
    } else if (event.data.id === 5) {}
  }
}

function useItem(item_id) {

}
