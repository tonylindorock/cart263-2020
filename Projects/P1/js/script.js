"use strict";

/********************************************************************

Drag Me Here
Yichen Wang

This is a template. Fill in the title, author, and this description
to match your project! Write JavaScript to do amazing things below!

*********************************************************************/

let $square; // variable for the draggable square
let $area; // variable for the dropping area
let $boundary; // varibale for the boundary
let $text; // variable for the ui hint

let isDragging = false;

$(document).ready(setup);

function setup(){
  console.log("Weeee!");

  $square = $(".draggable");
  $area = $(".des-loc");
  $boundary = $(".boundary");
  $text = $("#help");

  textAnimation();

  $square.draggable({
    containment: "window",
    revert: true,
    revertDuration: 200
  });

  $area.on('mouseover',function(){
    changeHelpTo("This is the area where you drop the square");
  });
  $area.on('mouseout',function(){
    changeHelpTo("Drag the grey square to the outlined area");
  });

  $square.on('mousedown',dragging);
  $square.on('mouseup',reset);
  $square.on('dragstop',reset);

  $boundary.on('mouseover',spawnWalls);

  $("body").mouseleave(function(){
    if (isDragging){
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

// spawnWalls
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

function deleteWalls(e){
  let wall = e.target;
  wall.remove();

  changeHelpTo("Great! You get rid of the wall!");
}
