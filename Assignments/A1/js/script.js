"use strict";

/********************************************************************

Pixel Painter
Yichen Wang

You paint in pixels!

*********************************************************************/

window.onload = setup;
const PIXEL_SIZE = 24;

function setup(){
  console.log("Website is loaded! Weeeeee!");

  let pixelAmountX = parseInt(window.innerWidth/PIXEL_SIZE);
  let pixelAmountY = parseInt(window.innerHeight/PIXEL_SIZE);

  for(let i = 0; i < pixelAmountY; i++){
    for(let j = 0; j < pixelAmountX; j++){
      let newPixel = document.createElement('div');
      newPixel.setAttribute('class','pixel');
      document.querySelector('body').appendChild(newPixel);
    }
  }
  console.log("The window size is: "+window.innerWidth+" * "+window.innerHeight+"\nThe pixel canvas size is : "+pixelAmountX+" * "+pixelAmountY);

  document.addEventListener('mouseover',paint);
}

function paint(e){
  let pixel = e.target;
  if (pixel.className === "pixel"){
    pixel.style.backgroundColor = 'orange';
    setTimeout(resetPixel,1000,pixel);
  }
}

function resetPixel(pixel){
  pixel.style.backgroundColor = 'black';
}
