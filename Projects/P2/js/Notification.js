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

  setMessageType(id){
    if (id === 0){
      this.title = "MESSAGE";
      this.des = "MONTHLY INSPECTION"+
      "\n\nThis month, we will have"+
      "\na STANDARD inspection."+
      "\nAny of your videos marked as red"+
      "\nwill be inspected."+
      "\n\nHowever, only the videos with"+
      "\nthe value over 75 will be removed."+
      "\n\nWe found 0 videos. Your fine is"+
      "\n$0";
    }else if (id === 1){
      this.title = "MESSAGE";
      this.des = "MONTHLY INSPECTION"+
      "\n\nThis month, we will have"+
      "\na DEEP inspection."+
      "\n\nAny of your videos marked as red"+
      "\nwill be inspected and be removed."+
      "\n\nWe found 0 videos. Your fine is"+
      "\n$0";
    }else if (id === 2){
      this.title = "MESSAGE";
      this.des = "E-MAIL SERVICE"+
      "\n\nYou have received an e-mail"+
      "\nfrom Good Medic Inc.."+
      "\n\nYour account and information"+
      "\nare being protected."+
      "\n\nClick OKAY to open it.";
    }
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
