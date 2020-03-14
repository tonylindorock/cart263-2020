"use strict";

/*****************

Condiments Cacophony
Yichen Wang

A random sentence?

******************/

let finalPhrase = "";

let randomCondiment;
let tea;
let vegetable;
let verb = "is";
let color;
let cat;
let preposition = " in ";
let room;

$(document).ready(setup);

function setup() {
  $.when(
    $.getJSON("Data/Crayola.json")
    .done(crayolaLoaded)
    .fail(dataError),

    $.getJSON("Data/Data.json")
    .done(dataLoaded)
    .fail(dataError),

    $.getJSON("Data/Tea.json")
    .done(teaLoaded)
    .fail(dataError),

    $.getJSON("Data/Vegetables.json")
    .done(vegetabelLoaded)
    .fail(dataError)
  ).then(allFilesLoaded);
}

function dataLoaded(data) {
  randomCondiment = getRandomElement(data.condiments);

  if (randomCondiment.charAt(randomCondiment.length - 1) === "s") {
    verb = "are";
  }
  cat = getRandomElement(data.cats);
  if (verb === "are") {
    cat += "s";
  }
  room = getRandomElement(data.rooms);
  let firstLetter = room.toLowerCase().charAt(0);
  if (firstLetter === "a" || firstLetter === "e" || firstLetter === "i" || firstLetter === "o" || firstLetter === "u") {
    preposition += "an ";
  } else {
    preposition += "a ";
  }
}

function crayolaLoaded(data) {
  color = getRandomElement(data.colors).color;
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

function teaLoaded(data) {
  tea = getRandomElement(data.teas);
}

function vegetabelLoaded(data) {
  vegetable = getRandomElement(data.vegetables)
}

function dataError(request, text, error) {
  console.log(error);
}

function allFilesLoaded() {
  finalPhrase = "With a cup of " + tea + " and " + vegetable + ", " + randomCondiment + " " + verb + color + cat + preposition + room + ".";
  $('body').append(finalPhrase)
}

function getRandomElement(array) {
  let element = array[Math.floor(Math.random() * array.length)];
  return element
}
