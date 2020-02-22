class Notification{
  constructor(id,colorId){
    this.x = width/2;
    this.y = height/2;
    this.height = height/2;
    this.width = width/2;

    this.id = id;
    this.colorId = colorId;
    if (colorId === 0){
      this.color = "#4bff96"; // GREEN
    }else{
      this.color = "#ff6464"; // RED
    }
    this.title = "";
    this.des = "";

    this.show = true;

    this.buttonOkayX = this.x;
    this.buttonY = this.y + this.width/2 - this.height/8;
    this.buttonNoX = this.x - this.width/4;
    this.buttonYesX = this.x + this.width/4;
  }

  setColor(colorId){
    this.colorId = colorId;
    if (colorId === 0){
      this.color = "#4bff96"; // GREEN
    }else{
      this.color = "#ff6464"; // RED
    }
  }

  setTitle(title){
    this.title = title;
  }

  setDes(des){
    this.des = des;
  }

  display(){
    if (this.show){
      push();
      rectMode(CENTER);
      fill(0,100);
      rect(this.x,this.y,width,height);
      fill(255);
      rect(this.x,this.y,this.width,this.height);
      noStroke();
      fill(this.color);
      rect(this.x,this.y - this.height/2 + this.height/16,this.width,this.height/8);
      fill(0,200);
      textAlign(CENTER,CENTER);
      textSize(32);
      text("-- "+this.title+" --",this.x,this.y - this.width/2 + this.height/16);
      if (this.id === 0){
        fill(0);
        text("CLOSE",this.x,this.y + this.width/2 - this.height/8);
      }else if (this.id === 1){
        fill(0);
        text("NO",this.x - this.width/4,this.y + this.width/2 - this.height/8);
        text("YES",this.x + this.width/4,this.y + this.width/2 - this.height/8);
      }

      fill(0,200);
      textAlign(CENTER,TOP);
      textSize(16);
      text(this.des,this.x,this.y - this.width/4 - 32);
      pop();
    }
  }
}
