class Notification{
  constructor(id,colorId){
    this.x = width/2;
    this.y = height/2;
    this.height = height/2;
    this.width = width/2;

    this.id = id;
    this.colorId = colorId;
    if (colorId === 0){
      this.color = "#4bafff"; // BLUE
    }else{
      this.color = "#ff6464"; // RED
    }
    this.title = "";
    this.des = "";

    this.show = true;

    this.buttonX = this.x;
    this.buttonY = this.y + this.width/2 - this.height/8;
  }

  setColor(colorId){
    this.colorId = colorId;
    if (colorId === 0){
      this.color = "#4bafff"; // BLUE
    }else{
      this.color = "#ff6464"; // RED
    }
  }

  setMessageType(id,removedVideoNum){
    this.color = "#ff6464";
    if (id === 0){
      this.id = id;
      this.title = "INSPECTION";
      this.des = "This month, we will have"+
      "\n..."+
      "\na STANDARD inspection!"+
      "\n..."+
      "\n\nAny of your videos marked as red"+
      "\nand valued at 75 or greater"+
      "\nwill be inspected."+
      "\n\nWe found "+removedVideoNum+" videos. Your fine is"+
      "\n$"+(100*removedVideoNum)+".";
    }else if (id === 1){
      this.id = id;
      this.title = "INSPECTION";
      this.des = "This month, we will have"+
      "\n..."+
      "\na DEEP inspection!"+
      "\n..."+
      "\n\nAny of your videos marked as red"+
      "\nwill be inspected and be removed."+
      "\n\nWe found "+removedVideoNum+" videos. Your fine is"+
      "\n$"+(100*removedVideoNum)+".";
    }else if (id === 2){
      this.id = id;
      this.color = "#4bafff";
      this.title = "MESSAGE";
      this.des = "From E-MAIL SERVICE"+
      "\n\nYou have received 1 e-mail"+
      "\n\nFROM: Good Media Inc."+
      "\nSUBJECT: Important Message"+
      "\nCONTENT: DEAR OUR ROYAL USER..."+
      "\n\nClick READ to open it.";
    }
  }

  display(){
    if (this.show){
      push();
      rectMode(CENTER);
      fill(0,100);
      rect(this.x,this.y,width,height);
      fill(255);
      stroke(this.color);
      strokeWeight(8);
      rect(this.x,this.y,this.width,this.height);
      noStroke();
      fill(this.color);
      rect(this.x,this.y - this.height/2 + this.height/16,this.width,this.height/8);
      fill(255);
      textAlign(CENTER,CENTER);
      textSize(32);
      text("-- "+this.title+" --",this.x,this.y - this.width/2 + this.height/16);
      fill(0);
      if (this.id === 0 || this.id === 1){
        text("CLOSE",this.x,this.y + this.width/2 - this.height/8);
      }else if (this.id === 2){
        text("READ",this.x,this.y + this.width/2 - this.height/8);
      }

      fill(0,200);
      textAlign(CENTER,TOP);
      textSize(16);
      text(this.des,this.x,this.y - this.width/4 - 32);
      pop();
    }
  }
}
