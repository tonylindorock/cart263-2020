"use strict";

/********************************************************************

Drag Me Here
Yichen Wang

This is a template. Fill in the title, author, and this description
to match your project! Write JavaScript to do amazing things below!

*********************************************************************/

$(document).ready(setup);
let $square;

function setup(){
  console.log("Weeee!");

  $square = $(".draggable");

  $square.draggable();
  $square.on('mousedown',dragging);
  $square.on('mouseup',reset);
  $square.on('dragstop',reset);
}

function dragging(){
  $square.css({
    cursor: 'grabbing'
  });
}

function reset(){
  $square.css({
    top: '40%',
    left: '15%',
    cursor: 'grab'
  });
}
