// Background
//
// acts as a separated componenet
// to manage game background itself
// so that script.js will be cleaner
class Background{
  constructor(img){
    this.img = img; // the first image has to be BG_FRONT to match the dir index
    this.dir = 0;
    this.lastDir = this.dir;
    this.targetDir = this.dir

    // position
    this.x = width/2;
    this.y = height/2;

    // size
    this.height = height; // window height
    this.width = (this.height/img.height)*img.width; //

    this.margin = 24;

    this.fadeIn = false;
    this.fadeOut = false
    this.alpha = 255;

    // game progress
    this.lightOff = false;
    // front
    this.panelOpened = false;
    this.fuseInstalled = false;
    this.doorOpened = false;
    // left
    this.drawerLeftOut = false;
    this.drawerRightOut = false;
    this.plantMoved = false;
    // back
    this.coffeeMachinePowered = false;
    this.posterOpened = false;
    this.fuseTaken = false;
    // right
    this.cabinLeftOut = false;
    this.cabinRightOut = false;
    this.cabinBottomOut = false;
    // down
    this.trapDoorOpened = false;
    this.cordTaken = false;
  }

  display(){
    push();
    imageMode(CORNER);
    this.displayImg(bgArray[this.dir]);
    pop();
    // front
    if (this.dir === 0){
      if (this.panelOpened){
        this.displayImg(OBJ_PANEL_OPENED);
      }else{
        this.displayImg(OBJ_PANEL);
        if (this.fuseInstalled){
          this.displayImg(OBJ_FUSE_INSTALLED);
        }
      }
      if (this.doorOpened){
        this.dispayImg(OBJ_DOOR_OPENED);
      }
    // left
    }else if (this.dir === 1){
      if (this.drawerLeftOut){
        this.displayImg(OBJ_DRAWER_LEFT_OUT);
      }
      if (this.drawerRightOut){
        this.displayImg(OBJ_DRAWER_RIGHT_OUT);
      }
      if (this.plantMoved){
        this.displayImg(OBJ_PLANT_MOVED);
      }else{
        this.displayImg(OBJ_PLANT);
      }
    // back
    }else if (this.dir === 2){
      if (this.posterOpened){
        this.displayImg(OBJ_HOLE);
        if (!this.fuseTaken){
          this.displayImg(OBJ_FUSE);
        }
      }
      if (this.coffeeMachinePowered){
        this.displayImg(OBJ_CORD_USED);
      }
    // right
    }else if (this.dir === 3){
      if (this.cabinBottomOut){
        this.displayImg(OBJ_CABIN_BOTTOM_OUT);
      }
      if (this.cabinLeftOut){
        this.displayImg(OBJ_CABIN_LEFT_OUT);
      }
      if (this.cabinRightOut){
        this.displayImg(OBJ_CABIN_RIGHT_OUT);
      }
      this.displayImg(OBJ_BOOKLET);
    // down
    }else if (this.dir === 4){
      if (this.trapDoorOpened){
        this.displayImg(OBJ_TRAPDOOR_OPENED);
        if (!this.cordTaken){
          this.displayImg(OBJ_CORD);
        }
      }
    }
    if (this.lightOff){
      if (this.dir === 0){
        this.displayImg(OVERLAY_DARKEN_FRONT);
      }else if (this.dir === 5){
        this.displayImg(OVERLAY_LIGHT_OFF);
      }else{
        this.displayImg(OVERLAY_DARKEN);
      }
    }
    this.animation();
  }

  displayImg(img){
    push();
    imageMode(CENTER);
    image(img,this.x,this.y,this.width,this.height);
    pop();
  }

  animation(){
    push();
    if (this.fadeIn){
      this.alpha = lerp(this.alpha, 0, 0.3);
      if (this.alpha <= 1){
        this.fadeIn = false;
      }
    }else if(this.fadeOut){
      this.alpha = lerp(this.alpha, 255, 1);
      if (this.alpha >= 254){
        this.fadeOut = false;
        this.fadeIn = true;
      }
    }
    fill(38,this.alpha);
    rect(this.x,this.y,width,height);
    pop();
  }

  changeDirTo(newDir){
    this.lastDir = this.dir;
    this.dir= newDir;
    this.fadeOut = true;
    this.fadeIn = false;
  }
}
