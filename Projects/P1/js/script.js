"use strict";

/********************************************************************

Drag Me Here
Yichen Wang

Is Drag Me Here a game? It could be... or it could be an experience
that makes you reconsider your life choices.

You get to drag a square to a destinated area. Can you do it? I don't
know.
*********************************************************************/

let $scene0;
let $scene1;

let $square; // variable for the draggable square
let $startArea;
let $area; // variable for the dropping area
let $boundary; // varibale for the boundary
let $text; // variable for the ui hint
let $counter;
let score = 0;

let isDragging = false; // if the square is being dragged
let timer;
let timerAnimText;

const SOUND_DRAG = new Audio("assets/sounds/Drag.mp3");
const SOUND_WALL = new Audio("assets/sounds/Wall.mp3");

$(document).ready(setup);

// setup()
//
// initiate pointers for the elements
// make square draggable
// set up listeners
function setup(){
  console.log("Weeee!");
  $scene0 = $("#scene-0");
  $scene1 = $("#scene-1").hide();

  // initiate variables
  $square = $(".draggable");
  $startArea = $(".smaller-des-loc");
  $area = $(".des-loc");
  $boundary = $(".boundary");
  $text = $("#help");
  $counter = $("#counter");

  SOUND_DRAG.volume = 0.2;
  SOUND_WALL.volume = 0.2;

  setInterval(function(){
    if ($("#smaller-text-start").text() === "START"){
      $("#smaller-text-start").text("HERE");
    }else{
      $("#smaller-text-start").text("START");
    }
  },500);

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

  $area.on('click',function(){
    changeHelpTo("This is the area where you drop the square");
  });
  $startArea.droppable({
    accept: ".draggable",
    drop: startGame
  })

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

function showScene(id){
  if (id===0){
    $scene0.show();
    $scene1.hide();
  }else if (id===1){
    $scene0.hide();
    $scene1.show();
    changeHelpTo("Drag the blue square to the outlined area");
  }
}

function startGame(){
  console.log("Game running...")
  showScene(1);
}

function textAnimation(){
  $text.animate({
    color: 'white'
  },150);
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
  SOUND_DRAG.play();
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
    $("#scene-1").append(newWall);

    reset();
    $(document).trigger("mouseup");
    console.log("Square lost!");

    changeHelpTo("A wall appeared! Click to get rid of it!");
    SOUND_WALL.currentTime = "0";
    SOUND_WALL.play();
  }
  $(".wall").on("mouseover",revert);
}

function revert(){
  reset();
  $(document).trigger("mouseup");
  console.log("Square lost!");
}

function deleteWalls(){
  let animText = document.createElement('div');
  animText.setAttribute("id","animated-text");
  animText.innerHTML = "+1";
  let pos = $(this).css("top");
  animText.style.top = pos;
  animText.style.zIndex = "2";
  $("#scene-1").append(animText);

  $(this).remove();
  clearTimeout(timer);
  changeHelpTo("Great! You got rid of the wall!");
  timerAnimText = setTimeout(function(){
    $("#animated-text").remove();
    score++;
    $counter.text(score);
  },500);
  timer = setTimeout(changeHelpTo,1000,"Now, drag it again!");


}
