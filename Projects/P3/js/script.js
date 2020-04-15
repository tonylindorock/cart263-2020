"use strict";
/********************************************************************

Project 3
Questionable Logic: The Cube
Yichen Wang

HIGHLIGHTS:
+ A "simple" point & click adventrue
+ 6 scenes to explore and over 5 puzzles to solve
+ Search for the answer and interact with the environment
+ Logic is questionable

*********************************************************************/

// the font attributes of title for the animation
let mainMenuFontHeight; // font height
let mainMenuFontAlpha = 0; // font opacity
let titleFadeAway = false; // if player starts the game

// letter text animation attributes
let tutorialFontAlpha = 0;
let tutorialFadeAway = false;

// ending menu text animation attributes
let endFontAlpha = 0;
let endFontHeight;

// close object animation attributes
let overlayAlpha = 0; // background opacity
let objHeight; // image height
let objInPosition = false; // if image is in right position
let objMoveAway = false; // if the player closes the close object menu

let doOnce = true; // do only once

let state = "START"; // current state of the program
let currentDir = 0; // the direction the player is facing

// if using item(s)
let usingScrewDriver = false;
let usingMug = false;
let mugTaken = false;
let usingCord = false;
let usingFuse = false;

let usingItem = false; // if using an item
let usingItemId = -1; // current item id

let coffeemachineRunning = false; // if coffee machine is running

let closeObjShowing = false; // if examining a object closely
let closeObjId = -1; // current close object id

// store html elements
let $body;
let $objTrigger; // buttons to trigger action
// objTrigger containers
let $front;
let $left;
let $right;
let $back;
let $down;
let $up;
let $end;
let dirArray; // store all the objTrigger containers

let $inventory;

let $directionIndicator; // container for the direction texts
let dirIndicatorArr = []; // store all the direction texts

// text box
let showTextBox = true;
let textBox; // store the obj

// background manager
let gameBackground; // store the obj

// letter from Oliver
const TEXT_LETTER = "Hi," +
  "\n\nI know it has been many years since we last met," +
  "\nbut there's something I need to tell you." +
  "\n\nThe Cube is real! I got in! And I escaped!" +
  "\nIt was incredible! No one would ever believe me." +
  "\nBut I know you will. It's not a MYTH any more." +
  "\n\nI'm going in again. Wish me luck." +
  "\n\nBest wishes," +
  "\nOliver";

// the first message
const TEXT_BEGIN = [
  "What happened? Where am I? How did I get here?\n\n[press any key to continue]",
  "I don't... remember anything.\nI should probably get out of here.\n\n[use all Arrowkeys to see your surroundings]"
];

// the message in the ending
const ENDINGS = [
  "You exit the Cube.\n\nEverything is back to normal.\nYou carry on your life\nbut knowing Oliver is still\nnowhere to be found.",
  "You enter the room, the unknown.\n\nOliver is out there somewhere.\nAnd you are determined to find him\nand save him from this interdimensional world."
]
let choiceMade = false; // if the player makes the final choice
let endId = 0; // id for endings

const BG_COLOR = "#262626"; // the color of background

// theme colors
const HIGHLIGHT = "#FF7F50";
const GREEN_BLUE = "#7FFFD4";

// solutions
const PASSCODE = "9264";
const LOCK_COMBO = "301"

// ** GAME ASSESTS ** //
let THEME_FONT; // store the font
// **** Images **** //
// backgrounds
let BG_MM;
let BG_FRONT;
let BG_LEFT;
let BG_RIGHT;
let BG_BACK;
let BG_DOWN;
let BG_UP;
let BG_END;
let bgArray;
// objs appear in the backgrounds
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
// overlay for the backgrounds
let OVERLAY_LIGHT_OFF;
let OVERLAY_DARKEN;
let OVERLAY_DARKEN_FRONT;
// closer look at objects
let CLOSE_CARD;
let CLOSE_NEWSPAPER;
let CLOSE_MANUAL;
// item textures
let ITEM_SCREWDRIVER;
let ITEM_MUG;
let ITEM_MUG_HEATED;
let ITEM_FUSE;
let ITEM_CORD;
// **** Sound Effects **** //
let SOUND_BEEP;
let SOUND_READ;
let SOUND_SWITCH;
let SOUND_DRAWER;
let SOUND_PANEL;
let SOUND_MOVE;
let SOUND_POSTER;
let SOUND_TAKE_ITEM;
let SOUND_USE_ITEM;
let SOUND_PLUG_IN;
let SOUND_PLACE_MUG;
let SOUND_COMBO_LOCK;
let SOUND_COMBO_LOCKED;
let SOUND_ERROR;
let SOUND_DOOR_LOCKED;
let SOUND_DOOR_OPEN;
let SOUND_CM_POWERED;
let SOUND_CM_WORKING;
let SOUND_CM_SWITCH;
// **** Background Music **** //
let playing = false; // if the music is playing
let BGM_CONCLUSION;

// preload()
//
// load all the resource (images and sounds)
function preload() {
  // background images
  BG_FRONT = loadImage("assets/images/Dir_front.png");
  BG_LEFT = loadImage("assets/images/Dir_left.png");
  BG_RIGHT = loadImage("assets/images/Dir_right.png");
  BG_BACK = loadImage("assets/images/Dir_back.png");
  BG_DOWN = loadImage("assets/images/Dir_down.png");
  BG_UP = loadImage("assets/images/Dir_up.png");
  BG_END = loadImage("assets/images/Dir_end.png");
  // put them in the array
  bgArray = [BG_FRONT, BG_LEFT, BG_BACK, BG_RIGHT, BG_DOWN, BG_UP];
  // other images
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
  // item textures
  ITEM_SCREWDRIVER = loadImage("assets/images/Item_Screwdriver.png");
  ITEM_MUG = loadImage("assets/images/Item_Mug.png");
  ITEM_MUG_HEATED = loadImage("assets/images/Item_Mug_Heated.png");
  ITEM_FUSE = loadImage("assets/images/Item_Fuse.png");
  ITEM_CORD = loadImage("assets/images/Item_Cord.png");
  // overlay images
  OVERLAY_LIGHT_OFF = loadImage("assets/images/Light_off.png");
  OVERLAY_DARKEN = loadImage("assets/images/Darken.png");
  OVERLAY_DARKEN_FRONT = loadImage("assets/images/Darken_front.png");
  // close object images
  CLOSE_MANUAL = loadImage("assets/images/Manual.png");
  CLOSE_CARD = loadImage("assets/images/Card.png");
  CLOSE_NEWSPAPER = loadImage("assets/images/Newspaper.png");
  // sounds
  SOUND_BEEP = loadSound("assets/sounds/Beep_short.mp3");
  SOUND_READ = loadSound("assets/sounds/Read.mp3");
  SOUND_SWITCH = loadSound("assets/sounds/Switch.mp3");
  SOUND_DRAWER = loadSound("assets/sounds/Drawer.mp3");
  SOUND_PANEL = loadSound("assets/sounds/Panel.mp3");
  SOUND_MOVE = loadSound("assets/sounds/Move_object.mp3");
  SOUND_POSTER = loadSound("assets/sounds/Poster.mp3");
  SOUND_TAKE_ITEM = loadSound("assets/sounds/Take_item.mp3");
  SOUND_USE_ITEM = loadSound("assets/sounds/Use_item.mp3");
  SOUND_PLUG_IN = loadSound("assets/sounds/Plugin.mp3");
  SOUND_PLACE_MUG = loadSound("assets/sounds/Mug_placed.mp3");
  SOUND_COMBO_LOCK = loadSound("assets/sounds/Combolock.mp3");
  SOUND_COMBO_LOCKED = loadSound("assets/sounds/Combo_locked.mp3");
  SOUND_ERROR = loadSound("assets/sounds/Error.mp3");
  SOUND_DOOR_LOCKED = loadSound("assets/sounds/Door_locked.mp3");
  SOUND_DOOR_OPEN = loadSound("assets/sounds/Door_open.mp3");
  SOUND_CM_POWERED = loadSound("assets/sounds/Coffeemachine_poweredon.mp3");
  SOUND_CM_WORKING = loadSound("assets/sounds/Coffeemachine_working.mp3");
  SOUND_CM_SWITCH = loadSound("assets/sounds/Coffeemachine_switch.mp3");
  // background music
  BGM_CONCLUSION = loadSound("assets/sounds/Conclusion.mp3");
}


// setup()
//
// set up the game and determine some attributes
function setup() {
  setupHTMLPointers(); // store all the pointers to the html elements
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
  textBox = new TextBox();
  textBox.insertText(TEXT_BEGIN[0]);
  textBox.buffer(TEXT_BEGIN[1]);

  setupMainMenu(); // set up main menu
  setupObjTriggers(); // set up triggers
  setupKeypad(); // create the keypad in html
  setupLock(); // create the lock in html

  setupSFX(); // set up sounds

  // make sure the width of objTrigger containers is the same as the width of the background image
  let containerLeftMargin = (gameBackground.width) / 2;
  $(".container").css({
    "width": gameBackground.width.toString() + "px",
    // center it
    "margin-left": "-" + containerLeftMargin.toString() + "px"
  });
}

// setupSFX()
//
// set volumes for all the sounds
function setupSFX() {
  SOUND_DRAWER.setVolume(0.5);
  SOUND_PANEL.setVolume(0.15);
  SOUND_MOVE.setVolume(0.25);
  SOUND_POSTER.setVolume(0.1);
  SOUND_BEEP.setVolume(0.05);
  SOUND_ERROR.setVolume(0.05);
  SOUND_COMBO_LOCK.setVolume(0.25);
  SOUND_COMBO_LOCKED.setVolume(0.15);
  SOUND_DOOR_LOCKED.setVolume(0.75);
  SOUND_DOOR_OPEN.setVolume(0.2);
  SOUND_SWITCH.setVolume(0.2);
  SOUND_TAKE_ITEM.setVolume(0.3);
  SOUND_USE_ITEM.setVolume(0.05);
  SOUND_CM_POWERED.setVolume(0.1);
  SOUND_CM_WORKING.setVolume(0.1);
  SOUND_CM_SWITCH.setVolume(0.1);
  SOUND_PLUG_IN.setVolume(0.15);
  SOUND_PLACE_MUG.setVolume(0.1);
  BGM_CONCLUSION.setVolume(0.1);
}

// setupHTMLPointers()
//
// store all the pointers of html elements
function setupHTMLPointers() {
  $body = $('body');
  $front = $("#front");
  $left = $("#left");
  $right = $("#right");
  $back = $("#back");
  $down = $("#down");
  $up = $("#up");
  $end = $("#end");
  dirArray = [$front, $left, $back, $right, $down, $up, $end]; // store objTrigger container in the array
  $inventory = $(".inventory");
  $directionIndicator = $(".direction-indicator");
  // store all the direction texts in the arry
  for (let i = 0; i < 6; i++) {
    let id = "#dir-" + i;
    dirIndicatorArr.push($(id));
  }
}

// setupMainMenu()
//
// set initial value to main menu amination attributes
function setupMainMenu() {
  mainMenuFontHeight = height;
  mainMenuFontAlpha = 0;
}

// setupObjTriggers()
//
// set up objTrigger containers for the start of the game
function setupObjTriggers() {
  // hide all containers for the main menu
  $front.hide();
  $left.hide();
  $right.hide();
  $back.hide();
  $down.hide();
  $up.hide();
  $(".obj-trigger").button(); // every objTrigger is now a button
  // set handler to all objTriggers
  // front/east triggers
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
  // left/north triggers
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
  // back/west triggers
  $("#newspaper").click({
    id: 2
  }, objTriggered);
  $("#coffeemachine").click({
    id: 2
  }, objTriggered);
  $("#plug").click({
    id: 2
  }, objTriggered);
  $("#socket").click({
    id: 2
  }, objTriggered);
  $("#fuse").click({
    id: 2
  }, objTriggered);
  // right/south triggers
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
  // down trigger
  $("#trapdoor").click({
    id: 4
  }, objTriggered);
  // up trigger
  $("#light").click({
    id: 5
  }, objTriggered);
  // end triggers
  $("#door-exit").click({
    id: 6
  }, objTriggered);
  $("#door-oliver").click({
    id: 6
  }, objTriggered);
}

// setupKeypad()
//
// create the keypad in html
function setupKeypad() {
  var $keypad = $("<div class = 'keypad'></div>"); // container
  var $keypadCode = $("<div class = 'keypad-code'>0000</div>"); // digit display
  $keypad.append($keypadCode);
  // create all the buttons
  for (let i = 1; i < 11; i++) {
    if (i === 10) {
      var $keypadBtn = $(`<div class = "keypad-btn" onclick="addCode('0')">0</div>`);
    } else {
      var $keypadBtn = $(`<div class = 'keypad-btn' onclick="addCode('${i}')">${i}</div>`);
    }
    $keypad.append($keypadBtn);
  }
  $body.append($keypad.hide()); // add it to the body and hide it
}

// setupLock()
//
// create the combination lock in html
function setupLock() {
  var $lock = $("<div class = 'lock'></div>"); // create the container
  // create 3 buttons and add them to the container
  for (let i = 0; i < 3; i++) {
    var $lockBtn = $(`<div class = 'lock-btn' id = 'lock-btn-${i}'>0</div>`);
    $lockBtn.click(changeCode); // connect function
    $lock.append($lockBtn);
  }
  $body.append($lock.hide()); // add it to the body and hide it
}

// draw()
//
// display menus and the background
// play music
function draw() {
  background(BG_COLOR);
  // main menu
  if (state === "START") {
    displayMainMenu();
  // tutorial/letter
  } else if (state === "TUTORIAL") {
    displayTutorial();
  // playing
  } else if (state === "PLAY") {
    gameBackground.display();
    // in-game message
    if (showTextBox) {
      textBox.display();
    }
    useItem(); // display item when using
    showOverlay(); // display close object when examining
  // game over
  } else if (state === "END") {
    displayEnd();
    if (showTextBox) {
      textBox.display();
    }
    playMusic();
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
  text(TEXT_LETTER, width / 12, height / 2);
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
    $directionIndicator.show();
  }
  pop();
}

function displayEnd() {
  if (!choiceMade) {
    image(BG_END, width / 2, height / 2, (height / BG_END.height) * BG_END.width, height);
  } else {
    push();
    textSize(24);
    textAlign(CENTER);
    endFontAlpha = lerp(endFontAlpha, 255, 0.02);
    endFontHeight = lerp(endFontHeight, height - height / 6, 0.02);
    fill(255, endFontAlpha);
    text(ENDINGS[endId], width / 2, height / 2);
    textSize(48);
    fill(HIGHLIGHT);
    text("THANK YOU\nFOR PLAYING", width / 2, endFontHeight);
    textSize(64);
    fill(GREEN_BLUE);
    text("QUESTIONABLE LOGIC", width / 2, height - endFontHeight);
    pop();
  }
}

// keyPressed()
//
//
function keyPressed() {
  if (state === "PLAY" || state === "END") {
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
      if (state === "PLAY" && !closeObjShowing) {
        currentDir = gameBackground.dir;
        if (keyCode === UP_ARROW) {
          if (currentDir === 4) {
            currentDir = gameBackground.lastDir;
            gameBackground.changeDirTo(gameBackground.lastDir);
          } else {
            if (currentDir != 5) {
              currentDir = 5;
              gameBackground.changeDirTo(5);
            }
          }
          showTriggers();
        } else if (keyCode === DOWN_ARROW) {
          if (currentDir === 5) {
            currentDir = gameBackground.lastDir;
            gameBackground.changeDirTo(currentDir);
          } else {
            if (currentDir != 4) {
              currentDir = 4;
              gameBackground.changeDirTo(currentDir);
            }
          }
          showTriggers();
        } else if (keyCode === LEFT_ARROW) {
          if (currentDir != 4 && currentDir != 5) {
            if (currentDir < 3) {
              currentDir++;
              gameBackground.changeDirTo(currentDir);
            } else if (currentDir === 3) {
              currentDir = 0;
              gameBackground.changeDirTo(currentDir);
            }
          }
          showTriggers();
        } else if (keyCode === RIGHT_ARROW) {
          if (currentDir != 4 && currentDir != 5) {
            if (currentDir > 0) {
              currentDir--;
              gameBackground.changeDirTo(currentDir);
            } else if (currentDir === 0) {
              currentDir = 3;
              gameBackground.changeDirTo(currentDir);
            }
          }
          showTriggers();
        }
      }
    }
  }
}

// mousePressed()
//
//
function mousePressed() {
  if (state === "PLAY" || state === "END") {
    if (textBox.update) {
      // textBox.fullText();
    } else {
      if (textBox.bufferText != null) {
        textBox.insertBuffer();
      } else {
        textBox.hide();
      }
      if (usingItem) {
        dropItem();
      }
    }
  }
}

function changeDirection(id) {
  if (!closeObjShowing){
    if (currentDir != int(id)) {
      currentDir = int(id);
      if (id != 6) {
        gameBackground.changeDirTo(currentDir);
      } else {
        gameBackground.lastDir = 0;
      }
      showTriggers();
    }
  }
}

function showTriggers() {
  dirArray[gameBackground.lastDir].hide();
  dirArray[currentDir].show();
  dirIndicatorArr[gameBackground.lastDir].css({
    "color": "White"
  });
  dirIndicatorArr[gameBackground.dir].css({
    "color": "Coral"
  });
}

function hideTriggers() {
  dirArray[currentDir].hide();
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
          if (!gameBackground.lightOff) {
            textBox.insertText("I can turn off the light now");
            gameBackground.lightOff = true;
          } else {
            textBox.insertText("Light is back on");
            gameBackground.lightOff = false;
          }
        } else {
          textBox.insertText("It doesn't do anything\nIs it broken?");
        }
        SOUND_SWITCH.play();
      } else if ($(this).is("#panel")) {
        if (gameBackground.panelOpened) {
          if (gameBackground.fuseInstalled) {
            textBox.insertText("I think I fixed something at least");
          } else {
            if (usingFuse) {
              textBox.insertText("I suppose it fits");
              gameBackground.fuseInstalled = true;
              removeItem(1);
              SOUND_PLUG_IN.play();
            } else {
              textBox.insertText("It looks like something is missing");
              textBox.buffer("Maybe I can find it somewhere");
            }
          }
        } else {
          if (usingScrewDriver) {
            gameBackground.panelOpened = true;
            textBox.insertText("I unscrewed all the screws and opened the panel!");
            SOUND_MOVE.play();
          } else {
            textBox.insertText("A panel held by 4 screws");
            textBox.buffer("I wonder if I can get it open with something");
            SOUND_PANEL.stop();
            SOUND_PANEL.play();
          }
        }
      } else if ($(this).is("#door")) {
        if (gameBackground.doorOpened) {
          state = "END";
          endFontHeight = height + height / 4;
          changeDirection(6);

          $inventory.hide();
          $directionIndicator.hide();
          setTimeout(function() {
            playing = true;
          }, 2000);

          textBox.insertText("Now I remeber!\nI was opening my apartment door...\nbut ended up in here");
          textBox.buffer("Do I leave the Cube for good?\nOr find Oliver and bring him home?");
        } else {
          textBox.insertText("Door is locked");
          textBox.buffer("I need to enter some kinda of\npasscode or something?");
          SOUND_DOOR_LOCKED.play();
        }
      }
      // left
    } else if (event.data.id === 1) {
      if ($(this).is("#plant")) {
        if (!gameBackground.plantMoved) {
          textBox.insertText("I moved the plant\nThere's a number hidden under it");
          gameBackground.plantMoved = true;
          SOUND_MOVE.play();
        }
      } else if ($(this).is("#card")) {
        showCloserObj(2);
        SOUND_READ.play();
      } else if ($(this).is("#drawer-left")) {
        if (!gameBackground.drawerLeftOut) {
          textBox.insertText("There's a screwdriver in this drawer\nI'm taking it");
          gameBackground.drawerLeftOut = true;
          SOUND_DRAWER.play();
          addItem(0);
        }
      } else if ($(this).is("#drawer-right")) {
        if (!gameBackground.drawerRightOut) {
          textBox.insertText("It's empty");
          gameBackground.drawerRightOut = true;
          SOUND_DRAWER.play();
        }
      } else if ($(this).is("#book")) {
        textBox.insertText("The green book named\n\"The Key to the Light Is Under the Cube\"\nhas nothing written on it");
        textBox.buffer("The red book is fully blank");
        SOUND_READ.play();
      }
      // back
    } else if (event.data.id === 2) {
      if ($(this).is("#newspaper")) {
        showCloserObj(3);
        SOUND_READ.play();
      } else if ($(this).is("#coffeemachine")) {
        if (!gameBackground.coffeeMachinePowered) {
          textBox.insertText("It doesn't have power");
          if (!usingMug) {
            SOUND_CM_SWITCH.play();
          }
        } else {
          if (gameBackground.mugPlaced) {
            if (!gameBackground.coffeeMachineUsed && !coffeemachineRunning) {
              textBox.insertText("It's working!");
              coffeemachineRunning = true;
              SOUND_CM_WORKING.play();
              setTimeout(function() {
                gameBackground.coffeeMachineUsed = true;
                coffeemachineRunning = false;
              }, 12000);
            } else {
              if (!coffeemachineRunning) {
                textBox.insertText("There's hot water in the mug");
                textBox.buffer("There's something written on the mug!");
                gameBackground.mugPlaced = false;
                if (!mugTaken) {
                  addItem(2);
                }
              }
            }
          } else {
            if (!gameBackground.coffeeMachineUsed) {
              textBox.insertText("I think I can use the coffee machine\nfor coffee?");
              textBox.buffer("I don't think it has coffee\nWhat I get probably is gonna be hot water");
            }
          }
        }
        if (usingMug) {
          if (!gameBackground.coffeeMachinePowered) {
            textBox.insertText("Yeah, I wish I could get some coffee");
            textBox.buffer("But it doesn't have power");
          } else {
            textBox.insertText("Let's get some coffee or hot water...");
          }
          gameBackground.mugPlaced = true;
          removeItem(2);
          SOUND_PLACE_MUG.play();
        }
      } else if ($(this).is("#plug")) {
        if (!gameBackground.coffeeMachinePowered) {
          if (usingCord) {
            textBox.insertText("The extension cord is so useful...\nin this way");
            gameBackground.coffeeMachinePowered = true;
            removeItem(3);
            SOUND_PLUG_IN.play();
            setTimeout(function() {
              SOUND_CM_POWERED.play();
            }, 250);
          } else {
            textBox.insertText("Where do I plug this in?");
            textBox.buffer("The only power socket is out of reach!");
          }
        }
      } else if ($(this).is("#socket")) {
        if (!gameBackground.coffeeMachinePowered) {
          if (usingCord) {
            textBox.insertText("The extension cord is so useful...\nin this way");
            gameBackground.coffeeMachinePowered = true;
            removeItem(3);
            SOUND_PLUG_IN.play();
            setTimeout(function() {
              SOUND_CM_POWERED.play();
            }, 250);
          } else {
            textBox.insertText("Why is the power socket way up there?");
          }
        } else {
          textBox.insertText("I think I can use the coffee machine now");
        }
      } else if ($(this).is("#fuse")) {
        if (!gameBackground.posterOpened) {
          textBox.insertText("There's something behind...");
          gameBackground.posterOpened = true;
          SOUND_POSTER.play();
        } else {
          if (!gameBackground.fuseTaken) {
            textBox.insertText("It's a fuse!\nI'm taking it");
            gameBackground.fuseTaken = true;
            addItem(1);
          }
        }
      }
      // right
    } else if (event.data.id === 3) {
      if ($(this).is("#paintings")) {
        textBox.insertText("There're 3 strange abstract paintings");
        textBox.buffer("I wish I can understand them");
      } else if ($(this).is("#cabin-left")) {
        if (!gameBackground.cabinLeftOut) {
          textBox.insertText("I found a mug in here\nI'm taking it");
          gameBackground.cabinLeftOut = true;
          addItem(2);
          SOUND_DRAWER.play();
        }
      } else if ($(this).is("#cabin-right")) {
        if (!gameBackground.cabinRightOut) {
          textBox.insertText("There's nothing in it");
          gameBackground.cabinRightOut = true;
          SOUND_DRAWER.play();
        }
      } else if ($(this).is("#cabin-bottom")) {
        if (!gameBackground.cabinBottomOut) {
          textBox.insertText("It's empty except the number written inside");
          gameBackground.cabinBottomOut = true;
          SOUND_DRAWER.play();
        }
      } else if ($(this).is("#manual")) {
        showCloserObj(4);
        SOUND_READ.play();
      }
      // down
    } else if (event.data.id === 4) {
      if (!gameBackground.trapDoorOpened) {
        showCloserObj(1);
      } else {
        if (!gameBackground.cordTaken) {
          textBox.insertText("There's an extension cord under the floor\nI'm taking it");
          gameBackground.cordTaken = true;
          addItem(3);
        }
      }
      // up
    } else if (event.data.id === 5) {
      if (gameBackground.lightOff) {
        textBox.insertText("The writing on the ceiling...\nIs it a riddle?");
        textBox.buffer("Nine? What is 9 for?");
      } else {
        textBox.insertText("A light on the ceiling\nIt looks like nothing special");
      }
    } else if (event.data.id === 6) {
      if ($(this).is("#door-exit")) {
        choiceMade = true;
      } else if ($(this).is("#door-oliver")) {
        choiceMade = true;
        endId = 1;
      }
      console.log("Game over");
      SOUND_DOOR_OPEN.play();
      hideTriggers();
    }
  }
}

function showCloserObj(id) {
  var $button = $("<div class='button' id = 'close-button'></div>").text("close").button();
  // keypad
  if (id === 0) {
    $(".keypad").fadeIn();
    $button.click(function() {
      $(".keypad").fadeOut();
      removeCloseObjView();
    });
    var $buttonConfirm = $("<div class='button' id = 'confirm-button'></div>").text("confirm").button().click(function() {
      if ($(".keypad-code").text() === PASSCODE) {
        console.log("Unlocked");
        gameBackground.doorOpened = true;
        gameBackground.lightOff = false;
        $(".keypad").fadeOut();
        removeCloseObjView();
        SOUND_DOOR_OPEN.play();
      } else {
        SOUND_ERROR.stop();
        SOUND_ERROR.play();
      }
    });
    $body.append($buttonConfirm.hide().fadeIn());
    // lock
  } else if (id === 1) {
    $(".lock").fadeIn();
    $button.click(function() {
      $(".lock").fadeOut();
      removeCloseObjView();
    });
    var $buttonConfirm = $("<div class='button' id = 'confirm-button'></div>").text("confirm").button().click(function() {
      let code = $("#lock-btn-0").text() + $("#lock-btn-1").text() + $("#lock-btn-2").text();
      if (code === LOCK_COMBO) {
        console.log("Unlocked");
        gameBackground.trapDoorOpened = true;
        $(".lock").fadeOut();
        removeCloseObjView();
        SOUND_DOOR_OPEN.play();
      } else {
        SOUND_COMBO_LOCKED.stop();
        SOUND_COMBO_LOCKED.play();
      }
    });
    $body.append($buttonConfirm.hide().fadeIn());
    // card
  } else if (id === 2 || id === 3 || id === 4) {
    $button.click(function() {
      removeCloseObjView();
    });
  }
  setupOverlay();
  $body.append($button.hide().fadeIn());
  hideTriggers();
  closeObjId = id;
  closeObjShowing = true;
}

function removeCloseObjView(){
  $('#close-button').fadeOut();
  let $confirm = $('#confirm-button');
  if ($confirm != null){
    $confirm.fadeOut();
  }
  objMoveAway = true;
  objInPosition = false;
  setTimeout(function(){
    $('#close-button').remove();
    if ($confirm != null){
      $confirm.remove();
    }
    showTriggers();
    closeObjShowing = false;
    closeObjId = -1;
  },400);
}

function setupOverlay(){
  objHeight = height + height/2;
  objInPosition = false;
  objMoveAway = false;
}

function showOverlay() {
  if (closeObjShowing) {
    push();
    fill(0, overlayAlpha);
    rect(width / 2, height / 2, width, height);
    let closeObjImg = null;
    if (closeObjId === 2) {
      closeObjImg = CLOSE_CARD;
    } else if (closeObjId === 3) {
      closeObjImg = CLOSE_NEWSPAPER;
    } else if (closeObjId === 4) {
      closeObjImg = CLOSE_MANUAL;
    }
    if (!objMoveAway){
      if (!objInPosition){
        overlayAlpha = lerp(overlayAlpha,200,0.1);
        objHeight = lerp(objHeight,height / 2,0.1);
        if (overlayAlpha >= 199){
          objInPosition = true;
        }
      }
    }else{
      if (!objInPosition){
        overlayAlpha = lerp(overlayAlpha,0,0.1);
        objHeight = lerp(objHeight,height + height / 2,0.1);
        if (overlayAlpha <= 1){
          objInPosition = true;
        }
      }
    }
    if (closeObjImg != null) {
      image(closeObjImg, width / 2, objHeight, ((height / 1.5) / closeObjImg.height) * closeObjImg.width, height / 1.5);
    }
    pop();
  }
}

function addCode(num) {
  let code = $(".keypad-code").text();
  if (code.length >= 4) {
    $(".keypad-code").text(num);
  } else {
    code += num;
    $(".keypad-code").text(code);
  }
  SOUND_BEEP.play();
}

function changeCode() {
  let num = $(this).text();
  if (num === "9") {
    $(this).text("0");
  } else {
    num = int(num) + 1;
    $(this).text(num);
  }
  SOUND_COMBO_LOCK.play();
}

function addItem(item_id) {
  let $item;
  if (item_id === 0) {
    $item = $("<img class = 'item' id = 'item0' src = 'assets/images/Item_Screwdriver.png'>");
    $item.click(function() {
      usingItemId = 0;
      usingItem = true;
      $(this).css({
        "background-color": "Coral"
      });
      SOUND_USE_ITEM.play();
    });
  } else if (item_id === 1) {
    $item = $("<img class = 'item' id = 'item1' src = 'assets/images/Item_Fuse.png'>");
    $item.click(function() {
      usingItemId = 1;
      usingItem = true;
      $(this).css({
        "background-color": "Coral"
      });
      SOUND_USE_ITEM.play();
    });
  } else if (item_id === 2) {
    if (gameBackground.coffeeMachineUsed) {
      $item = $("<img class = 'item' id = 'item2' src = 'assets/images/Item_Mug_Heated.png'>");
    } else {
      $item = $("<img class = 'item' id = 'item2' src = 'assets/images/Item_Mug.png'>");
    }
    $item.click(function() {
      usingItemId = 2;
      usingItem = true;
      $(this).css({
        "background-color": "Coral"
      });
      SOUND_USE_ITEM.play();
    });
  } else if (item_id === 3) {
    $item = $("<img class = 'item' id = 'item3' src = 'assets/images/Item_Cord.png'>");
    $item.click(function() {
      usingItemId = 3;
      usingItem = true;
      $(this).css({
        "background-color": "Coral"
      });
      SOUND_USE_ITEM.play();
    });
  }
  $inventory.append($item);
  SOUND_TAKE_ITEM.play();
}

function useItem() {
  if (usingItem) {
    let texture;
    if (usingItemId === 0) {
      texture = ITEM_SCREWDRIVER;
      usingScrewDriver = true;
    } else if (usingItemId === 1) {
      texture = ITEM_FUSE;
      usingFuse = true;
    } else if (usingItemId === 2) {
      if (gameBackground.coffeeMachineUsed) {
        texture = ITEM_MUG_HEATED;
      } else {
        texture = ITEM_MUG;
      }
      usingMug = true;
      mugTaken = true;
    } else if (usingItemId === 3) {
      texture = ITEM_CORD;
      usingCord = true;
    }
    usingItem = true;
    image(texture, mouseX, mouseY, height / 8, height / 8);
  }
}

function dropItem() {
  $("#item" + usingItemId).css({
    "background-color": "white"
  });
  usingItemId = -1;
  usingItem = false;
  setTimeout(function() {
    usingScrewDriver = false;
    usingFuse = false;
    usingMug = false;
    usingCord = false;
  }, 250);
}

function removeItem(id) {
  dropItem();
  $(`#item${id}`).remove();
  if (id === 2) {
    mugTaken = false;
  }
}

function playMusic() {
  if (playing) {
    if (!BGM_CONCLUSION.isPlaying()) {
      BGM_CONCLUSION.play();
    }
  }
}
