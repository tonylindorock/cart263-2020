"use strict";

/*****************

R.V.B.K.G. (Random Video By Keyword Generator)
Yichen Wang

In the near future (retro), Random Video By Keyword Generator is the new way to produce videos on the Internet.
It is the most advanced AI-HUMAN intergated system. By randomly generating keywords, the system will
create a prfessional video using unique, commercial-use resources.

It is widely used by all of the amateur and professional video makers around the globe. The pricing for
this service is also really reasonable for anyone who wants to make videos for a living.

So what are you waiting for? Come and get the R.V.B.K.G. software right now and start making some videos!
******************/

// colors
/*
const RED;
const BLUE;
const GREEN;
const YELLOW;
const ORANGE; */

// custom font
// https://webfonts.ffonts.net/04b03.font.download
let myFont;

function preload(){
  myFont = loadFont("assets/webfonts_04b03/04b03.ttf.woff");
}

function setup(){
  createCanvas(windowWidth,windowHeight);
  background("#262626");

  textFont(myFont);
  fill(255);
  text("HELLO",windowWidth/2,windowHeight/2);
}

function draw(){

}

function displayStaticUI(){

}
