"use strict";

/********************************************************************

Raving Redactionist
Yichen Wang

Hide those secrets!

*********************************************************************/

let $spans;

$(document).ready(setup);

function setup() {
  $spans = $("span");
  console.log("Weeeee!");

  setInterval(update,500);
  $spans.on('click',spanClicked);
}

function update(){
  $spans.each(updateSpan);
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
