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
let usingScrewDriver = false;
let usingMug = false;
let usingCord = false;
let usingFuse = false;

let inventory = [];
let usingItem = false;
let usingItemId = -1;

let closeObjShowing = false;
let closeObjId = -1;

let $body; // store the html body
let $objTrigger;
let $front;
let $left;
let $right;
let $back;
let $down;
let $up;
let dirArray;
let $inventory;

// text box
let showTextBox = true;
let textBox; // store the obj

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
  "I don't... remember anything.\nI should probably get out of here.\n\n[use all Arrowkeys to see your surroundings]"
];
let begin = true;

const BG_COLOR = "#262626"; // the color of background

// colors
const HIGHLIGHT = "#FF7F50";
const GREEN_BLUE = "#7FFFD4";

const PASSCODE = "9264";
const LOCK_COMBO = "301"

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

  ITEM_SCREWDRIVER = loadImage("assets/images/Item_Screwdriver.png");
  ITEM_MUG = loadImage("assets/images/Item_Mug.png");
  ITEM_FUSE = loadImage("assets/images/Item_Fuse.png");
  ITEM_CORD = loadImage("assets/images/Item_Cord.png");

  OVERLAY_LIGHT_OFF = loadImage("assets/images/Light_off.png");
  OVERLAY_DARKEN = loadImage("assets/images/Darken.png");
  OVERLAY_DARKEN_FRONT = loadImage("assets/images/Darken_front.png");

  CLOSE_MANUAL = loadImage("assets/images/Manual.png");
  CLOSE_CARD = loadImage("assets/images/Card.png");
  CLOSE_NEWSPAPER = loadImage("assets/images/Newspaper.png");
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
  $inventory = $(".inventory");
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
  setupKeypad();
  setupLock();

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

function setupKeypad(){
  var $keypad = $("<div class = 'keypad'></div>");
  var $keypadCode = $("<div class = 'keypad-code'>0000</div>");
  $keypad.append($keypadCode);
  for (let i = 1; i < 11; i++){
    if (i === 10){
      var $keypadBtn = $(`<div class = "keypad-btn" onclick="addCode('0')">0</div>`);
    }else{
      var $keypadBtn = $(`<div class = 'keypad-btn' onclick="addCode('${i}')">${i}</div>`);
    }
    $keypad.append($keypadBtn);
  }
  $body.append($keypad.hide());
}

function setupLock(){
  var $lock = $("<div class = 'lock'></div>");
  for(let i = 0; i < 3; i++){
    var $lockBtn = $(`<div class = 'lock-btn' id = 'lock-btn-${i}'>0</div>`);
    $lockBtn.click(changeCode);
    $lock.append($lockBtn);
  }
  $body.append($lock.hide());
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
    useItem();
    showOverlay();
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
        if (textBox.showing) {
          textBox.hide();
          return;
        }
      }
      currentDir = gameBackground.dir;
      if (keyCode === UP_ARROW) {
        if (currentDir === 4) {
          gameBackground.changeDirTo(gameBackground.lastDir);
        } else {
          if (currentDir != 5) {
            gameBackground.changeDirTo(5);
          }
        }
        showTriggers();
      } else if (keyCode === DOWN_ARROW) {
        if (currentDir === 5) {
          gameBackground.changeDirTo(gameBackground.lastDir);
        } else {
          if (currentDir != 4) {
            gameBackground.changeDirTo(4);
          }
        }
        showTriggers();
      } else if (keyCode === LEFT_ARROW) {
        if (currentDir != 4 && currentDir != 5) {
          if (currentDir < 3) {
            currentDir++;
            gameBackground.changeDirTo(currentDir);
          } else if (currentDir === 3) {
            gameBackground.changeDirTo(0);
          }
        }
        showTriggers();
      } else if (keyCode === RIGHT_ARROW) {
        if (currentDir != 4 && currentDir != 5) {
          if (currentDir > 0) {
            currentDir--;
            gameBackground.changeDirTo(currentDir);
          } else if (currentDir === 0) {
            gameBackground.changeDirTo(3);
          }
        }
        showTriggers();
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
      textBox.fullText();
    } else {
      if (textBox.bufferText != null) {
        textBox.insertBuffer();
      } else {
        textBox.hide();
      }
      if (usingItem){
        dropItem();
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
          if (!gameBackground.lightOff){
            textBox.insertText("I can turn off the light now");
            gameBackground.lightOff = true;
          }else{
            textBox.insertText("Light is back on");
            gameBackground.lightOff = false;
          }
        } else {
          textBox.insertText("It doesn't do anything\nIs it broken?");
        }
      } else if ($(this).is("#panel")) {
        if (gameBackground.panelOpened) {
          if (gameBackground.fuseInstalled) {
            textBox.insertText("I think I fixed something at least");
          }else{
            if (usingFuse){
              textBox.insertText("It looks fit");
              gameBackground.fuseInstalled = true;
              removeItem(1);
            }else{
              textBox.insertText("It looks like something is missing");
              textBox.buffer("Maybe I can find it somewhere");
            }
          }
        } else {
          if (usingScrewDriver){
            gameBackground.panelOpened = true;
            textBox.insertText("I unscrewed all the screws and opened it!");
          }else{
            textBox.insertText("A panel held by 4 screws");
            textBox.buffer("I wonder if I can get it open with something");
          }
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
        showCloserObj(2);
      } else if ($(this).is("#drawer-left")) {
        if (!gameBackground.drawerLeftOut) {
          textBox.insertText("There's a screwdriver in this drawer\nI'm taking it");
          gameBackground.drawerLeftOut = true;

          addItem(0);
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
        showCloserObj(3);
      }else if ($(this).is("#coffeemachine")){
        if (!gameBackground.coffeeMachinePowered){
          textBox.insertText("It doesn't have power");
        }else{
          if (gameBackground.mugPlaced){
            textBox.insertText("It's working!");
          }else{
            textBox.insertText("I think I can use the coffee machine\nfor coffee?");
            textBox.buffer("I don't think it has coffee\nWhat I get probably is gonna be hot water");
          }
        }
        if (usingMug){
          if (!gameBackground.coffeeMachinePowered){
            textBox.insertText("Yeah, I wish I could get some coffee");
            textBox.buffer("But it doesn't have power");
          }else{
            textBox.insertText("Let's get some coffee or hot water...");
          }
          gameBackground.mugPlaced = true;
          removeItem(2);
        }
      }else if ($(this).is("#plug")){
        if (!gameBackground.coffeeMachinePowered){
          if(usingCord){
            textBox.insertText("The extension cord is so useful...\nin this way");
            gameBackground.coffeeMachinePowered = true;
            removeItem(3);
          }else{
            textBox.insertText("Where do I plug this in?");
            textBox.buffer("The only power socket is out of reach!");
          }
        }
      }else if ($(this).is("#socket")){
        if (!gameBackground.coffeeMachinePowered){
          if(usingCord){
            textBox.insertText("The extension cord is so useful...\nin this way");
            gameBackground.coffeeMachinePowered = true;
            removeItem(3);
          }else{
            textBox.insertText("Why is the power socket way up there?");
          }
        }else{
          textBox.insertText("I think I can use the coffee machine now");
        }
      }else if ($(this).is("#fuse")){
        if (!gameBackground.posterOpened){
          textBox.insertText("There's something behind...");
          gameBackground.posterOpened = true;
        }else{
          if (!gameBackground.fuseTaken){
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
        showCloserObj(4);
        }
      // down
    } else if (event.data.id === 4) {
      if (!gameBackground.trapDoorOpened){
        showCloserObj(1);
      }else{
        if(!gameBackground.cordTaken){
          textBox.insertText("There's a power strip under the floor\nI'm taking it");
          gameBackground.cordTaken = true;
          addItem(3);
        }
      }
      // up
    } else if (event.data.id === 5) {
      if (gameBackground.lightOff){
        textBox.insertText("The writing on the ceiling...\nIs it a riddle?");
        textBox.buffer("Nine? What is 9 for?");
      }else{
        textBox.insertText("A light on the ceiling\nIt looks like nothing special");
      }
    }
  }
}

function showCloserObj(id){
  var $button = $("<div class='button' id = 'close-button'></div>").text("close").button();
  // keypad
  if (id === 0){
    $(".keypad").show();
    $button.click(function() {
      $('#close-button').remove();
      $('#confirm-button').remove();
      $(".keypad").hide();
      showTriggers();
      closeObjShowing = false;
      closeObjId = -1;
    });
    var $buttonConfirm = $("<div class='button' id = 'confirm-button'></div>").text("confirm").button().click(function(){
      if ($(".keypad-code").text() === PASSCODE){
        console.log("Unlocked");
        gameBackground.doorOpened = true;
        $('#close-button').remove();
        $('#confirm-button').remove();
        $(".keypad").hide();
        showTriggers();
        closeObjShowing = false;
        closeObjId = -1;
      }else{

      }
    });
    $body.append($buttonConfirm);
  // lock
  }else if (id === 1){
    $(".lock").show();
    $button.click(function() {
      $('#close-button').remove();
      $('#confirm-button').remove();
      $(".lock").hide();
      showTriggers();
      closeObjShowing = false;
      closeObjId = -1;
    });
    var $buttonConfirm = $("<div class='button' id = 'confirm-button'></div>").text("confirm").button().click(function(){
      let code = $("#lock-btn-0").text() + $("#lock-btn-1").text() + $("#lock-btn-2").text();
      if (code === LOCK_COMBO){
        console.log("Unlocked");
        gameBackground.trapDoorOpened = true;
        $('#close-button').remove();
        $('#confirm-button').remove();
        $(".lock").hide();
        showTriggers();
        closeObjShowing = false;
        closeObjId = -1;
      }else{

      }
    });
    $body.append($buttonConfirm);
  // card
  }else if (id === 2){
    $button.click(function() {
      $('#close-button').remove();
      closeObjId = -1;
      showTriggers();
      closeObjShowing = false;
    });
  // newspaer
  }else if (id === 3){
    $button.click(function() {
      $('#close-button').remove();
      closeObjId = -1;
      showTriggers();
      closeObjShowing = false;
    });
  // manual
  }else if (id === 4){
    $button.click(function() {
      $('#close-button').remove();
      closeObjId = -1;
      showTriggers();
      closeObjShowing = false;
    });
  }
  $body.append($button);
  hideTriggers();
  closeObjId = id;
  closeObjShowing = true;
}

function showOverlay(){
  if (closeObjShowing){
    push();
    fill(0,200);
    rect(width/2,height/2,width,height);
    let closeObjImg = null;
    if (closeObjId === 2){
      closeObjImg = CLOSE_CARD;
    }else if (closeObjId === 3){
      closeObjImg = CLOSE_NEWSPAPER;
    }else if (closeObjId === 4){
      closeObjImg = CLOSE_MANUAL;
    }
    if (closeObjImg != null){
      image(closeObjImg,width/2,height/2,((height/1.5)/closeObjImg.height)*closeObjImg.width,height/1.5);
    }
    pop();
  }
}

function addCode(num){
  let code = $(".keypad-code").text();
  if (code.length >= 4){
    $(".keypad-code").text(num);
  }else{
    code += num;
    $(".keypad-code").text(code);
  }
}

function changeCode(){
  let num = $(this).text();
  if (num === "9"){
    $(this).text("0");
  }else{
    num = int(num) + 1;
    $(this).text(num);
  }
}

function addItem(item_id){
  let $item;
  if (item_id === 0){
    $item = $("<img class = 'item' id = 'item0' src = 'assets/images/Item_Screwdriver.png'>");
    $item.click(function(){
      usingItemId = 0;
      usingItem = true;
      $(this).css({"background-color":"Coral"});
    });
  }else if (item_id === 1){
    $item = $("<img class = 'item' id = 'item1' src = 'assets/images/Item_Fuse.png'>");
    $item.click(function(){
      usingItemId = 1;
      usingItem = true;
      $(this).css({"background-color":"Coral"});
    });
  }else if (item_id === 2){
    $item = $("<img class = 'item' id = 'item2' src = 'assets/images/Item_Mug.png'>");
    $item.click(function(){
      usingItemId = 2;
      usingItem = true;
      $(this).css({"background-color":"Coral"});
    });
  }else if (item_id === 3){
    $item = $("<img class = 'item' id = 'item3' src = 'assets/images/Item_Cord.png'>");
    $item.click(function(){
      usingItemId = 3;
      usingItem = true;
      $(this).css({"background-color":"Coral"});
    });
  }
  $inventory.append($item);
}

function useItem() {
  if (usingItem){
    let texture;
    if (usingItemId === 0){
      texture = ITEM_SCREWDRIVER;
      usingScrewDriver = true;
    }else if (usingItemId === 1){
      texture = ITEM_FUSE;
      usingFuse = true;
    }else if (usingItemId === 2){
      texture = ITEM_MUG;
      usingMug = true;
    }else if (usingItemId === 3){
      texture = ITEM_CORD;
      usingCord = true;
    }
    usingItem = true;
    image(texture,mouseX,mouseY,height/8,height/8);
  }
}

function dropItem(){
  $("#item"+usingItemId).css({"background-color":"white"});
  usingItemId = -1;
  usingItem = false;
  setTimeout(function(){
    usingScrewDriver = false;
    usingFuse = false;
    usingMug = false;
    usingCord = false;
  },250);
}

function removeItem(id){
  dropItem();
  $(`#item${id}`).remove();
}
