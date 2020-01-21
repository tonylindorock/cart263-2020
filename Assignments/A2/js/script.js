"use strict";

/********************************************************************

Raving Redactionist
Yichen Wang

Hide those secrets!

*********************************************************************/

let $spans;
let $secrets;
let secretsFound = 0;
let secretsTotal;

let NUM_REDACTED = 13
let revealed = 0;

let UPDATE_TIME = 500;

let timer;

$(document).ready(setup);

function setup() {
  $spans = $("span");
  $secrets = $(".secret");

  $(".ending").hide();

  console.log("Weeeee!");

  secretsTotal = $secrets.length;
  $("#secrets-total").text(secretsTotal);
  $secrets.on('mouseover',onMouserover);

  timer = setInterval(update,UPDATE_TIME);
  $spans.on('click',spanClicked);
}

function update(){
  $spans.not(".secret").not(".found").not(".ui").each(updateSpan);
  console.log("Updated!");

  if (revealed === NUM_REDACTED){
    gameOver();
    clearInterval(timer);
  }
}

function updateSpan(){
  let p = Math.random();
  if (p < 0.1){
    if ($(this).hasClass("redacted")){
      $(this).removeClass("redacted").addClass("revealed");
      revealed++;
    }
  }
  console.log("Span updated!");
}

function spanClicked(){
  if ($(this).hasClass("revealed")){
    revealed--;
  }
  $(this).not(".found").removeClass("revealed").addClass("redacted");
}

function onMouserover(){
  $(this).removeClass("secret").addClass("found");
  $(this).off('mouseover');
  secretsFound++;
  $("#secrets-found").text(secretsFound);
}

function gameOver(){
  $("p").slideToggle(UPDATE_TIME);
  $(".ending").show();
}
