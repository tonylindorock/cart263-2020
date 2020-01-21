"use strict";

/********************************************************************

Raving Redactionist
Yichen Wang

Hide those secrets!

*********************************************************************/

let $spans; // to store all the span texts
let $secrets; // to store all the span secrets
let secretsFound = 0; // num of secrts found by user
let secretsTotal; // num of total secrets

let NUM_REDACTED = 13 // num of redacted texts
let revealed = 0; // num of revealed texts

let UPDATE_TIME = 500; // 500 milisec update time

let timer; // to store interval

$(document).ready(setup);

// setup
//
// intitalize variables
// setup the window and UI
function setup() {
  // store variables
  $spans = $("span");
  $secrets = $(".secret");

  $(".ending").hide(); // hide the end screen text

  console.log("Weeeee!");

  // get the num of total secret words and give it to the ui text
  secretsTotal = $secrets.length;
  $("#secrets-total").text(secretsTotal);

  // mouseover event handler for each secret word
  $secrets.on('mouseover',onMouserover);

  // create interval
  timer = setInterval(update,UPDATE_TIME);
  $spans.on('click',spanClicked); // click handler for each span text
}

// update
//
// update the span text
function update(){
  // find span text to update excluding secret words and ui element
  $spans.not(".secret").not(".found").not(".ui").each(updateSpan);
  console.log("Updated!");

  // if all the texts are revealed, game will be over
  if (revealed === NUM_REDACTED){
    clearInterval(timer); // stop interval
    gameOver();
  }
}

// updateSpan
//
// update the span with a 10% possibility
function updateSpan(){
  // possibility
  let p = Math.random();
  // < 10%
  if (p < 0.1){
    // if the span text is covered, reveal it
    if ($(this).hasClass("redacted")){
      $(this).removeClass("redacted").addClass("revealed");
      revealed++; // increment revealed text num
    }
  }
  console.log("Span updated!");
}

// spanClicked
//
// cover the text when clicked
function spanClicked(){
  // if the span text is revealed, with a click, update the num of revealed texts
  if ($(this).hasClass("revealed")){
    revealed--;
  }
  // cover the span text
  $(this).not(".found").removeClass("revealed").addClass("redacted");
}

// onMouserover
//
// if the mouse is over the secret word, highlight it
function onMouserover(){
  // highlighting
  $(this).removeClass("secret").addClass("found");
  $(this).off('mouseover'); // it is found so no more mouseover handling
  secretsFound++; // increment the num of found secrets
  $("#secrets-found").text(secretsFound); // update the ui
}

// gameOver
//
// play an animation when the game is over
function gameOver(){
  // animation
  $("p").slideToggle(UPDATE_TIME);
  $(".ending").show();
}
