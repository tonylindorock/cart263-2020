// Background
//
// acts as a separated componenet
// to manage game background itself
// so that script.js will be cleaner
class Background{
  constructor(img){
    this.img = img; // the first image has to be BG_FRONT to match the dir index
    this.dir = 0;

    // position
    this.x = width/2;
    this.y = height/2;

    // size
    this.height = height; // window height
    this.width = (this.height/img.height)*img.width; //

    // bg details
    // front
    this.panelOpened = false;
    this.doorOpened = false;
    // left
    this.drawerLeftOut = false;
    this.drawerRightOut = false;
    this.plantMoved = false;
    // right
    this.cabinLeftOut = false;
    this.cabinRightOut = false;
    this.cabinBottomOut = false;
    this.bookletTaken = false;
    // back
    this.coffeeMachinePowered = false;
    this.fuseTaken = false;
    // down
    this.trapDoorOpened = false;
    this.cordTaken = false;
  }

  display(){
    push();
    imageMode(CENTER);
    this.displayImg(bgArray[this.dir]);
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
      if (this.cabinLeftOut){
        this.displayImg(OBJ_CABIN_LEFT_OUT);
      }
      if (this.cabinRightOut){
        this.displayImg(OBJ_CABIN_RIGHT_OUT);
      }
      if (this.cabinBottomOut){
        this.displayImg(OBJ_CABIN_BOTTOM_OUT);
      }
      if (!this.bookletTaken){
        this.displayImg(OBJ_BOOKLET);
      }

    }else if (this.dir === 3){

    }else if (this.dir === 4){

    }else if (this.dir === 5){

    }
    pop();
  }

  displayImg(img){
    push();
    imageMode(CENTER);
    image(img,this.x,this.y,this.width,this.height);
    pop();
  }

  changeDirTo(newDir){
    this.dir = newDir;
  }
}
