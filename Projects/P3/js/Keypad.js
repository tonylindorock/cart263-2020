class Keypad{
  constructor(img){
    this.img = img;
    // position
    this.x = width/2;
    this.y = height/2;

    // size
    this.height = height; // window height
    this.width = (this.height/img.height)*img.width; //

    this.margin = 24;

    this.show = false;
    this.index = 0;
    this.input = "****";

    this.unlocked = false;
  }

  addCode(num){
    this.input += num;
    if (this.input.length === 4){
      if (this.input === "9264"){
        this.unlocked = true;
      }
    }
    if (this.input.length > 4){
      this.input = "";
    }
  }

  display(){
    if (this.show){
      push();
      imageMode(CENTER);
      image(this.img,this.x,this.y,this.width,this.height);
      textAlign(CENTER,TOP);
      textSize(64);
      fill(HIGHLIGHT);
      text(this.input,this.x + this.width/24,this.y - this.height/3.2);
      textSize(20);
      fill(0);
      // row 1
      text("1",this.x - this.width/16,this.y - this.height/9);
      text("2\nABC",this.x + this.width/22,this.y - this.height/9);
      text("3\nDEF",this.x + this.width/6.8,this.y - this.height/9);
      // row 2
      text("4\nGHI",this.x - this.width/16,this.y);
      text("5\nJKL",this.x + this.width/22,this.y);
      text("6\nMNO",this.x + this.width/6.8,this.y);
      // row 3
      text("7\nPQRS",this.x - this.width/16,this.y + this.height/8);
      text("8\nTUV",this.x + this.width/22,this.y + this.height/8);
      text("9\nWXYZ",this.x + this.width/6.8,this.y + this.height/8);
      // row 4
      text("0",this.x + this.width/22,this.y + this.height/4);
      pop();
    }
  }
}
