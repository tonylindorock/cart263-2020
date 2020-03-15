"use strict";

/*****************

Condiments Cacophony
Yichen Wang

A random sentence?

******************/

let finalPhrase = "";

// to compose the final phrase
let randomCondiment;
let tea;
let vegetable;
let verb = "is";
let color;
let cat;
let preposition = " in ";
let room;

$(document).ready(setup);

// setup()
//
// load all the JSON files
function setup() {
  // load all the files
  $.when(
    // colors
    $.getJSON("Data/Crayola.json")
    // call its loaded function
    .done(crayolaLoaded)
    // call error function if something is wrong
    .fail(dataError),

    // Condiments, cats, rooms
    $.getJSON("Data/Data.json")
    .done(dataLoaded)
    .fail(dataError),

    // teas
    $.getJSON("Data/Tea.json")
    .done(teaLoaded)
    .fail(dataError),

    // vegetables
    $.getJSON("Data/Vegetables.json")
    .done(vegetabelLoaded)
    .fail(dataError)
  ).then(allFilesLoaded); // when everything is loaded

  // so when a key is pressed, call keyPressed function
  document.addEventListener('keypress', keyPressed);
}

// keyPressed()
//
// when any key is pressed, reload the page
function keyPressed() {
  location.reload();
}

// dataLoaded(data)
//
// handle the data from data
function dataLoaded(data) {
  // get a random condiment
  randomCondiment = getRandomElement(data.condiments);
  // if the condiment is in plural, change the verb to are
  if (randomCondiment.charAt(randomCondiment.length - 1) === "s") {
    verb = "are ";
  }

  // get a random cat
  cat = getRandomElement(data.cats);
  // if verb is are, add an s to the cat name
  if (verb === "are ") {
    cat += "s";
  }

  // get a random room
  room = getRandomElement(data.rooms);
  // if the first letter of the room is a vowel, add an to the preposition
  // otherwise add an a
  let firstLetter = room.toLowerCase().charAt(0);
  if (firstLetter === "a" || firstLetter === "e" || firstLetter === "i" || firstLetter === "o" || firstLetter === "u") {
    preposition += "an ";
  } else {
    preposition += "a ";
  }
}

// crayolaLoaded(data)
//
// handle the data from crayola
function crayolaLoaded(data) {
  // get a random color name
  color = getRandomElement(data.colors).color;
  // if the first color is a vowel, add an to the verb
  // otherwise add an a
  let firstLetter = color.toLowerCase().charAt(0);
  if (firstLetter === "a" || firstLetter === "e" || firstLetter === "i" || firstLetter === "o" || firstLetter === "u") {
    if (verb === "is") {
      verb += " an ";
    }
  } else {
    if (verb === "is") {
      verb += " a ";
    }
  }
}

// teaLoaded(data)
//
// handle the data from teas
function teaLoaded(data) {
  // get a random tea
  tea = getRandomElement(data.teas);
}

// vegetabelLoaded(data)
//
// handle the data from vegetables
function vegetabelLoaded(data) {
  // get a random vegetable
  vegetable = getRandomElement(data.vegetables)
}

// dataError(request, text, error)
//
// handle the error from loading JSON
function dataError(request, text, error) {
  console.log(error);
}

// allFilesLoaded()
//
// compose the final phrase after everything is laoded
function allFilesLoaded() {
  // write the final sentence
  finalPhrase = "With a cup of " + tea + " and " + vegetable + ", " + randomCondiment + " " + verb + color + cat + preposition + room + ".<br><br><div class = smaller-text>Press any key to see another phrase.</smaller-text>";
  // add the sentence to the body
  $('body').append(finalPhrase);
  // get a random color
  // rgb ranges from 32 - 168
  let r = Math.floor((Math.random() * (168 - 32) + 32));
  let g = Math.floor((Math.random() * (168 - 32) + 32));
  let b = Math.floor((Math.random() * (168 - 32) + 32));
  // change the color in the body
  $('body').css("color", "rgb(" + r + "," + g + "," + b + ")");
}

// getRandomElement(array)
//
// randomly choose an element from an array from the data
function getRandomElement(array) {
  // get the random element
  let element = array[Math.floor(Math.random() * array.length)];
  return element
}
