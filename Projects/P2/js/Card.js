// Card
//
// The keyword card for player to choose to generate their videos
class Card{
  constructor(id){
    this.id = id;
    this.width = width/6;
    this.height = height/4;

    this.y = height;
    this.yNotFocused = height;
    this.yFocused = height - this.height/4;
    this.focused = false;
    this.swaped = false;
    this.accepted = false;

    this.x_0 = width/2 - this.width*2 - 24;
    this.x_1 = width/2 - this.width - 12;
    this.x_2 = width/2;
    this.x_3 = width/2 + this.width + 12;
    this.x_4 = width/2 + this.width*2 + 24;

    if (id === 0){
      this.x = width/2 - this.width*2 - 24;
    }else if(id === 1){
      this.x = width/2 - this.width - 12;
    }else if(id === 2){
      this.x = width/2;
    }else if(id === 3){
      this.x = width/2 + this.width + 12;
    }else if(id === 4){
      this.x = width/2 + this.width*2 + 24;
    }

    this.word = "Name";
    this.colorId = 0;
    this.des = "KEYWORD";
    this.value = 0;

    this.specialId = -1;
  }

  setCardAttributes(word,color,value){
    this.word =word;
    this.colorId = color;
    this.value = value;
    this.des = "KEYWORD";
  }

  setSpecial(){
    let p = int(random(0,4));
    this.specialId = p;
    if (p === 0){
      this.des = "-1\nRISK\nLEVEL";
    }else if (p === 1){
      this.des = "-2\nRISK\nLEVEL";
    }else if (p === 2){
      this.des = "+10\nVALUE";
      this.value += 10;
    }else if (p === 3){
      this.des = "+20\nVALUE";
      this.value += 20;
    }
    this.colorId = 3;
  }

  display(){
    push();
    rectMode(CENTER);
    textAlign(CENTER,CENTER);
    fill(255);
    rect(this.x,this.y,this.width,this.height);
    if (this.colorId === 0){
      fill(GREEN);
    }else if (this.colorId === 1){
      fill(ORANGE);
    }else if (this.colorId === 2){
      fill(RED);
    }else if (this.colorId === 3){
      fill(PURPLE);
    }
    rect(this.x,this.y,this.width*0.9,this.height*0.9);
    fill(255);
    textSize(18);
    text(this.word,this.x,this.y-this.height/2 + 24);
    textSize(16);
    text(this.des,this.x,this.y);
    pop();
    if (this.focus){
      this.y = lerp(this.y,this.yFocused,0.2);
    }else{
      if (this.swaped){
        this.y = lerp(this.y,- this.height ,0.1);
      }else if (this.accepted){
        this.y = lerp(this.y,height + this.height,0.1);
      }else{
        this.y = lerp(this.y,this.yNotFocused,0.2);
      }
    }
  }

  swap(){
    this.focus = false;
    this.swaped = true;

    var thisObject = this;
    setTimeout(function() {
      thisObject.reset();
    }, 300);
  }

  accept(){
    this.focus = false;
    this.accepted = true;
  }

  reset(){
    this.y = height + this.height; // bottom of the screen
    this.swaped = false;
    this.accepted = false;
  }
}
