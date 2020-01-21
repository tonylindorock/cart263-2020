"use strict";

/********************************************************************

Raving Redactionist
Yichen Wang

Hide those secrets!

*********************************************************************/

let $spans;
let $secrets;
let secretsFound;
let secretsTotal;

$(document).ready(setup);

function setup() {
  $spans = $("span");
  $secrets = $(".secret");
  console.log("Weeeee!");

  secretsTotal = $secrets.length;
  $("#secrets-total").text(secretsTotal);
  $secrets.on('mouseover',onMouserover);

  setInterval(update,500);
  $spans.on('click',spanClicked);
}

function update(){
  $spans.not(".secret").not(".ui").each(updateSpan);
  console.log("Updated!");
}

function updateSpan(){
  let p = Math.random();
  if (p < 0.1){
    $(this).removeClass("redacted");
    $(this).addClass("revealed");
  }
  console.log("Span updated!");
}

function spanClicked(){
  $(this).removeClass("revealed");
  $(this).addClass("redacted");
}

function onMouserover(){
  
}
