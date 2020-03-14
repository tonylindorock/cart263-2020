"use strict";

/*****************

Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!

******************/

$(document).ready(setup);

function setup(){
  $.getJSON("Data/Data.json")
  .done(dataLoaded)
  .fail(dataError);
  $.getJSON("Data/Crayola.json")
  .done(dataLoaded)
  .fail(dataError);
  $.getJSON("Data/Tea.json")
  .done(dataLoaded)
  .fail(dataError);
  $.getJSON("Data/Vegetables.json")
  .done(dataLoaded)
  .fail(dataError);
}

function dataLoaded(data){
  let randomCondiment = getRandomElement(data.condiments);

  let verb = "is";
  if (randomCondiment.charAt(randomCondiment.length - 1) === "s"){
    verb = "are";
  }
  let cat = getRandomElement(data.cats);
  let room = getRandomElement(data.rooms);

  let phrase = randomCondiment+" "+verb+" "+cat+" in a "+room+".";
  $('body').append(phrase);
}

function dataError(request, text, error){
  console.log(error);
}

function getRandomElement(array){
  let element = array[Math.floor(Math.random()*array.length)];
  return element
}
