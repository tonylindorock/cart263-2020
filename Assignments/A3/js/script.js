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
const PRAISES=[
  "Not bad.",
  "I believe you are smart.",
  "I approval your future.",
  "Good, at least you tried.",
  "Good lord, finally! A worthy human!",
  "Thank you. Next.",
  "You are smarter than anyone I know."
];
const INSULTS=[
  "You're so bad.",
  "Ha! I thought humans are smart.",
  "You're the example why humans are destroying the planet.",
  "Are you even trying?",
  "God Jesus Christ.",
  "LOL",
  "I can't believe you lied about going to Harvard."
];

const NUM_OPTIONS = 4;
var commands = {
  "I give up": nextRound,
  "Say it again": function() {
    sayBackwards(correctAnimal);
  },
  "I think it is *answer": checkAnswer,
};
let mistake = false;
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
  mistake = false;
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
  score = 0;
  updateScore();
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
    setTimeout(newRound,saySomething(0,mistake));
    score += 1;
    updateScore();
  } else {
    $(this).effect('shake').button( "option", "disabled", true );
    setTimeout(sayBackwards,saySomething(1),correctAnimal);
    score = 0;
    mistake = true;
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

function saySomething(id,guess){
  if (id === 0){
    if (!mistake){
      let rand = Math.floor(Math.random() * 7);
      responsiveVoice.speak(PRAISES[rand], "UK English Male");
      return PRAISES[rand].length * 100;
    }else{
      return 250;
    }
  }else if (id === 1){
    let rand = Math.floor(Math.random() * 7);
    responsiveVoice.speak(INSULTS[rand], "UK English Male");
    return INSULTS[rand].length * 100;
  }else{
    return 250;
  }
}

function checkAnswer(answer) {
  if (answer === correctAnimal) {
    setTimeout(nextRound,saySomething(0,mistake));
    score += 1;
    updateScore();
  } else {
    $(".guess").each(function() {
      if ($(this).text() === answer) {
        $(this).effect('shake').button( "option", "disabled", true );
        setTimeout(sayBackwards,saySomething(1),correctAnimal);
        score = 0;
        mistake = true;
        updateScore();
      }
    });
  }
}

function updateScore() {
  $score.text(score);
}
