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
    this.stripTaken = false;
  }

  display(){
    push();
    imageMode(CORNER);
    this.displayImg(bgArray[this.dir]);
    pop();
    if (this.dir === 0){
      if (this.panelOpened){
        this.displayImg(OBJ_PANEL_OPENED);
      }else{
        this.displayImg(OBJ_PANEL);
      }
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
    }else if (this.dir === 2){

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
    }else if (this.dir === 4){

    }else if (this.dir === 5){

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
  }
}
