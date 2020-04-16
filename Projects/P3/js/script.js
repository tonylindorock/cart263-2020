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
let SOUND_HIGH_PIANO_KEY;
let SOUND_LOW_PIANO_KEY;
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
  SOUND_HIGH_PIANO_KEY = loadSound("assets/sounds/High_piano_key.mp3");
  SOUND_LOW_PIANO_KEY = loadSound("assets/sounds/Low_piano_key.mp3");
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
  SOUND_LOW_PIANO_KEY.setVolume(0.3);
  SOUND_HIGH_PIANO_KEY.setVolume(0.15);
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
  SOUND_CM_WORKING.setVolume(0.15);
  SOUND_CM_SWITCH.setVolume(0.1);
  SOUND_PLUG_IN.setVolume(0.15);
  SOUND_PLACE_MUG.setVolume(0.1);
  BGM_CONCLUSION.setVolume(0.15);
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
// display the main menu
function displayMainMenu() {
  push();
  textSize(28);
  fill(255, mainMenuFontAlpha); // changing opacity
  text("SPECIAL EPISODE: THE CUBE", width / 2, height - height / 8);
  textSize(64);
  // if title is fading in
  if (!titleFadeAway) {
    // opacity transition from 0 to 255
    mainMenuFontAlpha = lerp(mainMenuFontAlpha, 255, 0.05);
    // height transition from bottom to the center
    mainMenuFontHeight = lerp(mainMenuFontHeight, height / 2 - height / 8, 0.05);
    // if title is fading out
  } else {
    // opacity transition from 255 to 0
    mainMenuFontAlpha = lerp(mainMenuFontAlpha, 0, 0.05);
    // height transition from center to the bottom
    mainMenuFontHeight = lerp(mainMenuFontHeight, height + height / 8, 0.03);
  }
  // fill the title with changing opacity
  fill(127, 255, 212, mainMenuFontAlpha);
  text("QUESTIONABLE\nLOGIC", width / 2, mainMenuFontHeight);
  // if the opacity is >= 210 and do this only once
  if (mainMenuFontAlpha >= 210 && doOnce) {
    // create a start button
    var $button = $("<div class='button' id = 'title-button'></div>").text("start").button().click(function() {
      titleFadeAway = true;
      $('#title-button').remove();
      SOUND_LOW_PIANO_KEY.play();
    }).hide().fadeIn(500);
    $body.append($button);
    doOnce = false; // once it's done, don't create any more buttons
  }
  // if player clicks the start button and the opacity is less than 10
  // change to tutorial/letter
  if (titleFadeAway && mainMenuFontAlpha <= 10) {
    state = "TUTORIAL"; // to the next state
    doOnce = true; // reset doOnce
  }
  pop();
}

// displayTutorial()
//
// show the content of the tutorial/letter of Oliver/introduction
function displayTutorial() {
  push();
  textSize(28);
  textAlign(LEFT);
  // if text is fading in
  if (!tutorialFadeAway) {
    tutorialFontAlpha = lerp(tutorialFontAlpha, 255, 0.05);
    // if text is fading out
  } else {
    tutorialFontAlpha = lerp(tutorialFontAlpha, 0, 0.1);
  }
  fill(255, tutorialFontAlpha);
  text(TEXT_LETTER, width / 12, height / 2);
  // do only once
  if (doOnce) {
    // create a next button
    var $button = $("<div class='button' id = 'tutorial-button'></div>").text("next").button().click(function() {
      tutorialFadeAway = true;
      $('#tutorial-button').remove();
      SOUND_HIGH_PIANO_KEY.play();
    }).hide().fadeIn(500);
    $body.append($button);
    doOnce = false;
  }
  // if the player clicks the next button and the opacity is less than 1
  // go to gameplay
  if (tutorialFadeAway && tutorialFontAlpha <= 1) {
    setTimeout(function() {
      state = "PLAY";
      doOnce = true; // reset doOnce
      gameBackground.fadeIn = true; // fade in the background
      showTriggers(); // show the object trigger buttons
      $directionIndicator.show(); // show the direction indicator
    }, 2000);
  }
  pop();
}

// displayEnd()
//
// display the game over screen
function displayEnd() {
  // if players have not made a choice
  // display the background
  if (!choiceMade) {
    image(BG_END, width / 2, height / 2, (height / BG_END.height) * BG_END.width, height);
    // if a choice is made
  } else {
    push();
    textSize(24);
    textAlign(CENTER);
    // opacity transition from 0 to 255
    endFontAlpha = lerp(endFontAlpha, 255, 0.02);
    // height transition from outside of the screen to the inside
    endFontHeight = lerp(endFontHeight, height - height / 6, 0.02);
    fill(255, endFontAlpha);
    text(ENDINGS[endId], width / 2, height / 2);
    textSize(48);
    fill(HIGHLIGHT);
    text("THANK YOU\nFOR PLAYING", width / 2, endFontHeight); // will appear from the bottom
    textSize(64);
    fill(GREEN_BLUE);
    text("QUESTIONABLE LOGIC", width / 2, height - endFontHeight); // will appear from the top
    pop();
  }
}

// keyPressed()
//
// handle key input
function keyPressed() {
  // if players are in gameplay or game over screen
  if (state === "PLAY" || state === "END") {
    // if the message is updating
    if (textBox.update) {
      // textBox.fullText();
      // skip text animation for the developer :)
      // could be a feature but sometimes player will miss the message entirely if the message is too short
    } else {
      // if there's a second message
      if (textBox.bufferText != null) {
        // show the second message
        textBox.insertBuffer();
        return;
        // if no, hide the message when the animation is finished
      } else {
        if (textBox.showing) {
          textBox.hide();
          return;
        }
      }
      // if in gameplay and not examining a close object
      if (state === "PLAY" && !closeObjShowing) {
        // pressing arrowkeys will change background
        currentDir = gameBackground.dir; // store current facing direction
        // UP
        if (keyCode === UP_ARROW) {
          // if player is facing down, go to the last direction
          if (currentDir === 4) {
            currentDir = gameBackground.lastDir;
            gameBackground.changeDirTo(currentDir);
          } else {
            // if player isn't facing up, go face up
            if (currentDir != 5) {
              currentDir = 5;
              gameBackground.changeDirTo(currentDir);
            }
          }
          showTriggers(); // update object trigger areas
          // DOWN
        } else if (keyCode === DOWN_ARROW) {
          // if player is facing up, go to the last dir
          if (currentDir === 5) {
            currentDir = gameBackground.lastDir;
            gameBackground.changeDirTo(currentDir);
          } else {
            // if not facing down, go face down
            if (currentDir != 4) {
              currentDir = 4;
              gameBackground.changeDirTo(currentDir);
            }
          }
          showTriggers();
          // LEFT
        } else if (keyCode === LEFT_ARROW) {
          // if player is facing up or down, don't change
          if (currentDir != 4 && currentDir != 5) {
            // change direction from 0 to 3 and then back to 0
            if (currentDir < 3) {
              currentDir++;
              gameBackground.changeDirTo(currentDir);
            } else if (currentDir === 3) {
              currentDir = 0;
              gameBackground.changeDirTo(currentDir);
            }
          }
          showTriggers();
          // RIGHT
        } else if (keyCode === RIGHT_ARROW) {
          if (currentDir != 4 && currentDir != 5) {
            // change direction from 3 to 0 and then back to 3
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
// handle mouse presses
function mousePressed() {
  // if player is playing
  if (state === "PLAY" || state === "END") {
    if (textBox.update) {
      // textBox.fullText();
    } else {
      //
      if (textBox.bufferText != null) {
        textBox.insertBuffer();
      } else {
        textBox.hide();
      }
      // if player is holding an item, drop it when clicking
      if (usingItem) {
        dropItem();
      }
    }
  }
}

// changeDirection(id)
//
// change game background based on direction id
function changeDirection(id) {
  // if not examining a close object
  if (!closeObjShowing) {
    // if current direction is not equal to the changing direction
    if (currentDir != int(id)) {
      // update direction and last direction
      currentDir = int(id);
      if (id != 6) {
        gameBackground.changeDirTo(currentDir);
      } else {
        gameBackground.lastDir = 0;
      }
      showTriggers(); // update object trigger areas
    }
  }
}

// showTriggers()
//
// handle the object triggers based on current facing direction
function showTriggers() {
  // hide triggers from the last direction
  dirArray[gameBackground.lastDir].hide();
  // show current direction triggers
  dirArray[currentDir].show();
  // update direction indicators
  dirIndicatorArr[gameBackground.lastDir].css({
    "color": "White"
  });
  // highlight current direction
  dirIndicatorArr[gameBackground.dir].css({
    "color": "Coral"
  });
}

// hideTriggers()
//
// hide object triggers based on current facing direction
function hideTriggers() {
  dirArray[currentDir].hide();
}

// objTriggered(event)
//
// handle the object trigger clicking event
function objTriggered(event) {
  // if the textBox is not on the screen, handle the trigger
  if (!textBox.showing) {
    // front/east
    if (event.data.id === 0) {
      // if clicking on keypad
      if ($(this).is("#keypad")) {
        if (!gameBackground.doorOpened) {
          // enter close object view
          showCloserObj(0);
        }
        // if clicking on switch
      } else if ($(this).is("#switch")) {
        // if the fuse is installed
        if (gameBackground.fuseInstalled) {
          // turn off or on the light
          if (!gameBackground.lightOff) {
            // display message
            textBox.insertText("I can turn off the light now");
            gameBackground.lightOff = true;
          } else {
            textBox.insertText("Light is back on");
            gameBackground.lightOff = false;
          }
          // if the fuse is not installed
        } else {
          textBox.insertText("It doesn't do anything\nIs it broken?");
        }
        SOUND_SWITCH.play();
        // if clicking on panel
      } else if ($(this).is("#panel")) {
        // if the panel is opened
        if (gameBackground.panelOpened) {
          // if the fuse is installed
          if (gameBackground.fuseInstalled) {
            textBox.insertText("I think I fixed something at least");
          } else {
            // if player is holding the fuce
            if (usingFuse) {
              textBox.insertText("I suppose it fits");
              gameBackground.fuseInstalled = true; // install the fuse
              removeItem(1); // remove fuse from the inventory
              SOUND_PLUG_IN.play();
              // not holding the fuse
            } else {
              textBox.insertText("It looks like something is missing");
              textBox.buffer("Maybe I can find it somewhere");
            }
          }
          // if the panel is not opened
        } else {
          // if the player is holding the screwdriver
          if (usingScrewDriver) {
            // open the panel
            gameBackground.panelOpened = true;
            textBox.insertText("I unscrewed all the screws and opened the panel!");
            SOUND_MOVE.play();
            // if not holding the screwdriver
          } else {
            textBox.insertText("A panel held by 4 screws");
            textBox.buffer("I wonder if I can get it open with something");
            SOUND_PANEL.stop();
            SOUND_PANEL.play();
          }
        }
        // if click on door
      } else if ($(this).is("#door")) {
        // if the door is opened
        if (gameBackground.doorOpened) {
          state = "END"; // go to game over screen
          endFontHeight = height + height / 4; // initiate font height
          changeDirection(6); // update game background
          // hide inventory and direction indicator
          $inventory.hide();
          $directionIndicator.hide();
          // after 2s, play the music
          setTimeout(function() {
            playing = true;
          }, 2000);
          // display message
          textBox.insertText("Now I remeber!\nI was opening my apartment door...\nbut ended up in here");
          textBox.buffer("Do I leave the Cube for good?\nOr find Oliver and bring him home?");
          // if door is locked
        } else {
          textBox.insertText("Door is locked");
          textBox.buffer("I need to enter some kinda of\npasscode or something?");
          SOUND_DOOR_LOCKED.play();
        }
      }
      // left/north
    } else if (event.data.id === 1) {
      // if click on plant
      if ($(this).is("#plant")) {
        // move the plant
        if (!gameBackground.plantMoved) {
          textBox.insertText("I moved the plant\nThere's a number hidden under it");
          gameBackground.plantMoved = true;
          SOUND_MOVE.play();
        }
        // if click on the card
      } else if ($(this).is("#card")) {
        showCloserObj(2);
        // if click on left drawer
      } else if ($(this).is("#drawer-left")) {
        // if drawer is not out
        if (!gameBackground.drawerLeftOut) {
          textBox.insertText("There's a screwdriver in this drawer\nI'm taking it");
          gameBackground.drawerLeftOut = true;
          addItem(0); // add the screwdriver to the inventory
          SOUND_DRAWER.play();
        }
        // if click on right drawer
      } else if ($(this).is("#drawer-right")) {
        // if the drawer is not out
        if (!gameBackground.drawerRightOut) {
          textBox.insertText("It's empty");
          gameBackground.drawerRightOut = true;
          SOUND_DRAWER.play();
        }
        // if click on book
      } else if ($(this).is("#book")) {
        textBox.insertText("The green book named\n\"The Key to the Light Is Under the Cube\"\nhas nothing written on it");
        textBox.buffer("The red book is fully blank");
        SOUND_READ.play();
      }
      // back
    } else if (event.data.id === 2) {
      // if click on newspaper
      if ($(this).is("#newspaper")) {
        showCloserObj(3);
        // if click on coffee machine
      } else if ($(this).is("#coffeemachine")) {
        // if the coffee machine is not powered
        if (!gameBackground.coffeeMachinePowered) {
          textBox.insertText("It doesn't have power");
          // if not holding the mug
          if (!usingMug) {
            SOUND_CM_SWITCH.play();
          }
          // if the machine is powered
        } else {
          // if the mug is placed
          if (gameBackground.mugPlaced) {
            // if the mug is not heated and machine is not running
            if (!gameBackground.coffeeMachineUsed && !coffeemachineRunning) {
              textBox.insertText("It's working!");
              coffeemachineRunning = true; // set coffee machine to running
              SOUND_CM_WORKING.play();
              // after 12s, mug is heated and machine is not running anymore
              setTimeout(function() {
                gameBackground.coffeeMachineUsed = true;
                coffeemachineRunning = false;
              }, 12000);
              // if mug is heated
            } else {
              // if machine is not running
              if (!coffeemachineRunning) {
                textBox.insertText("There's hot water in the mug");
                textBox.buffer("There's something written on the mug!");
                gameBackground.mugPlaced = false; // remove the mug
                // if mug is not taken, add mug to the inventory
                if (!mugTaken) {
                  addItem(2);
                }
              }
            }
            // if mug is not placed
          } else {
            // if the mug is not heated
            if (!gameBackground.coffeeMachineUsed) {
              textBox.insertText("I think I can use the coffee machine\nfor coffee?");
              textBox.buffer("I don't think it has coffee\nWhat I get probably is gonna be hot water");
            }
          }
        }
        // if holding the mug
        if (usingMug) {
          // if the machine is not powered
          if (!gameBackground.coffeeMachinePowered) {
            textBox.insertText("Yeah, I wish I could get some coffee");
            textBox.buffer("But it doesn't have power");
            // if powered
          } else {
            textBox.insertText("Let's get some coffee or hot water...");
          }
          gameBackground.mugPlaced = true; // place the mug
          removeItem(2); // remove mug from inventory
          SOUND_PLACE_MUG.play();
        }
        // if click on plug
      } else if ($(this).is("#plug")) {
        // if the machine is not powered
        if (!gameBackground.coffeeMachinePowered) {
          // if holding cord
          if (usingCord) {
            textBox.insertText("The extension cord is so useful...\nin this way");
            gameBackground.coffeeMachinePowered = true; // machine is powered
            removeItem(3); // remove cord from the inventory
            SOUND_PLUG_IN.play();
            // play after the plug in sound
            setTimeout(function() {
              SOUND_CM_POWERED.play();
            }, 250);
            // if not holding cord
          } else {
            textBox.insertText("Where do I plug this in?");
            textBox.buffer("The only power socket is out of reach!");
          }
        }
        // if click on socket
      } else if ($(this).is("#socket")) {
        // if the machine is not powered
        if (!gameBackground.coffeeMachinePowered) {
          // if holding cord
          if (usingCord) {
            textBox.insertText("The extension cord is so useful...\nin this way");
            gameBackground.coffeeMachinePowered = true;
            removeItem(3);
            SOUND_PLUG_IN.play();
            setTimeout(function() {
              SOUND_CM_POWERED.play();
            }, 250);
            // if not holding the cord
          } else {
            textBox.insertText("Why is the power socket way up there?");
          }
          // if machine is powered
        } else {
          textBox.insertText("I think I can use the coffee machine now");
        }
        // if click on fuse
      } else if ($(this).is("#fuse")) {
        // if the poster is not tore
        if (!gameBackground.posterOpened) {
          textBox.insertText("There's something behind...");
          gameBackground.posterOpened = true;
          SOUND_POSTER.play();
        } else {
          // if the fuse is not taken
          if (!gameBackground.fuseTaken) {
            textBox.insertText("It's a fuse!\nI'm taking it");
            gameBackground.fuseTaken = true;
            addItem(1); // add fuse to the inventory
          }
        }
      }
      // right/south
    } else if (event.data.id === 3) {
      // if click on paintings
      if ($(this).is("#paintings")) {
        textBox.insertText("There're 3 strange abstract paintings");
        textBox.buffer("I wish I can understand them");
        // if click on upper left cabin drawer
      } else if ($(this).is("#cabin-left")) {
        if (!gameBackground.cabinLeftOut) {
          textBox.insertText("I found a mug in here\nI'm taking it");
          gameBackground.cabinLeftOut = true;
          addItem(2); // add mug to the inventory
          SOUND_DRAWER.play();
        }
        // if click on upper right cabin drawer
      } else if ($(this).is("#cabin-right")) {
        if (!gameBackground.cabinRightOut) {
          textBox.insertText("There's nothing in it");
          gameBackground.cabinRightOut = true;
          SOUND_DRAWER.play();
        }
        // if click on bottom cabin drawer
      } else if ($(this).is("#cabin-bottom")) {
        if (!gameBackground.cabinBottomOut) {
          textBox.insertText("It's empty except the number written inside");
          gameBackground.cabinBottomOut = true;
          SOUND_DRAWER.play();
        }
        // if click on manual
      } else if ($(this).is("#manual")) {
        showCloserObj(4);
      }
      // down
    } else if (event.data.id === 4) {
      if (!gameBackground.trapDoorOpened) {
        showCloserObj(1); // show closer view of lock
      } else {
        // if the cord is not taken
        if (!gameBackground.cordTaken) {
          textBox.insertText("There's an extension cord under the floor\nI'm taking it");
          gameBackground.cordTaken = true;
          addItem(3); // add the cord to the inventory
        }
      }
      // up
    } else if (event.data.id === 5) {
      // if the light is off
      if (gameBackground.lightOff) {
        textBox.insertText("The writing on the ceiling...\nIs it a riddle?");
        textBox.buffer("Nine? What is 9 for?");
        // if the light is on
      } else {
        textBox.insertText("A light on the ceiling\nIt looks like nothing special");
      }
      // end
    } else if (event.data.id === 6) {
      // left door
      if ($(this).is("#door-exit")) {
        choiceMade = true;
        // right door
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

// showCloserObj(id)
//
// show close object based on the id
function showCloserObj(id) {
  // create a close button
  var $button = $("<div class='button' id = 'close-button'></div>").text("close").button();
  // keypad
  if (id === 0) {
    $(".keypad").slideDown(); // show the keypad
    // add click event to the close button
    $button.click(function() {
      $(".keypad").slideUp(); // hide the keypad
      removeCloseObjView(); // exit close object view
    });
    // create a comfirm button
    var $buttonConfirm = $("<div class='button' id = 'confirm-button'></div>").text("confirm").button().click(function() {
      // if the passcode is right
      if ($(".keypad-code").text() === PASSCODE) {
        console.log("Unlocked");
        // open door and turn on the light
        gameBackground.doorOpened = true;
        gameBackground.lightOff = false;
        $(".keypad").slideUp();
        removeCloseObjView();
        SOUND_DOOR_OPEN.play();
        // if the passcode is wrong
      } else {
        SOUND_ERROR.stop();
        SOUND_ERROR.play();
      }
    });
    // add the comfirm button to the body
    $body.append($buttonConfirm.hide().fadeIn());
    SOUND_MOVE.play();
    // lock
  } else if (id === 1) {
    $(".lock").slideDown(); // show the lock
    // add click event to the close button
    $button.click(function() {
      $(".lock").slideUp();
      removeCloseObjView();
    });
    // create a comfirm button
    var $buttonConfirm = $("<div class='button' id = 'confirm-button'></div>").text("confirm").button().click(function() {
      // get the combination
      let code = $("#lock-btn-0").text() + $("#lock-btn-1").text() + $("#lock-btn-2").text();
      // if combo is right
      if (code === LOCK_COMBO) {
        console.log("Unlocked");
        // open the trapdoor
        gameBackground.trapDoorOpened = true;
        $(".lock").slideUp();
        removeCloseObjView();
        SOUND_DOOR_OPEN.play();
        // if combo is wrong
      } else {
        SOUND_COMBO_LOCKED.stop();
        SOUND_COMBO_LOCKED.play();
      }
    });
    $body.append($buttonConfirm.hide().fadeIn());
    SOUND_MOVE.play();
    // card, newspaper, & manual
  } else if (id === 2 || id === 3 || id === 4) {
    $button.click(function() {
      removeCloseObjView();
    });
    SOUND_READ.play();
  }
  setupOverlay(); // show the image if possible and darken the background
  $body.append($button.hide().fadeIn()); // add close button to the body
  hideTriggers();
  closeObjId = id; // store current close object id
  closeObjShowing = true;
}

// removeCloseObjView()
//
// exit close view
function removeCloseObjView() {
  $('#close-button').fadeOut(); // hide close button
  let $confirm = $('#confirm-button');
  // if there's a confirm button, hide it
  if ($confirm != null) {
    $confirm.fadeOut();
  }
  // fading out
  objMoveAway = true;
  objInPosition = false;
  // after the animation, remove buttons from the body
  setTimeout(function() {
    $('#close-button').remove();
    if ($confirm != null) {
      $confirm.remove();
    }
    showTriggers();
    // reset close view
    closeObjShowing = false;
    closeObjId = -1;
  }, 400);
}

// setupOverlay()
//
// initiate animation attributes
function setupOverlay() {
  objHeight = height + height / 2; // outside of the screen
  objInPosition = false;
  objMoveAway = false;
}

// showOverlay()
//
// display closer view and darken the background
function showOverlay() {
  // if showing
  if (closeObjShowing) {
    push();
    // draken background
    fill(0, overlayAlpha);
    rect(width / 2, height / 2, width, height);
    // store the image based on id
    let closeObjImg = null;
    if (closeObjId === 2) {
      closeObjImg = CLOSE_CARD;
    } else if (closeObjId === 3) {
      closeObjImg = CLOSE_NEWSPAPER;
    } else if (closeObjId === 4) {
      closeObjImg = CLOSE_MANUAL;
    }
    // if not fading out
    if (!objMoveAway) {
      // if aniamtion not finished
      if (!objInPosition) {
        // opacity transition from 0 to 200
        overlayAlpha = lerp(overlayAlpha, 200, 0.1);
        // height transition from outside of screen to center
        objHeight = lerp(objHeight, height / 2, 0.1);
        // if reaches 199, animation is done
        if (overlayAlpha >= 199) {
          objInPosition = true;
        }
      }
      // if fading out
    } else {
      // if aniamtion not finished
      if (!objInPosition) {
        // opacity transition from 200 to 0
        overlayAlpha = lerp(overlayAlpha, 0, 0.1);
        // height transition from center to outside of the screen
        objHeight = lerp(objHeight, height + height / 2, 0.1);
        // if opacity is less than 1, animation is done
        if (overlayAlpha <= 1) {
          objInPosition = true;
        }
      }
    }
    // if stored image is not null, display it
    if (closeObjImg != null) {
      image(closeObjImg, width / 2, objHeight, ((height / 1.5) / closeObjImg.height) * closeObjImg.width, height / 1.5);
    }
    pop();
  }
}

// addCode(num)
//
// triggered by pressing a button in the keypad
// add a digit to the keypad display
function addCode(num) {
  // get the current digit
  let code = $(".keypad-code").text();
  // limit digits to only 4
  if (code.length >= 4) {
    $(".keypad-code").text(num);
    // add one if not greater than 4 digits
  } else {
    code += num;
    $(".keypad-code").text(code);
  }
  SOUND_BEEP.play();
}

// changeCode()
//
// change the combination in the lock
function changeCode() {
  // get current combo
  let num = $(this).text();
  // if reaches 9, reset to 0
  if (num === "9") {
    $(this).text("0");
    // add 1 to the digit
  } else {
    num = int(num) + 1;
    $(this).text(num);
  }
  SOUND_COMBO_LOCK.play();
}

// addItem(item_id)
//
// add items to the inventory with an id
function addItem(item_id) {
  let $item;
  // screwdriver
  if (item_id === 0) {
    // create item with image
    $item = $("<img class = 'item' id = 'item0' src = 'assets/images/Item_Screwdriver.png'>");
    // add click handler
    $item.click(function() {
      usingItemId = 0; // set current using item
      usingItem = true; // is using item
      // highlight its background
      $(this).css({
        "background-color": "Coral"
      });
      SOUND_USE_ITEM.play();
    });
    // fuse
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
    // mug
  } else if (item_id === 2) {
    // if mug if heated
    if (gameBackground.coffeeMachineUsed) {
      // use heated mug texture
      $item = $("<img class = 'item' id = 'item2' src = 'assets/images/Item_Mug_Heated.png'>");
    } else {
      // use unheated mug texture
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
    // cord
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
  $inventory.append($item); // add item to the inventory
  SOUND_TAKE_ITEM.play();
}

// useItem()
//
// when clicking on an item from inventory, it considers player is using the item
// display a miniature item under the cursor
function useItem() {
  if (usingItem) {
    let texture; // store item texture
    // screwdriver
    if (usingItemId === 0) {
      texture = ITEM_SCREWDRIVER; // set texture
      usingScrewDriver = true;
      // fuse
    } else if (usingItemId === 1) {
      texture = ITEM_FUSE;
      usingFuse = true;
      // mug
    } else if (usingItemId === 2) {
      // set texture differently if mug is heated
      if (gameBackground.coffeeMachineUsed) {
        texture = ITEM_MUG_HEATED;
      } else {
        texture = ITEM_MUG;
      }
      usingMug = true;
      mugTaken = true;
      // cord
    } else if (usingItemId === 3) {
      texture = ITEM_CORD;
      usingCord = true;
    }
    usingItem = true;
    // display the image follows the cursor
    image(texture, mouseX, mouseY, height / 8, height / 8);
  }
}

// dropItem()
//
// drop the item so that player is no longer holding one
function dropItem() {
  // reset its background in inventory
  $("#item" + usingItemId).css({
    "background-color": "white"
  });
  // reset
  usingItemId = -1;
  usingItem = false;
  // reset these after a delay so that using items on a trigger will be registered
  setTimeout(function() {
    usingScrewDriver = false;
    usingFuse = false;
    usingMug = false;
    usingCord = false;
  }, 250);
}

// removeItem(id)
//
// remove item from inventory
function removeItem(id) {
  dropItem(); // drop the item
  $(`#item${id}`).remove(); // remove it
  // if it's the mug
  if (id === 2) {
    mugTaken = false;
  }
}

// playMusic()
//
// play music repeatedly
function playMusic() {
  // if music is allowed to play
  if (playing) {
    // repeat playing
    if (!BGM_CONCLUSION.isPlaying()) {
      BGM_CONCLUSION.play();
    }
  }
}
