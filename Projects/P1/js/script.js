"use strict";

/********************************************************************

Drag Me Here
Yichen Wang

Is Drag Me Here a game? It could be... or it could be an experience
that makes you reconsider your life choices.

You get to drag a square to a destinated area. Can you do it? I don't
know.

Use these upgrades! Or don't use them?
*********************************************************************/

// the start and the gameplay screens
let $scene0;
let $scene1;

let $square; // variable for the draggable square
let $startArea;
let $area; // variable for the dropping area
let $boundary; // varibale for the boundary
let $text; // variable for the ui hint
let $counter; // variable for the ui counter (score)
// 4 buttons
let $btn1;
let $btn2;
let $btn3;
let $btn4;

let score = 0; // player's score
let pointPerWall = 2; // point per wall gained when destroyed
let canGoOffWindow = false; // if the mouse can go out of the window

let isDragging = false; // if the square is being dragged
let timer; // timer for changing the hint
let timerAnimText; // timer for the appearing text

// sounds
const SOUND_DRAG = new Audio("assets/sounds/Drag.mp3");
const SOUND_DROP = new Audio("assets/sounds/Drop.mp3");
const SOUND_WALL = new Audio("assets/sounds/Wall.mp3");
const SOUND_REMOVE_WALL = new Audio("assets/sounds/RemoveWall.mp3");
const SOUND_UPGRADE = new Audio("assets/sounds/Upgrade.mp3");

$(document).ready(setup); // when the page is loaded, call setup

// setup()
//
// initiate pointers for the elements
// make square draggable
// set up listeners
function setup() {
  console.log("Weeee!");
  // initiate variables
  $scene0 = $("#scene-0");
  $scene1 = $("#scene-1").hide(); // hide the second scene

  $square = $(".draggable");
  $startArea = $(".smaller-des-loc");
  $area = $(".des-loc");
  $boundary = $(".boundary");
  // ui
  $text = $("#help");
  $counter = $("#counter");
  // buttons
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

  updateButtons(); // set up the buttons

  // set volumes to all the sounds
  SOUND_DRAG.volume = 0.2;
  SOUND_DROP.volume = 0.2;
  SOUND_WALL.volume = 0.2;
  SOUND_REMOVE_WALL.volume = 0.4;
  SOUND_UPGRADE.volume = 0.2;

  // an animation changing the text (HERE <- -> START) repeatedly in start screen
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

  // clicking on the dropping area will change the hint
  // and play a sound
  $area.on('click', function() {
    SOUND_DRAG.currentTime = 0;
    SOUND_DRAG.play();
    changeHelpTo("This is the area where you drop the square");
  });
  // make the area droppable
  $area.droppable({
    accept: ".draggable",
    drop: resetGame
  })
  // make the area droppable in the start screen
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

  // button events
  $btn1.click(function() {
    buttonPressed(0); // calls button pressed function
  });
  $btn2.click(function() {
    buttonPressed(1);
  });
  $btn3.click(function() {
    buttonPressed(2);
  });
  $btn4.click(checkScore); // calls check score function
}

// checkScore()
//
// it changes the help/hint depends on the current score
function checkScore() {
  // play a sound
  SOUND_DRAG.currentTime = 0;
  SOUND_DRAG.play();
  // 2 different hints
  if (score < 20) {
    changeHelpTo("Get 20 points to be eligible to buy these upgrades");
  } else {
    changeHelpTo("Buying an upgrade will cost 20 of your score");
  }
}

// showScene(id)
//
// takes in the id of the scene
// and displays accordingly
function showScene(id) {
  // show scene 0 and hide scene 1
  if (id === 0) {
    $scene0.show();
    $scene1.hide();
    // show scene 1 and hide scene 0
  } else if (id === 1) {
    $scene0.hide();
    $scene1.show();
    changeHelpTo("Drag the grey square to the outlined area");
  }
}

// startGame()
//
// start the game in scene 1 with a sound
function startGame() {
  console.log("Game running...")
  showScene(1);
  SOUND_DROP.play();
}

// resetGame()
//
// reset the game (score, purchases)
// remove all the existing walls and ladders
function resetGame() {
  // hide all scenes
  $scene0.hide();
  $scene1.hide();
  // after 0.5 sec, show the alert
  // after dismissing the alert, show scene 1
  setTimeout(function() {
    alert("Oops... Connection lost!");
    $scene1.show();
    changeHelpTo("Drag the grey square to the outlined area");
    SOUND_DROP.play();
  }, 500);
  // reset objects
  revert();
  $(".wall").remove();
  $(".ladder").remove();
  score = 0;
  $counter.text(score);
  canGoOffWindow = false;
  pointPerWall = 2;
  updateButtons();
}

// textAnimation()
//
// animation for the text
function textAnimation() {
  // animate color to white
  $text.animate({
    color: 'white'
  }, 150);
}

// changeHelpTo(text)
//
// change the text and play the animation
function changeHelpTo(text) {
  // change color to gold
  $text.css({
    color: 'gold'
  });
  $text.text(text); // set the text
  textAnimation(); // change it back to white
}

// dragging()
//
// change the cursor to grabbing when dragging the draggable
// change the hint and play a sound
function dragging() {
  // style
  $square.css({
    cursor: 'grabbing'
  });
  isDragging = true; // now user is dragging
  changeHelpTo("Just drag it to there...");
  SOUND_DRAG.play();
}

// reset()
//
// reset the square
function reset() {
  // cursor is now grab
  // the square is under the ladder
  $square.css({
    cursor: 'grab',
    zIndex: '1'
  });
  isDragging = false;
}

// revert()
//
// reset the square
// trigger mouseup so that the square returns to its original position
function revert() {
  reset();
  $(document).trigger("mouseup");
  console.log("Square lost!");
}

// spawnWalls()
//
// spawn a wall if the mouse is too close to the right
function spawnWalls() {
  // only if user is dragging
  if (isDragging) {
    console.log("A wall appeared!");
    // the pos variable for the wall
    // the center of the wall is roughly the pos of the mouse
    let pos = (event.clientY / window.innerHeight) * 100;
    pos = pos.toString() + "%";
    // create a new wall element
    let newWall = document.createElement('div');
    newWall.setAttribute("class", "wall");
    newWall.addEventListener("click", deleteWalls);
    newWall.style.top = pos; // set the position to the wall
    $("#scene-1").append(newWall); // add it to the scene

    revert(); // the user loses the square

    changeHelpTo("A wall appeared! Click to get rid of it!");
    // play the sound
    SOUND_WALL.currentTime = "0";
    SOUND_WALL.play();
  }
  $(".wall").on("mouseover", revert); // if the user hits the wall while dragging... the square hits the wall and goes back
}

// deleteWalls()
//
// remove a wall when clicking on it
// show a text indicating how many points you get
function deleteWalls() {
  // create a text element
  let animText = document.createElement('div');
  animText.setAttribute("id", "animated-text");
  animText.innerHTML = "+" + pointPerWall.toString(); // content
  let pos = $(this).css("top"); // the same position as the wall
  animText.style.top = pos;
  animText.style.zIndex = "2";
  $("#scene-1").append(animText); // add it to the scene
  // play a sound
  SOUND_REMOVE_WALL.currentTime = "0";
  SOUND_REMOVE_WALL.play();
  $(this).remove(); // remove the wall
  clearTimeout(timer); // clear the timer so that there's no repeatition
  changeHelpTo("Great! You got rid of the wall!");
  // timer
  // remove the text and add the score when time out
  timerAnimText = setTimeout(function() {
    $("#animated-text").remove();
    score += pointPerWall;
    $counter.text(score);
    updateButtons();
  }, 500);
  // after 1s, change the hint
  timer = setTimeout(changeHelpTo, 1000, "Now, drag it again!");
}

// updateButtons()
//
// update the buttons according to the score
function updateButtons() {
  // if >= 20 score, button 1 & 3 are enabled
  if (score >= 20) {
    $btn1.button("enable");
    $btn1.removeClass("btn-disabled").addClass("btn");
    $btn3.button("enable");
    $btn3.removeClass("btn-disabled").addClass("btn");
  } else {
    // otherwise disable them
    $btn1.button("disable");
    $btn1.removeClass("btn").addClass("btn-disabled");
    $btn3.button("disable");
    $btn3.removeClass("btn").addClass("btn-disabled");
  }
  // if >= 20 score or button 2 has not been pressed, it is enabled
  if (score >= 20 && !canGoOffWindow) {
    $btn2.button("enable");
    $btn2.removeClass("btn-disabled").addClass("btn");
  } else {
    $btn2.button("disable");
    $btn2.removeClass("btn").addClass("btn-disabled");
  }
}

// buttonPressed(id)
//
// takes in the id of the button
// applies the effect and changes the hint
function buttonPressed(id) {
  // button 1, add a ladder
  if (id === 0) {
    spawnALadder();
    changeHelpTo("Great! You bought a ladder!");
    // button 2, user can go off the window
  } else if (id === 1) {
    canGoOffWindow = true;
    changeHelpTo("You now can leave the window!");
    // button 3, add 2 to the point per wall
  } else if (id === 2) {
    pointPerWall += 2;
    changeHelpTo("You now gain 2 more points when removing a wall!");
  }
  // update the score and the buttons
  score -= 20;
  $counter.text(score);
  updateButtons();
  // play the sound
  SOUND_UPGRADE.currentTime = "0";
  SOUND_UPGRADE.play();
}

// spawnALadder()
//
// create a ladder for the user to climb over the wall
function spawnALadder() {
  // a new ladder element
  let ladder = document.createElement('div');
  ladder.setAttribute("class", "ladder item");
  ladder.innerHTML = "LADDER";
  $("#scene-1").append(ladder); // add the ladder to the scene
  // add event handler to the ladder
  // if the mouse is over the ladder, the square will be above the detection boundary
  // therefore will not be blocked
  $(".ladder").not("ui-draggable").hover(function() {
    if (isDragging) {
      $square.css({
        zIndex: '3'
      });
    }
    // otherwise reset it
  }, function() {
    if (isDragging) {
      $square.css({
        zIndex: '1'
      });
    }
  });
  // make ladder contained in the window
  $(".ladder").not("ui-draggable").draggable({
    containment: "window"
  });
}
