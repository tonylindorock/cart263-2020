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
let $btn1;
let $btn2;
let $btn3;
let $btn4;

let score = 100;
let pointPerWall = 1;
let canGoOffWindow = false;

let isDragging = false; // if the square is being dragged
let timer;
let timerAnimText;
let usingLadder = false;

const SOUND_DRAG = new Audio("assets/sounds/Drag.mp3");
const SOUND_WALL = new Audio("assets/sounds/Wall.mp3");

$(document).ready(setup);

// setup()
//
// initiate pointers for the elements
// make square draggable
// set up listeners
function setup() {
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
  $btn1 = $("#btn-1").button({
    classes: "ui-button"
  });
  $btn2 = $("#btn-2").button({
    classes: "ui-button"
  });
  $btn3 = $("#btn-3").button({
    classes: "ui-button"
  });
  $btn4 = $("#btn-4").button({
    classes: "ui-button"
  });

  updateButtons();

  SOUND_DRAG.volume = 0.2;
  SOUND_WALL.volume = 0.2;

  setInterval(function() {
    if ($("#smaller-text-start").text() === "START") {
      $("#smaller-text-start").text("HERE");
    } else {
      $("#smaller-text-start").text("START");
    }
  }, 500);

  // make the square draggable only within the window
  // it can return to its original place if the user gives up
  $square.draggable({
    containment: "window",
    revert: true,
    revertDuration: 200
  });

  // square handling events
  $square.on('mousedown', dragging);
  $square.on('mouseup', reset);
  $square.on('dragstop', reset);

  $area.on('click', function() {
    changeHelpTo("This is the area where you drop the square");
  });
  $area.droppable({
    accept: ".draggable",
    drop: resetGame
  })
  $startArea.droppable({
    accept: ".draggable",
    drop: startGame
  })

  // handling event for boundary
  $boundary.on('mouseover', spawnWalls);

  // handling event for body
  $("body").mouseleave(function() {
    if (isDragging && !canGoOffWindow) {
      // if users are dragging square out of the window, let them regret
      revert();
      changeHelpTo("You can't leave the window!");
    }
  });

  $btn1.click(function() {
    buttonPressed(0);
  });
  $btn2.click(function() {
    buttonPressed(1);
  });
  $btn3.click(function() {
    buttonPressed(2);
  });
  $btn4.click(checkScore);
}

function checkScore(){
  if (score < 20){
    changeHelpTo("Get 20 points to be eligible to buy these items");
  }else{
    changeHelpTo("Buying an item will cost 20 of your score");
  }
}

function showScene(id) {
  if (id === 0) {
    $scene0.show();
    $scene1.hide();
  } else if (id === 1) {
    $scene0.hide();
    $scene1.show();
    changeHelpTo("Drag the blue square to the outlined area");
  }
}

function startGame() {
  console.log("Game running...")
  showScene(1);
}

function resetGame(){
  alert("Oops... Connection lost!");
  revert();
  $(".wall").remove();
  $(".ladder").remove();
  score = 0;
  $counter.text(score);
  canGoOffWindow = false;
  pointPerWall = 1;
  updateButtons();
  changeHelpTo("Drag the blue square to the outlined area");
}

function textAnimation() {
  $text.animate({
    color: 'white'
  }, 150);
}

function changeHelpTo(text) {
  $text.css({
    color: 'gold'
  });
  $text.text(text);
  textAnimation();
}

function dragging() {
  $square.css({
    cursor: 'grabbing'
  });
  isDragging = true;
  changeHelpTo("Just drag it to there...");
  SOUND_DRAG.play();
}

function reset() {
  $square.css({
    cursor: 'grab',
    zIndex: '1'
  });
  isDragging = false;
}

// spawnWalls()
//
// spawn a wall if the mouse is too close to the right
function spawnWalls() {
  if (isDragging) {
    console.log("A wall appeared!");

    let pos = (event.clientY / window.innerHeight) * 100;
    pos = pos.toString() + "%";
    let newWall = document.createElement('div');
    newWall.setAttribute("class", "wall");
    newWall.addEventListener("click", deleteWalls);
    newWall.style.top = pos;
    $("#scene-1").append(newWall);

    reset();
    $(document).trigger("mouseup");
    console.log("Square lost!");

    changeHelpTo("A wall appeared! Click to get rid of it!");
    SOUND_WALL.currentTime = "0";
    SOUND_WALL.play();
  }
  $(".wall").on("mouseover", revert);
}

function revert() {
  reset();
  $(document).trigger("mouseup");
  console.log("Square lost!");
  isDragging = false;
}

function deleteWalls() {
  let animText = document.createElement('div');
  animText.setAttribute("id", "animated-text");
  animText.innerHTML = "+" + pointPerWall.toString();
  let pos = $(this).css("top");
  animText.style.top = pos;
  animText.style.zIndex = "2";
  $("#scene-1").append(animText);

  $(this).remove();
  clearTimeout(timer);
  changeHelpTo("Great! You got rid of the wall!");
  timerAnimText = setTimeout(function() {
    $("#animated-text").remove();
    score += pointPerWall;
    $counter.text(score);
    updateButtons();
  }, 500);
  timer = setTimeout(changeHelpTo, 1000, "Now, drag it again!");
}

function updateButtons() {
  if (score >= 20) {
    $btn1.button("enable");
    $btn3.button("enable");
  } else {
    $btn1.button("disable");

    $btn3.button("disable");
  }
  if (score >= 20 && !canGoOffWindow){
    $btn2.button("enable");
  }else{
    $btn2.button("disable");
  }
}

function buttonPressed(id) {
  if (id === 0) {
    spawnALadder();
    changeHelpTo("Great! You bought a wall!");
  } else if (id === 1) {
    canGoOffWindow = true;
    changeHelpTo("You now can leave the window!");
  } else if (id === 2) {
    pointPerWall += 2;
    changeHelpTo("You now gain 2 more points when removing a wall!");
  }
  score -= 20;
  $counter.text(score);
  updateButtons();
}

function spawnALadder(){
  let ladder = document.createElement('div');
  ladder.setAttribute("class", "ladder item");
  ladder.innerHTML = "LADDER";
  $("#scene-1").append(ladder);
  $(".ladder").not("ui-draggable").hover(function(){
    if (isDragging){
      $square.css({zIndex: '3'});
    }
  },function(){
    if (isDragging){
      $square.css({zIndex: '1'});
    }
  });
  $(".ladder").not("ui-draggable").draggable({
    containment: "window"
  });
}
