"use strict";

/*****************

Slamina Special
Yichen Wang

Guess the animal in reverse by saying your answer to your own computer!

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
const NUM_OPTIONS = 4;
var commands = {
  "I give up": nextRound,
  "Say it again": function() {
    sayBackwards(correctAnimal);
  },
  "I think it is *answer": checkAnswer
};

let correctAnimal;
let answers;
let score = 0;

let $score;

$(document).ready(setup);

function setup() {
  $score = $("#score-text");

  newRound();
  annyang.start({
    autoRestart: true
  });
  annyang.addCommands(commands);
}

function addButton(label) {
  var $button = $("<div class='guess'></div>").text(label).button().click(handleGuess);
  $('.btn-wrapper').append($button);
}

function newRound() {
  answers = [];
  for (let i = 0; i < NUM_OPTIONS; i++) {
    let rand = Math.floor(Math.random() * ANIMALS.length);
    let randAnimalName = ANIMALS[rand];
    addButton(randAnimalName);
    answers.push(randAnimalName);
  }
  let rand2 = Math.floor(Math.random() * NUM_OPTIONS);
  correctAnimal = answers[rand2];
  sayBackwards(correctAnimal);
}

// nextRound()
//
// after "i give up" command
// it starts a new game
function nextRound() {
  $(".guess").each(function() {
    if ($(this).text() === correctAnimal) {
      $(this).toggle("highlight").toggle("highlight");
      setTimeout(function() {
        $(".guess").remove();
        newRound();
      }, 250);
    }
  });
}

function handleGuess() {
  if ($(this).text() === correctAnimal) {
    $(".guess").remove();
    setTimeout(newRound, 250);
    score += 1;
    updateScore();
  } else {
    $(this).effect('shake');
    sayBackwards(correctAnimal);
    score = 0;
    updateScore();
  }
}

function sayBackwards(text) {
  let backwardsText = text.split('').reverse().join('');
  let options = {
    rate: Math.random(),
    pitch: Math.random()
  };
  responsiveVoice.speak(backwardsText, "UK English Male", {
    rate: options.rate,
    pitch: options.pitch
  });
}

function checkAnswer(answer) {
  if (answer === correctAnimal) {
    nextRound();
    score += 1;
    updateScore();
  } else {
    $(".guess").each(function() {
      if ($(this).text() === answer) {
        $(this).effect('shake');
        sayBackwards(correctAnimal);
        score = 0;
        updateScore();
      }
    });
  }
}

function updateScore() {
  $score.text(score);
}
