"use strict";

/********************************************************************

Pixel Painter
Yichen Wang

You paint in pixels!

*********************************************************************/

window.onload = setup; // call setup when the website is loaded
const PIXEL_SIZE = 24; // the pixel size

let rotation = 0; // global rotation
let currentKey = ""; // global key

let drawing = false;
let keepingPixel = false;
let erasing = false;
let currentColor = -1;
let lastColor = -1;

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
  document.addEventListener('keydown',rotate);
  document.addEventListener('keydown',typed);
  document.addEventListener('mouseover',addText);

  document.addEventListener('mousedown',e =>{
    drawing = true;
  });
  document.addEventListener('mouseup',e =>{
    if (drawing){
      drawing = false;
    }
  });

  let keepPixel = document.getElementById('btn-keep');
  keepPixel.addEventListener('click',e =>{
    keepingPixel = !keepingPixel;
    if (keepingPixel){
      keepPixel.style.backgroundColor = "#262626";
    }else{
      keepPixel.style.backgroundColor = "black";
    }
  })

  let eraser = document.getElementById('btn-erase');
  eraser.addEventListener('click',e =>{
    erasing = !erasing;
    if (erasing){
      eraser.style.backgroundColor = "#262626";
    }else{
      eraser.style.backgroundColor = "black";
    }
  })

  let clear = document.getElementById('btn-clear');
  clear.addEventListener('click',e =>{
    clearAll();
  })

  let random = document.getElementById('btn-random');
  random.style.backgroundColor = "#262626";
  random.addEventListener('click',e =>{
    lastColor = currentColor;
    currentColor = -1;
    updateSelection();
  })

  let red = document.getElementById('btn-r');
  red.addEventListener('click',e =>{
    lastColor = currentColor;
    currentColor = 0;
    updateSelection();
  })

  let orange = document.getElementById('btn-o');
  orange.addEventListener('click',e =>{
    lastColor = currentColor;
    currentColor = 1;
    updateSelection();
  })

  let yellow = document.getElementById('btn-y');
  yellow.addEventListener('click',e =>{
    lastColor = currentColor;
    currentColor = 2;
    updateSelection();
  })

  let green = document.getElementById('btn-g');
  green.addEventListener('click',e =>{
    lastColor = currentColor;
    currentColor = 3;
    updateSelection();
  })

  let cyan = document.getElementById('btn-c');
  cyan.addEventListener('click',e =>{
    lastColor = currentColor;
    currentColor = 4;
    updateSelection();
  })

  let blue = document.getElementById('btn-b');
  blue.addEventListener('click',e =>{
    lastColor = currentColor;
    currentColor = 5;
    updateSelection();
  })

  let purple = document.getElementById('btn-p');
  purple.addEventListener('click',e =>{
    lastColor = currentColor;
    currentColor = 6;
    updateSelection();
  })
}

function paint(e){
  if (drawing){
    let pixel = e.target;
    if (pixel.className === "pixel"){
      if (!erasing){
        if (currentColor < 0){
          let colorR = Math.floor((Math.random() * 255) + 1);
          let colorG = Math.floor((Math.random() * 255) + 1);
          let colorB = Math.floor((Math.random() * 255) + 1);
          pixel.style.backgroundColor = "rgb("+colorR+","+colorG+","+colorB+")";
        // red
        }else if (currentColor === 0){
          pixel.style.backgroundColor = "rgb(255,0,0)";
        // orange
        }else if (currentColor === 1){
          pixel.style.backgroundColor = "rgb(255,132,0)";
        // yellow
        }else if (currentColor === 2){
          pixel.style.backgroundColor = "rgb(255,232,0)";
        // green
        }else if (currentColor === 3){
          pixel.style.backgroundColor = "rgb(0,255,0)";
        // cyan
        }else if (currentColor === 4){
          pixel.style.backgroundColor = "rgb(0,255,232)";
        // blue
        }else if (currentColor === 5){
          pixel.style.backgroundColor = "rgb(0,0,255)";
        // purple
        }else if (currentColor === 6){
          pixel.style.backgroundColor = "rgb(255,0,232)";
        }
      }else{
        pixel.style.backgroundColor = "black";
      }
      if (!keepingPixel){
        setTimeout(resetPixel,1000,pixel);
      }
    }
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

function rotate(e){
  if (e.keyCode === 37){
    rotation -= 1;
  }else if (e.keyCode === 39){
    rotation += 1;
  }
  let pixels = document.querySelectorAll('.pixel');
  for(let i = 0; i < pixels.length; i++){
    pixels[i].style.transform = "rotate("+rotation+"deg)";
  }
}

function typed(e){
  currentKey = e.keyCode;
}

function addText(e){
  let pixel = e.target;
  if (pixel.className === "pixel"){
    pixel.innerHTML = String.fromCharCode(currentKey);
  }
}

function updateSelection(){
  let random = document.getElementById('btn-random');
  let red = document.getElementById('btn-r');
  let orange = document.getElementById('btn-o');
  let yellow = document.getElementById('btn-y');
  let green = document.getElementById('btn-g');
  let cyan = document.getElementById('btn-c');
  let blue = document.getElementById('btn-b');
  let purple = document.getElementById('btn-p');

  if (lastColor < 0){
    random.style.backgroundColor = "black";
  // red
  }else if (lastColor === 0){
    red.style.backgroundColor = "black";
  // orange
  }else if (lastColor === 1){
    orange.style.backgroundColor = "black";
  // yellow
  }else if (lastColor === 2){
    yellow.style.backgroundColor = "black";
  // green
  }else if (lastColor === 3){
    green.style.backgroundColor = "black";
  // cyan
  }else if (lastColor === 4){
    cyan.style.backgroundColor = "black";
  // blue
  }else if (lastColor === 5){
    blue.style.backgroundColor = "black";
  // purple
  }else if (lastColor === 6){
    purple.style.backgroundColor = "black";
  }

  if (currentColor < 0){
    random.style.backgroundColor = "#262626";
  // red
  }else if (currentColor === 0){
    red.style.backgroundColor = "rgba(255,0,0,0.5)";
  // orange
  }else if (currentColor === 1){
    orange.style.backgroundColor = "rgba(255,132,0,0.5)";
  // yellow
  }else if (currentColor === 2){
    yellow.style.backgroundColor = "rgba(255,232,0,0.5)";
  // green
  }else if (currentColor === 3){
    green.style.backgroundColor = "rgba(0,255,0,0.5)";
  // cyan
  }else if (currentColor === 4){
    cyan.style.backgroundColor = "rgba(0,255,232,0.5)";
  // blue
  }else if (currentColor === 5){
    blue.style.backgroundColor = "rgba(0,0,255,0.5)";
  // purple
  }else if (currentColor === 6){
    purple.style.backgroundColor = "rgba(255,0,232,0.5)";
  }
}

function clearAll(){
  let pixels = document.querySelectorAll('.pixel');
  for(let i = 0; i < pixels.length; i++){
    pixels[i].style.backgroundColor = "black";
    pixels[i].style.opacity = "1";
  }
}
