"use strict";

/*****************

Slamina Special
Yichen Wang

Guess the animal in reverse by saying your answer to your own computer!
And hear computer's praises and insults!

******************/

// the array of animals
const ANIMALS = ["aardvark",
  "alligator",
  "alpaca",
  "antelope",
  "ape",
  "armadillo",
  "baboon",
  "badger",
  "bat",
  "bear",
  "beaver",
  "bison",
  "boar",
  "buffalo",
  "bull",
  "camel",
  "canary",
  "capybara",
  "cat",
  "chameleon",
  "cheetah",
  "chimpanzee",
  "chinchilla",
  "chipmunk",
  "cougar",
  "cow",
  "coyote",
  "crocodile",
  "crow",
  "deer",
  "dingo",
  "dog",
  "donkey",
  "dromedary",
  "elephant",
  "elk",
  "ewe",
  "ferret",
  "finch",
  "fish",
  "fox",
  "frog",
  "gazelle",
  "gila monster",
  "giraffe",
  "gnu",
  "goat",
  "gopher",
  "gorilla",
  "grizzly bear",
  "ground hog",
  "guinea pig",
  "hamster",
  "hedgehog",
  "hippopotamus",
  "hog",
  "horse",
  "hyena",
  "ibex",
  "iguana",
  "impala",
  "jackal",
  "jaguar",
  "kangaroo",
  "koala",
  "lamb",
  "lemur",
  "leopard",
  "lion",
  "lizard",
  "llama",
  "lynx",
  "mandrill",
  "marmoset",
  "mink",
  "mole",
  "mongoose",
  "monkey",
  "moose",
  "mountain goat",
  "mouse",
  "mule",
  "muskrat",
  "mustang",
  "mynah bird",
  "newt",
  "ocelot",
  "opossum",
  "orangutan",
  "oryx",
  "otter",
  "ox",
  "panda",
  "panther",
  "parakeet",
  "parrot",
  "pig",
  "platypus",
  "polar bear",
  "porcupine",
  "porpoise",
  "prairie dog",
  "puma",
  "rabbit",
  "raccoon",
  "ram",
  "rat",
  "reindeer",
  "reptile",
  "rhinoceros",
  "salamander",
  "seal",
  "sheep",
  "shrew",
  "silver fox",
  "skunk",
  "sloth",
  "snake",
  "squirrel",
  "tapir",
  "tiger",
  "toad",
  "turtle",
  "walrus",
  "warthog",
  "weasel",
  "whale",
  "wildcat",
  "wolf",
  "wolverine",
  "wombat",
  "woodchuck",
  "yak",
  "zebra"
];
// array of praises
const PRAISES = [
  "Not bad.",
  "I believe you are smart.",
  "I approve your future.",
  "Good, at least you tried.",
  "Good lord, finally! A worthy human!",
  "Thank you. Next.",
  "You are smarter than anyone I know."
];
// arary of insults
const INSULTS = [
  "You're just so bad.",
  "Ha! I thought humans are smart.",
  "You're the example why humans are destroying the planet.",
  "Are you even trying?",
  "God Jesus Christ.",
  "LOL. This is not what I expected.",
  "I can't believe you lied about going to Harvard."
];
// num of options
const NUM_OPTIONS = 4;
// voice commands
var commands = {
  "I give up": nextRound,
  "Say it again": function() {
    sayBackwards(correctAnimal);
  },
  "I think it is *answer": checkAnswer,
};
let timer;
let mistake = false; // if player made a mistake in a round
let correctAnimal; // corret answer
let answers; // array of options
let score = 0;

let $score; // pointer to score

$(document).ready(setup);

// setup()
//
// initiate variable and annyang
// create buttons
function setup() {
  $score = $("#score-text");
  newRound();
  annyang.start({
    autoRestart: true
  });
  annyang.addCommands(commands);
}

// addButton(label)
//
// take in a string and create a button with that string as the label
function addButton(label) {
  var $button = $("<div class='guess'></div>").text(label).button().click(handleGuess).removeClass("ui-corner-all");
  $('.btn-wrapper').append($button);
}

// newRound()
//
// create buttons of animal names and choose a corret answer
function newRound() {
  // reset
  mistake = false;
  answers = [];
  let COPY = ANIMALS;
  // randomly choose 4 animals from the array copy
  for (let i = 0; i < NUM_OPTIONS; i++) {
    let rand = Math.floor(Math.random() * COPY.length);
    let randAnimalName = COPY[rand];
    // update the copy by moving the chosen name to the first and remove it
    // so that no repeated options
    let temp = COPY[0];
    COPY[0] = COPY[rand];
    COPY[rand] = temp;
    COPY.shift();
    // add names to the buttons
    addButton(randAnimalName);
    answers.push(randAnimalName);
  }
  // choose the corret answer randomly
  let rand2 = Math.floor(Math.random() * NUM_OPTIONS);
  correctAnimal = answers[rand2];
  sayBackwards(correctAnimal); // say the name in reverse
}

// nextRound()
//
// after "i give up" command
// it starts a new game
function nextRound() {
  // reset
  score = 0;
  updateScore();
  clearTimeout(timer);
  responsiveVoice.cancel();
  // find the corret answer
  $(".guess").each(function() {
    if ($(this).text() === correctAnimal) {
      // highlight the option
      $(this).toggle("highlight").toggle("highlight");
      // remove all buttons
      // and start a new round
      timer = setTimeout(function() {
        $(".guess").remove();
        newRound();
      }, saySomething(1));
    }
  });
}

// handleGuess()
//
// check if the button is the corret answer
function handleGuess() {
  // clear the timer
  clearTimeout(timer);
  // if correct
  if ($(this).text() === correctAnimal) {
    // remove buttons
    $(".guess").remove();
    // say a praise before starting a new round
    timer = setTimeout(newRound, saySomething(0));
    // update score
    score += 1;
    updateScore();
    // if not correct
  } else {
    // play button amination and disable it
    $(this).effect('shake').button("option", "disabled", true);
    // say an insult before saying the name again
    timer = setTimeout(sayBackwards, saySomething(1), correctAnimal);
    // reset score
    score = 0;
    mistake = true; // the player makes a mistake so they won't get a praise when getting the right answer
    updateScore();
  }
}

// sayBackwards(text)
//
// take in a string and say it in reverse
function sayBackwards(text) {
  // reverse the string
  let backwardsText = text.split('').reverse().join('');
  // say it
  responsiveVoice.speak(backwardsText, "UK English Male");
}

// saySomething(id,guess)
//
// take in an id
// return the delay of saying the sentence
function saySomething(id) {
  // 0 is praise
  if (id === 0) {
    // if no mistake, give the player something nice
    if (!mistake) {
      // randomly choose something from the praises array
      let rand = Math.floor(Math.random() * 7);
      responsiveVoice.speak(PRAISES[rand] + ". Next", "UK English Male");
      // the delay
      return (PRAISES[rand].length + 10) * 100;
    } else {
      return 250;
    }
    // 1 is insult
  } else if (id === 1) {
    let rand = Math.floor(Math.random() * 7);
    responsiveVoice.speak(INSULTS[rand] + ". Again", "UK English Male");
    return (INSULTS[rand].length + 5) * 100;
    // default
  } else {
    return 250;
  }
}

// checkAnswer(answer)
//
// takes in a string of player's answer
// check is the player is saying the correct animal name
function checkAnswer(answer) {
  clearTimeout(timer);
  // if the answer is correct
  if (answer === correctAnimal) {
    // next round
    timer = setTimeout(nextRound, saySomething(0));
    // update score
    score += 1;
    updateScore();
    // if not correct
  } else {
    // find the selected option
    $(".guess").each(function() {
      if ($(this).text() === answer) {
        // play the animation
        $(this).effect('shake').button("option", "disabled", true);
        // say an insult
        timer = setTimeout(sayBackwards, saySomething(1), correctAnimal);
        // reset score
        score = 0;
        mistake = true;
        updateScore();
      }
    });
  }
}

// updateScore()
//
// update the score element
function updateScore() {
  $score.text(score);
}
