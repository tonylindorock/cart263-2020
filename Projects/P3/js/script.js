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

// player's inventory
let screwDriverTaken = false;
let mugTaken = false;
let cordTaken = false;
let fuseTaken = false;

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

let keypad;
let lock;

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
  "I don't... remember anything.\nI should probably get out of here.\n\n[use all Arrowkeys to see your surroundings]"
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
let OBJ_CORD;
let OBJ_CORD_USED;
let OBJ_DOOR_OPENED;
let OBJ_FUSE;
let OBJ_FUSE_INSTALLED;
let OBJ_HOLE;
let OBJ_MUG_PLACED;
let OBJ_TRAPDOOR_OPENED;
// overlay for the bg
let OVERLAY_LIGHT_OFF;
let OVERLAY_DARKEN;
let OVERLAY_DARKEN_FRONT;
// closer look at objs
let CLOSE_KEYPAD;
let CLOSE_LOCK;
let CLOSE_CARD;
let CLOSE_NEWSPAPER;
let CLOSE_MANUAL;

// items
let ITEM_SCREWDRIVER;
let ITEM_MUG;
let ITEM_FUSE;
let ITEM_CORD;

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
  OBJ_CORD = loadImage("assets/images/Extensioncord.png");
  OBJ_CORD_USED = loadImage("assets/images/Cord_used.png");
  OBJ_DOOR_OPENED = loadImage("assets/images/Door_opened.png");
  OBJ_FUSE = loadImage("assets/images/Fuse.png");
  OBJ_FUSE_INSTALLED = loadImage("assets/images/Fuse_installed.png");
  OBJ_HOLE = loadImage("assets/images/Hole.png");
  OBJ_MUG_PLACED = loadImage("assets/images/Mug_placed.png");
  OBJ_TRAPDOOR_OPENED = loadImage("assets/images/Trapdoor_opened.png");

  OVERLAY_LIGHT_OFF = loadImage("assets/images/Light_off.png");
  OVERLAY_DARKEN = loadImage("assets/images/Darken.png");
  OVERLAY_DARKEN_FRONT = loadImage("assets/images/Darken_front.png");

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
  keypad = new Keypad(CLOSE_KEYPAD);

  setupMainMenu(); // set up main menu
  setupObjTriggers(); // set up triggers

  let containerLeftMargin = (gameBackground.width)/2;
  $(".container").css({
    "width": gameBackground.width.toString()+"px",
    "margin-left": "-"+containerLeftMargin.toString()+"px"
  });

  if(state === "PLAY"){
    gameBackground.fadeIn = true;
    showTriggers();
  }
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
  // back triggers
  $("#newspaper").click({id: 2}, objTriggered);
  $("#coffeemachine").click({id: 2}, objTriggered);
  $("#plug").click({id: 2}, objTriggered);
  $("#socket").click({id: 2}, objTriggered);
  $("#fuse").click({id: 2}, objTriggered);
  // right triggers
  $("#paintings").click({
    id: 3
  }, objTriggered);
  $("#cabin-left").click({
    id: 3
  }, objTriggered);
  $("#cabin-right").click({
    id: 3
  }, objTriggered);
  $("#cabin-bottom").click({
    id: 3
  }, objTriggered);
  $("#manual").click({
    id: 3
  }, objTriggered);
  $("#trapdoor").click({
    id: 4
  }, objTriggered);
  $("#light").click({
    id: 5
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
    keypad.display();
    inventory.display();
  } else if (state === "END") {

  }
}

// keyPressed()
//
//
function keyPressed() {
  if (state === "PLAY") {
    if (keypad.show === true){
      if (keyCode === 49) {
        keypad.addCode(1);
      }else if (keyCode === 50) {
        keypad.addCode(2);
      }else if (keyCode === 51) {
        keypad.addCode(3);
      }else if (keyCode === 52) {
        keypad.addCode(4);
      }else if (keyCode === 53) {
        keypad.addCode(5);
      }else if (keyCode === 54) {
        keypad.addCode(6);
      }else if (keyCode === 55) {
        keypad.addCode(7);
      }else if (keyCode === 56) {
        keypad.addCode(8);
      }else if (keyCode === 57) {
        keypad.addCode(9);
      }else if (keyCode === 48) {
        keypad.addCode(0);
      }
    }
    if (textBox.update) {
      // textBox.fullText();
    } else {
      if (textBox.bufferText != null) {
        textBox.insertBuffer();
        return;
      } else {
        if (textBox.showing) {
          textBox.hide();
          return;
        }
      }
      currentDir = gameBackground.dir;
      if (keyCode === UP_ARROW) {
        showTriggers();
        if (currentDir === 4) {
          gameBackground.changeDirTo(gameBackground.lastDir);
        } else {
          if (currentDir != 5) {
            gameBackground.changeDirTo(5);
          }
        }
      } else if (keyCode === DOWN_ARROW) {
        showTriggers();
        if (currentDir === 5) {
          gameBackground.changeDirTo(gameBackground.lastDir);
        } else {
          if (currentDir != 4) {
            gameBackground.changeDirTo(4);
          }
        }
      } else if (keyCode === LEFT_ARROW) {
        showTriggers();
        if (currentDir != 4 && currentDir != 5) {
          if (currentDir < 3) {
            currentDir++;
            gameBackground.changeDirTo(currentDir);
          } else if (currentDir === 3) {
            gameBackground.changeDirTo(0);
          }
        }
      } else if (keyCode === RIGHT_ARROW) {
        showTriggers();
        if (currentDir != 4 && currentDir != 5) {
          if (currentDir > 0) {
            currentDir--;
            gameBackground.changeDirTo(currentDir);
          } else if (currentDir === 0) {
            gameBackground.changeDirTo(3);
          }
        }
      }
      }
    }

  }

// mousePressed()
//
//
function mousePressed() {
  if (state === "PLAY") {
    if (textBox.update) {
      // textBox.fullText();
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
    gameBackground.fadeIn = true;
    showTriggers();
  }
  pop();
}

function showTriggers() {
  dirArray[gameBackground.lastDir].hide();
  dirArray[gameBackground.dir].show();
}

function hideTriggers(){
  dirArray[gameBackground.dir].hide();
}

function objTriggered(event) {
  // if the textBox is not on the screen, handle the trigger
  if (!textBox.showing) {
    // front
    if (event.data.id === 0) {
      if ($(this).is("#keypad")) {
        showCloserObj(0);
      } else if ($(this).is("#switch")) {
        if (gameBackground.fuseInstalled) {
          textBox.insertText("I can turn off the light now");
          gameBackground.lightOff = true;
        } else {
          textBox.insertText("It doesn't do anything\nIs it broken?");
        }
      } else if ($(this).is("#panel")) {
        if (gameBackground.panelOpened) {
          if (gameBackground.fuseInstalled) {
            textBox.insertText("I think I fixed something at least");
          }else{
            textBox.insertText("It looks like something is missing");
            textBox.buffer("Maybe I can find it somewhere");
          }
        } else {
          textBox.insertText("A panel held by 4 screws");
          textBox.buffer("I wonder if I can get it open with something");
        }
      } else if ($(this).is("#door")) {
        if (gameBackground.doorOpened) {

        } else {
          textBox.insertText("Door is locked");
          textBox.buffer("I need to enter some kinda of\npasscode or something?");
        }
      }
      // left
    } else if (event.data.id === 1) {
      if ($(this).is("#plant")) {
        if (!gameBackground.plantMoved) {
          textBox.insertText("I moved the plant\nThere's a number hidden under it");
          gameBackground.plantMoved = true;
        }
      } else if ($(this).is("#card")) {

      } else if ($(this).is("#drawer-left")) {
        if (!gameBackground.drawerLeftOut) {
          textBox.insertText("There's a screwdriver in this drawer\nI'm taking it");
          gameBackground.drawerLeftOut = true;
          screwDriverTaken = true;
        }
      } else if ($(this).is("#drawer-right")) {
        if (!gameBackground.drawerRightOut) {
          textBox.insertText("It's empty");
          gameBackground.drawerRightOut = true;
        }
      } else if ($(this).is("#book")) {
        textBox.insertText("The green book named\n\"The Key to the Light Is Under the Cube\"\nhas nothing written on it");
        textBox.buffer("The red book is fully blank");
      }
      // back
    } else if (event.data.id === 2) {
      if ($(this).is("#newspaper")){

      }else if ($(this).is("#coffeemachine")){
        textBox.insertText("It doesn't have power");
      }else if ($(this).is("#plug")){
        textBox.insertText("Where do I plug this in?");
        textBox.buffer("The only power socket is out of reach!");
      }else if ($(this).is("#socket")){
        textBox.insertText("Why is the power socket way up there?");
      }else if ($(this).is("#fuse")){
        if (!gameBackground.posterOpened){
          textBox.insertText("There's something behind...");
          gameBackground.posterOpened = true;
        }else{
          if (!gameBackground.fuseTaken){
            textBox.insertText("It's a fuse!\nI'm taking it");
            gameBackground.fuseTaken = true;
          }
        }
      }
      // right
    } else if (event.data.id === 3) {
      if ($(this).is("#paintings")) {
        textBox.insertText("There're 3 strange abstract paintings");
        textBox.buffer("I hope I can understand them");
      } else if ($(this).is("#cabin-left")) {
        if (!gameBackground.cabinLeftOut) {
          textBox.insertText("I found a mug in here\nI'm taking it");
          gameBackground.cabinLeftOut = true;
          mugTaken = true;
        }
      } else if ($(this).is("#cabin-right")) {
        if (!gameBackground.cabinRightOut) {
          textBox.insertText("There's nothing in it");
          gameBackground.cabinRightOut = true;
        }
      } else if ($(this).is("#cabin-bottom")) {
        if (!gameBackground.cabinBottomOut) {
          textBox.insertText("It's empty except the number written inside");
          gameBackground.cabinBottomOut = true;
        }
      } else if ($(this).is("#manual")) {

        }
      // down
    } else if (event.data.id === 4) {
      if (!gameBackground.trapDoorOpened){

      }else{
        if(!gameBackground.cordTaken){
          textBox.insertText("There's a power strip under the floor\nI'm taking it");
          gameBackground.cordTaken = true;
          cordTaken = true;
        }
      }
      // up
    } else if (event.data.id === 5) {
      if (gameBackground.lightOff){
        textBox.insertText("The light is off");
        textBox.buffer("The writing on the ceiling is interesting");
      }else{
        textBox.insertText("A light on the ceiling\nIt looks like nothing special");
      }
    }
  }
}

function showCloserObj(id){
  if (id === 0){
    keypad.show = true;
    var $button = $("<div class='button' id = 'close-button'></div>").text("close").button().click(function() {
      $('#close-button').remove();
      showTriggers();
      keypad.show = false;
    });
    $body.append($button);
  }else if (id === 1){

  }else if (id === 2){

  }else if (id === 3){

  }else if (id === 4){

  }
  hideTriggers();
}

function useItem(item_id) {

}
