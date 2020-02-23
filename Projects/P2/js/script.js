"use strict";

/*****************

R.K.B.V.G. (Random Keywords Based Video Generator)
Yichen Wang

In the near future (retro), Random Keywords Based Video Generator is the new way to produce videos on the Internet.
It is the most advanced AI-HUMAN intergated system. By randomly generating keywords, the system will
create a prfessional video using unique, commercial-use resources.

It is widely used by all of the amateur and professional video makers around the globe. The pricing for
this service is also really reasonable for anyone who wants to make videos for a living.

So what are you waiting for? Come and get the R.K.B.V.G. software right now and start making some videos!
******************/

// colors
const RED = "#ff6464";
const ORANGE = "#ffaf4b";
const YELLOW = "#ffe600";
const GREEN = "#33de7a"; //  #4bffaf
const BLUE = "#4bafff";

const INTRO = "If this is your first time using this system, please read the instruction." +
  "\n\n1) R.K.B.V.G. is the new way to make an online video. By choosing" +
  "\nany 5 keywords provided, you can ask the advanced A.I. to generate" +
  "\na professional video for you based on those random keywords" +
  "\nusing unique, commercial-use resources." +
  "\n\n2) Keywords are provided as cards because it is fun. You will" +
  "\nget free 5 keyword cards for each video making session, but any" +
  "\nadditional cards will be charged. You also will get some free special" +
  "\ncards because we give our royal users a lot of benefits." +
  "\n\n3) You will have to play around the system to fully grasp the" +
  "\ntrick of how it works. So good luck!" +
  "\n\n4) And be sure not to violate the Online Content Policy, and" +
  "\nany of those violations will have consequences. But do not" +
  "\nworry. We will provide guidance throughout your whole video" +
  "\nproduction adventure." +
  "\n\n5) R.K.B.V.G. is a subscription service which is charged $100/month." +
  "\nMake sure that you have enough money in your account before" +
  "\nthe next billing cycle.";
const OTHER_INFO = "** About voice control **" +
  "\n\nThis system equiped the latest voice command system";
let tutorialIndex = 0;

// determine current display content
let State = "START";

let focusPosX = 0;
let focusPosY = 0;
let focusWidth = 0;
let focusHeight = 0;
let focusXAxis = 0;
let focusYAxis = 0;

let card;
let card1;
let card2;
let card3;
let card4;
let cards = [];
let cardIndex = 0;
let noCardsAvailable = false;

let note;
let stats;
let videoInterface;

let startProgressBar;

let money = 1000;

// custom font
// https://webfonts.ffonts.net/04b03.font.download
let myFont;

function preload() {
  myFont = loadFont("assets/webfonts_04b03/04b03.ttf.woff");
}

function setup() {
  createCanvas(windowHeight, windowHeight);
  background(0);
  noStroke();
  textFont(myFont);
  textSize(32);
  textAlign(CENTER, CENTER);

  setupFocus();
  setupCards();

  note = new Notification(0, 0);
  stats = new Stats();
  videoInterface = new Interface();

  startProgressBar = new ProgressBar(width / 2, height / 2 + height / 8, RED);
  startProgressBar.start = true;
}

function setupFocus(){
  focusPosX = width / 2;
  focusPosY = height / 2 + height / 8;
  focusWidth = width / 4;
  focusHeight = height / 12;
}

function setupCards(){
  card = new Card(0);
  card1 = new Card(1);
  card2 = new Card(2);
  card3 = new Card(3);
  card4 = new Card(4);
  cards.push(card);
  cards.push(card1);
  cards.push(card2);
  cards.push(card3);
  cards.push(card4);
}

function draw() {
  if (State === "START") {
    startScreen();
  } else if (State === "TUTORIAL") {
    displayTutorial();
    displayFocus();
  } else if (State === "PLAY") {
    displayStaticUI();
    displayDynamicUI();
    displayFocus();
  }
  displayStatusBar();
}

function startScreen() {
  push();
  rectMode(CENTER);
  fill("#262626");
  rect(width / 2, height / 2, height, height);

  fill(RED);
  textSize(64);
  text("R.K.B.V.G.", width / 2, height / 2 - 48);
  fill(255);
  textSize(16);
  text("Random Keywords Based Video Generator", width / 2, height / 2);

  startProgressBar.display();
  if (startProgressBar.done) {
    fill(255);
    rect(width / 2, height / 2 + height / 8, width / 4, height / 12);
    fill(0);
    textSize(32);
    text("RUN", width / 2, height / 2 + height / 8);
    displayFocus();
  }

  fill(255);
  textSize(16);
  text("* a keyboard only navigation system *", width / 2, height / 2 + height / 4);
  text("version 2.0.2", width / 2, height / 2 - height / 4);
  fill(ORANGE);
  text("DEVELOPED BY GOOD MEDIA INC.", width / 2, height / 2 - height / 4 - 24);
  fill(GREEN);
  text("left - up - right - down - space", width / 2, height / 2 + height / 4 + 24);
  pop();
}

function displayStatusBar() {
  push();
  rectMode(CORNER);
  textSize(32);
  fill(255);
  rect(0, 0, width, height / 20);
  fill(0);
  textAlign(LEFT, CENTER);
  text("@GM", 48, height / 48);
  textAlign(RIGHT, CENTER);
  text("MAR W1 D1", width - 48, height / 48);
  pop();
}

function displayTutorial() {
  push();
  rectMode(CENTER);
  textAlign(CENTER, CENTER);
  fill("#262626");
  rect(width / 2, height / 2, height, height);
  fill(RED);
  textSize(48);
  text("ABOUT R.K.B.V.G.", width / 2, height / 8 - 16);

  fill(255);
  textSize(16);
  if (tutorialIndex === 0) {
    text(INTRO, width / 2, height / 2);
    rect(width / 2, height - height / 12, width / 4, height / 12);
    textSize(32);
    fill(0);
    text("NEXT", width / 2, height - height / 12);
  } else {
    rect(width / 2, height - height / 12, width / 4, height / 12);
    text(OTHER_INFO, width / 2, height / 2);
    textSize(32);
    text("PREV", width / 8, height - height / 12);
    fill(0);
    text("OKAY", width / 2, height - height / 12);
  }
  pop();
}

function displayStaticUI() {
  push();
  rectMode(CENTER);
  // BG
  fill("#262626");
  rect(width / 2, height / 2, height, height);

  // red money bar
  rectMode(CORNER);
  textSize(32);
  fill(RED);
  rect(0, height / 20, width, height / 12);
  fill(255);
  textAlign(CENTER, CENTER);
  text("USER  - $" + money, width / 2, height / 20 + height / 24);

  // views, fans, rating, videos
  stats.display();

  // interface
  videoInterface.display();

  // 2 buttons
  rectMode(CENTER);
  fill(255);
  rect(width / 2 - width / 8 - 12, height - height / 4, width / 4, height / 12);
  rect(width / 2 + width / 8 + 12, height - height / 4, width / 4, height / 12);
  fill(0);
  textSize(32);
  text("SWAP ALL", width / 2  - width / 8 - 12, height - height / 4);
  text("ACCEPT", width / 2  + width / 8 + 12, height - height / 4);
  pop();
}

function displayDynamicUI() {
  for(let i = 0; i < cards.length; i ++){
    cards[i].display();
  }
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    if (State === "PLAY") {
      // if focusing on cards, change to focusing on ACCEPT
      if (focusYAxis === 0){
        focusYAxis = 1;
        focusXAxis = 1;
        changeFocus(width / 2 + width / 8 + 12, height - height / 4, 0);
        selectCard(-1);
      }
    }
  } else if (keyCode === DOWN_ARROW) {
    if (State === "PLAY") {
      // if focusing on buttons, change to focusing on CARD 0
      if (focusYAxis === 1 && !noCardsAvailable){
        focusYAxis = 0;
        focusXAxis = 2;
        changeFocus(card.x, card.yFocused, 2);
        selectCard(focusXAxis);
      }
    }
  } else if (keyCode === LEFT_ARROW) {
    // if focusing on OKAY in TUTORIAL 1, change to focusing on PREV
    if (State === "TUTORIAL" && tutorialIndex === 1) {
      if (focusXAxis === 1) {
        focusXAxis = 0;
        changeFocus(width / 8, height - height / 12, 1);
      }
    } else if (State === "PLAY") {
      // if focusing on ACCEPT, change to focusing on SWAP ALL
      if (focusYAxis === 1){
        if (focusXAxis === 1){
          focusXAxis = 0;
          changeFocus(width / 2 - width / 8 - 12, height - height / 4, 0);
        }
      // cards
      }else if (focusYAxis === 0){
        if (focusXAxis > 0){
          focusXAxis --;
          selectCard(focusXAxis);
        }
      }
    } else if (State === "NOTE") {

    }
  } else if (keyCode === RIGHT_ARROW) {
    // if focusing on PREV in TUTORIAL 1, change to focusing on OKAY
    if (State === "TUTORIAL" && tutorialIndex === 1) {
      if (focusXAxis === 0) {
        focusXAxis = 1;
        changeFocus(width / 2, height - height / 12, 0);
      }
    }
    if (State === "PLAY") {
      // if focusing on SWAP ALL, change to focusing on ACCEPT
      if (focusYAxis === 1){
        if (focusXAxis === 0){
          focusXAxis = 1;
          changeFocus(width / 2 + width / 8 + 12, height - height / 4, 0);
        }
      // cards
      }else if (focusYAxis === 0){
        if (focusXAxis < 4){
          focusXAxis ++;
          selectCard(focusXAxis);
        }
      }
    } else if (State === "NOTE") {

    }
  // Pressing SPACE
  } else if (keyCode === 32) {
    // if focusing on RUN in START, change to focusing on NEXT
    if (State === "START") {
      if (startProgressBar.done) {
        State = "TUTORIAL";
        changeFocus(width / 2, height - height / 12, 0);
      }
    // if focusing on RUN in TUTORIAL -
    } else if (State === "TUTORIAL") {
      // TUTORIAL 0, change to focusing on OKAY
      if (tutorialIndex === 0) {
        tutorialIndex = 1;
        focusXAxis = 1;
        changeFocus(width / 2, height - height / 12, 0);
      // TUTORIAL 1
      } else if (tutorialIndex === 1) {
        // if focusing on PREV, change to focusing on OKAY in TUTORIAL 1
        if (focusXAxis === 0) {
          tutorialIndex = 0;
          changeFocus(width / 2, height - height / 12, 0);
        // if focusing on OKAY, change to focusing on - in PLAY
        } else if (focusXAxis === 1) {
          State = "PLAY";
          focusYAxis = 0;
          focusXAxis = 0;
          selectCard(0);
        }
      }
    } else if (State === "PLAY") {
      // if focusing on buttons
      if (focusYAxis === 1){
        // if focusing on ACCEPT
        if (focusXAxis === 1){
          // if uploading is finished
          if (!videoInterface.uploading){
            acceptAllCards(); // play the animtion
            videoInterface.progressBar.reset(); // reset progress bar
            videoInterface.upload(); // play the upload animation
            setTimeout(resetCards,2500); // reset cards
          }
        }else if (focusXAxis === 0){
          swapAllCards();
        }
      }else if (focusYAxis === 0){
        if (!cards[cardIndex].swaped){
          swapCard(cardIndex);
        }
        // solve the issue which the card stays selected after the player change to another card before the previous card resets
        let lastCard = cardIndex;
        setTimeout(function(){
          if (cardIndex === lastCard){
            selectCard(lastCard);
          }else{
            selectCard(cardIndex);
          }
        },300);
      }
    } else if (State === "NOTE") {

    }
  }
  return false;
}

function selectCard(id){
  let lastCard = cardIndex;
  cardIndex = id;
  if (lastCard === 0){
    card.focus = false;
  }else if (lastCard === 1){
    card1.focus = false;
  }else if (lastCard === 2){
    card2.focus = false;
  }else if (lastCard === 3){
    card3.focus = false;
  }else if (lastCard === 4){
    card4.focus = false;
  }
  if (id === 0){
    card.focus = true;
    changeFocus(card.x,card.yFocused,2);
  }else if (id === 1){
    card1.focus = true;
    changeFocus(card1.x,card1.yFocused,2);
  }else if (id === 2){
    card2.focus = true;
    changeFocus(card2.x,card2.yFocused,2);
  }else if (id === 3){
    card3.focus = true;
    changeFocus(card3.x,card3.yFocused,2);
  }else if (id === 4){
    card4.focus = true;
    changeFocus(card4.x,card4.yFocused,2);
  }
  if (id === -1){
    card.focus = false;
    card1.focus = false;
    card2.focus = false;
    card3.focus = false;
    card4.focus = false;
  }
}

function swapCard(id){
  if (id === 0){
    card.swap();
  }else if (id === 1){
    card1.swap();
  }else if (id === 2){
    card2.swap();
  }else if (id === 3){
    card3.swap();
  }else if (id === 4){
    card4.swap();
  }
}

function swapAllCards(){
  if (!cards[0].swaped){
    for(let i = 0; i < cards.length; i++){
      cards[i].swap();
    }
  }
}

function acceptAllCards(){
  for(let i = 0; i < cards.length; i++){
    cards[i].accept();
  }
  noCardsAvailable = true;
}

function resetCards(){
  for(let i = 0; i < cards.length; i++){
    cards[i].reset();
  }
  noCardsAvailable = false;
}

function changeFocus(targetX, targetY, sizeId) {
  focusPosX = targetX;
  focusPosY = targetY;
  // button
  if (sizeId === 0) {
    focusWidth = width / 4;
    focusHeight = height / 12;
  // button text only
  } else if (sizeId === 1) {
    focusWidth = width / 4 - 48;
    focusHeight = height / 12;
  // card
  }else if (sizeId === 2) {
    focusWidth = width/6;
    focusHeight = height/4;
  }
}

function displayFocus() {
  push();
  rectMode(CENTER);
  stroke(BLUE);
  strokeWeight(8);
  fill(255, 0);
  rect(focusPosX, focusPosY, focusWidth, focusHeight);
  pop();
}
