"use strict";

/*****************

R.V.B.K.G. (Random Video By Keywords Generator)
Yichen Wang

In the near future (retro), Random Video By Keywords Generator is the new way to produce videos on the Internet.
It is the most advanced AI-HUMAN intergated system. By randomly generating keywords, the system will
create a prfessional video using unique, commercial-use resources.

It is widely used by all of the amateur and professional video makers around the globe. The pricing for
this service is also really reasonable for anyone who wants to make videos for a living.

So what are you waiting for? Come and get the R.V.B.K.G. software right now and start making some videos!
******************/

// colors
const RED = "#ff4b4b";
const ORANGE = "#ffaf4b";
const YELLOW = "#ffff4b";
const GREEN = "#4bffaf";
const BLUE = "#4bafff";

// custom font
// https://webfonts.ffonts.net/04b03.font.download
let myFont;

function preload() {
  myFont = loadFont("assets/webfonts_04b03/04b03.ttf.woff");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  noStroke();
  textFont(myFont);
  textSize(32);
  textAlign(CENTER,CENTER);
}

function draw() {
  startScreen();
  displayStaticUI();
}

function startScreen() {
  rectMode(CENTER);
  fill("#262626");
  rect(width / 2, height / 2, height, height);

  fill(YELLOW);
  textSize(64);
  text("R.V.B.K.G.",width / 2, height / 2 - 48);
  fill(255);
  textSize(16);
  text("Random Video By Keywords Generator",width / 2, height / 2);
  fill(255);
  rect(width / 2, height / 2 + 128, width/8, height/10);
  fill(0);
  textSize(32);
  text("start",width / 2, height / 2 + 128);
  fill(255);
  textSize(16);
  text("a keyboard only navigation system",width / 2, height / 2 + 192);
  text("version 2.0.2",width / 2, height / 2 - 192);
}

function displayStaticUI() {

}
