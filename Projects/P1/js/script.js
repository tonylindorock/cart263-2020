"use strict";

/********************************************************************

Drag Me Here
Yichen Wang

This is a template. Fill in the title, author, and this description
to match your project! Write JavaScript to do amazing things below!

*********************************************************************/

$(document).ready(setup);
let $square;
let $area;
let $boundary;
let $text;

let isDragging = false;
let preText;

function setup(){
  console.log("Weeee!");

  $square = $(".draggable");
  $area = $(".des-loc");
  $boundary = $(".boundary");
  $text = $("#help");

  $square.draggable({
    containment: "window",
    revert: true,
    revertDuration: 200
  });

  $area.on('mouseover',function(){
    if (preText === null){
      preText = $text.innerHTML;
    }
    $text.text("This is the area where you put the square");
  });
  $area.on('mouseout',function(){
    $text.text(preText);
  });

  $square.on('mousedown',dragging);
  $square.on('mouseup',reset);
  $square.on('dragstop',reset);

  $boundary.on('mouseover',spawnWalls);

  $("body").mouseleave(function(){
    if (isDragging){
      revert();
      $text.text("You can't leave the window!");
    }
  });
}

function dragging(){
  $square.css({
    cursor: 'grabbing'
  });
  isDragging = true;
  $text.text("Just drag it to there...");
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

    $text.text("A wall appeared! Click to get rid of it!");
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

  $text.text("Great! You get rid of the wall!");
}
