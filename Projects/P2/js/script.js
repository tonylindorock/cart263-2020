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
const YELLOW = "#ffff4b";
const GREEN = "#4bffaf";
const BLUE = "#4bafff";

const INTRO = "If this is your first time using this system, please read the instruction."
+"\n\n1) R.K.B.V.G. is the new way to make an online video. By choosing"
+"\nany 5 keywords provided, you can ask the advanced A.I. to generate"
+"\na professional video based on those random keywords."
+"\n\n2) Keywords are provided as cards because it is fun. You will"
+"\nget free 5 keyword cards for each video making session, but any"
+"\nadditional cards will be charged. You also will get some special"
+"\ncards because we give our royal users a lot of benefits."
+"\n\n3) You will have to play around the system to fully grasp the"
+"\ntrick of how it works. So good luck!"
+"\n\n4) And be sure not to violate the Online Content Policy, and"
+"\nany of those violations will have consequences. But do not"
+"\nworry. We will provide guidance throughout your whole video"
+"\nproduction adventure."
+"\n\n5) R.K.B.V.G. is a subscription service which is charged $100/month."
+"\nMake sure that you have enough money before the next billing cycle.";
const OTHER_INFO = "** About voice control **"
+"\n\nThis system equiped the latest voice command system";
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

  focusPosX = width / 2;
  focusPosY = height / 2 + height / 8;
  focusWidth = width / 4;
  focusHeight = height / 12;

  card = new Card(0,"Special",RED);
  card1 = new Card(1,"Rape",RED);
  card2 = new Card(2,"Dead",RED);
  card3 = new Card(3,"Blood",RED);
  card4 = new Card(4,"Die",RED);
}

function draw() {
  if (State === "START"){
    startScreen();

  }else if (State === "TUTORIAL"){
    displayTutorial();

  }else if (State === "PLAY"){
    displayStaticUI();
    displayDynamicUI();
  }
  displayStatusBar();
  displayFocus();
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
  fill(255);
  rect(width / 2, height / 2 + height / 8, width / 4, height / 12);
  fill(0);
  textSize(32);
  text("RUN", width / 2, height / 2 + height / 8);
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

function displayStatusBar(){
  push();
  rectMode(CORNER);
  textSize(32);
  fill(255);
  rect(0, 0, width, height / 20);
  fill(0);
  textAlign(LEFT, CENTER);
  text("GM", 48, height / 48);
  textAlign(RIGHT, CENTER);
  text("JAN 01", width - 48, height / 48);
  pop();
}

function displayTutorial(){
  push();
  rectMode(CENTER);
  textAlign(CENTER, CENTER);
  fill("#262626");
  rect(width / 2, height / 2, height, height);
  fill(RED);
  textSize(48);
  text("R.K.B.V.G.",width/2, height/8);

  fill(255);
  textSize(16);
  if (tutorialIndex === 0){
    text(INTRO,width/2, height / 2);
    rect(width / 2, height - height/12, width / 4, height / 12);
    textSize(32);
    fill(0);
    text("NEXT",width / 2, height - height/12);
  }else{
    rect(width / 2, height - height/12, width / 4, height / 12);
    text(OTHER_INFO,width/2, height / 2);
    textSize(32);
    text("PREV", width / 8, height - height/12);
    fill(0);
    text("OKAY",width / 2, height - height/12);
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
  text("$"+money, width/2, height / 20 + height / 24);

  // views, fans, rating, video num

  pop();
}

function displayDynamicUI() {
  card.display();
  card1.display();
  card2.display();
  card3.display();
  card4.display();
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    if (State === "PLAY") {

    }
  } else if (keyCode === DOWN_ARROW) {
    if (State === "PLAY") {

    }
  } else if (keyCode === LEFT_ARROW) {
    if (State === "TUTORIAL" && tutorialIndex === 1) {
      if (focusXAxis === 1){
        focusXAxis = 0;
        focusWidth = width / 4 - 48;
        changeFocus(width / 8, height - height/12);
      }
    }else if (State === "PLAY") {

    } else if (State === "NOTE") {

    }
  } else if (keyCode === RIGHT_ARROW) {
    if (State === "TUTORIAL" && tutorialIndex === 1) {
      if (focusXAxis === 0){
        focusXAxis = 1;
        focusWidth = width / 4;
        changeFocus(width / 2, height - height/12);
      }
    }if (State === "PLAY") {

    }else if (State === "NOTE") {

    }
  } else if (keyCode === 32) {
    if (State === "START") {
      State = "TUTORIAL";
      changeFocus(width / 2, height - height/12);
    }else if (State === "TUTORIAL") {
      if (tutorialIndex === 0){
        tutorialIndex = 1;
        focusXAxis = 1;
      }else{
        if (focusXAxis === 0){
          tutorialIndex = 0;
          focusWidth = width / 4;
          changeFocus(width / 2, height - height/12);
        }else if (focusXAxis === 1){
          State = "PLAY";
          changeFocus(0,0);
          card.focus = true;
        }
      }
    } else if (State === "PLAY") {
      card.use();
    } else if (State === "NOTE") {

    }
  }
  return false;
}

function changeFocus(targetX,targetY){
  focusPosX = targetX;
  focusPosY = targetY;
}

function displayFocus() {
  push();
  rectMode(CENTER);
  stroke(BLUE);
  strokeWeight(8);
  fill(255,0);
  rect(focusPosX, focusPosY, focusWidth, focusHeight);
  pop();
}
