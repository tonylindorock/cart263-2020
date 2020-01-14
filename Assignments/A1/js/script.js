"use strict";

/********************************************************************

Pixel Painter
Yichen Wang

You paint in pixels!

*********************************************************************/

window.onload = setup; // call setup when the website is loaded
const PIXEL_SIZE = 24; // the pixel size

// setup
//
// to be called when first loaded
// will set up the pixel canvas and add event listener
function setup(){
  console.log("Website is loaded! Weeeeee!");

  let pixelAmountX = Math.floor(window.innerWidth/PIXEL_SIZE);
  let pixelAmountY = Math.floor(window.innerHeight/PIXEL_SIZE);

  for(let i = 0; i < pixelAmountY; i++){
    for(let j = 0; j < pixelAmountX; j++){
      let newPixel = document.createElement('div');
      newPixel.setAttribute('class','pixel');
      document.querySelector('body').appendChild(newPixel);
    }
  }
  console.log("The window size is: "+window.innerWidth+" * "+window.innerHeight+"\nThe pixel canvas size is : "+pixelAmountX+" * "+pixelAmountY);

  document.addEventListener('mouseover',paint);
  document.addEventListener('click',remove);
}

function paint(e){
  let pixel = e.target;
  if (pixel.className === "pixel"){
    let colorR = Math.floor((Math.random() * 255) + 1);
    let colorG = Math.floor((Math.random() * 255) + 1);
    let colorB = Math.floor((Math.random() * 255) + 1);
    pixel.style.backgroundColor = "rgb("+colorR+","+colorG+","+colorB+")";
    setTimeout(resetPixel,1000,pixel);
    console.log("rbg("+colorR+","+colorG+","+colorB+")");
  }
}

function resetPixel(pixel){
  pixel.style.backgroundColor = 'black';
}

function remove(e){
  let pixel = e.target;
  if (pixel.className === "pixel"){
    pixel.style.opacity = '0';
  }
}
