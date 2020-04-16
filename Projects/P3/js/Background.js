// Background
//
// acts as a separated componenet to manage game background itself
// so that script.js will be cleaner
class Background {
  constructor(img) {
    this.img = img; // the first image has to be BG_FRONT to match the dir index
    this.dir = 0;
    this.lastDir = this.dir;

    // position
    this.x = width / 2;
    this.y = height / 2;

    // size
    this.height = height; // window height
    this.width = (this.height / img.height) * img.width; // width based on the height

    // animation attributes
    this.fadeIn = false;
    this.fadeOut = false
    this.alpha = 255;
    // ** game progress **
    this.lightOff = false;
    // front/east
    this.panelOpened = false;
    this.fuseInstalled = false;
    this.doorOpened = false;
    // left/north
    this.drawerLeftOut = false;
    this.drawerRightOut = false;
    this.plantMoved = false;
    // back/west
    this.coffeeMachinePowered = false;
    this.coffeeMachineUsed = false;
    this.posterOpened = false;
    this.fuseTaken = false;
    this.mugPlaced = false;
    // right/south
    this.cabinLeftOut = false;
    this.cabinRightOut = false;
    this.cabinBottomOut = false;
    // down
    this.trapDoorOpened = false;
    this.cordTaken = false;
  }

  // display()
  //
  // display the background images
  display() {
    push();
    imageMode(CORNER);
    this.displayImg(bgArray[this.dir]); // display image based on direction id
    pop();
    // front/east
    if (this.dir === 0) {
      // if panel is opened
      if (this.panelOpened) {
        this.displayImg(OBJ_PANEL_OPENED);
        // if fuse is installed
        if (this.fuseInstalled) {
          this.displayImg(OBJ_FUSE_INSTALLED);
        }
        // if panel is not opened
      } else {
        this.displayImg(OBJ_PANEL);
      }
      // if door is opened
      if (this.doorOpened) {
        this.displayImg(OBJ_DOOR_OPENED);
      }
      // left/north
    } else if (this.dir === 1) {
      // if the left drawer is out
      if (this.drawerLeftOut) {
        this.displayImg(OBJ_DRAWER_LEFT_OUT);
      }
      // if the right drawer is out
      if (this.drawerRightOut) {
        this.displayImg(OBJ_DRAWER_RIGHT_OUT);
      }
      // if the plant is moved
      if (this.plantMoved) {
        this.displayImg(OBJ_PLANT_MOVED);
        // or not
      } else {
        this.displayImg(OBJ_PLANT);
      }
      // back/west
    } else if (this.dir === 2) {
      // if the poster is tore
      if (this.posterOpened) {
        this.displayImg(OBJ_HOLE);
        // if the fuse in the wall is not taken
        if (!this.fuseTaken) {
          this.displayImg(OBJ_FUSE);
        }
      }
      // if the coffee machine is connected to power
      if (this.coffeeMachinePowered) {
        this.displayImg(OBJ_CORD_USED);
      }
      // if the mug is placed on the coffee machine
      if (this.mugPlaced) {
        this.displayImg(OBJ_MUG_PLACED);
      }
      // right/south
    } else if (this.dir === 3) {
      // if the bottom cabin drawer is out
      if (this.cabinBottomOut) {
        this.displayImg(OBJ_CABIN_BOTTOM_OUT);
      }
      // if the upper left cabin drawer is out
      if (this.cabinLeftOut) {
        this.displayImg(OBJ_CABIN_LEFT_OUT);
      }
      // if the upper right cabin drawer is out
      if (this.cabinRightOut) {
        this.displayImg(OBJ_CABIN_RIGHT_OUT);
      }
      this.displayImg(OBJ_BOOKLET); // manual
      // down
    } else if (this.dir === 4) {
      // if trapdoor is opened
      if (this.trapDoorOpened) {
        this.displayImg(OBJ_TRAPDOOR_OPENED);
        // if the cord is not taken
        if (!this.cordTaken) {
          this.displayImg(OBJ_CORD);
        }
      }
    }
    // if the light is turned off
    if (this.lightOff) {
      // if facing the front/east
      if (this.dir === 0) {
        this.displayImg(OVERLAY_DARKEN_FRONT); // display this
        // if facing up
      } else if (this.dir === 5) {
        this.displayImg(OVERLAY_LIGHT_OFF); // display this
      } else {
        this.displayImg(OVERLAY_DARKEN);
      }
    }
    this.animation(); // changing background fading animation
  }

  // displayImg(img)
  //
  // takes in an image and display it
  displayImg(img) {
    push();
    imageMode(CENTER);
    // use the width and height specified
    image(img, this.x, this.y, this.width, this.height);
    pop();
  }

  // animation()
  //
  // play the fading animation when changing direction
  animation() {
    push();
    // if fading in
    if (this.fadeIn) {
      // change opacity from 255 to 0
      this.alpha = lerp(this.alpha, 0, 0.3);
      // if done, stop
      if (this.alpha <= 1) {
        this.fadeIn = false;
      }
      // if fading out
    } else if (this.fadeOut) {
      // change opacity from 0 to 255
      this.alpha = lerp(this.alpha, 255, 1);
      if (this.alpha >= 254) {
        // if done, do fade in
        this.fadeOut = false;
        this.fadeIn = true;
      }
    }
    // use the opacity to draw a window-size rectangle above the game background
    fill(38, this.alpha);
    rect(this.x, this.y, width, height);
    pop();
  }

  // changeDirTo(newDir)
  //
  // handle changing direction
  changeDirTo(newDir) {
    this.lastDir = this.dir; // update last direction
    this.dir = newDir; // update current direction
    // play fade out animation first
    this.fadeOut = true;
    this.fadeIn = false;
  }
}
