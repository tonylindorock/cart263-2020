"use strict";

/********************************************************************

Drag Me Here
Yichen Wang

Is Drag Me Here a game? It could be... or it could be an experience
that makes you reconsider your life choices.

You get to drag a square to a destinated area. Can you do it? I don't
know.
*********************************************************************/

let $square; // variable for the draggable square
let $area; // variable for the dropping area
let $boundary; // varibale for the boundary
let $text; // variable for the ui hint

let isDragging = false; // if the square is being dragged

$(document).ready(setup);

// setup()
//
// initiate pointers for the elements
// make square draggable
// set up listeners
function setup(){
  console.log("Weeee!");

  // initiate variables
  $square = $(".draggable");
  $area = $(".des-loc");
  $boundary = $(".boundary");
  $text = $("#help");

  textAnimation();

  // make the square draggable only within the window
  // it can return to its original place if the user gives up
  $square.draggable({
    containment: "window",
    revert: true,
    revertDuration: 200
  });

  // square handling events
  $square.on('mousedown',dragging);
  $square.on('mouseup',reset);
  $square.on('dragstop',reset);

  // handling event for boundary
  $boundary.on('mouseover',spawnWalls);

  // handling event for body
  $("body").mouseleave(function(){
    if (isDragging){
      // if users are dragging square out of the window, let them regret
      revert();
      changeHelpTo("You can't leave the window!");
    }
  });
}

function textAnimation(){
  $text.animate({
    color: 'white'
  },100);
}

function changeHelpTo(text){
  $text.css({color:'gold'});
  $text.text(text);
  textAnimation();
}

function dragging(){
  $square.css({
    cursor: 'grabbing'
  });
  isDragging = true;
  changeHelpTo("Just drag it to there...");
}

function reset(){
  $square.css({
    cursor: 'grab'
  });
  isDragging = false;
}

// spawnWalls()
//
// spawn a wall if the mouse is too close to the right
function spawnWalls(){
  if (isDragging){
    console.log("A wall appeared!");

    let pos = (event.clientY / window.innerHeight) * 100;
    pos = pos.toString()+"%";
    let newWall = document.createElement('div');
    newWall.setAttribute("class","wall");
    newWall.addEventListener("click",deleteWalls);
    newWall.style.top = pos;
    $('body').append(newWall);

    reset();
    $(document).trigger("mouseup");
    console.log("Square lost!");

    changeHelpTo("A wall appeared! Click to get rid of it!");
  }
  $(".wall").on("mouseover",revert);
}

function revert(){
  reset();
  $(document).trigger("mouseup");
  console.log("Square lost!");
}

function deleteWalls(){
  $(this).remove();

  changeHelpTo("Great! You get rid of the wall!");
}
