class Card{
  constructor(id,name,color){
    this.name = name;
    this.color = color;
    this.id = id;
    this.width = width/6 ;
    this.height = height/4;

    this.y = height;
    this.yNotFocused = height;
    this.yFocused = height - this.height/2 ;
    this.focused = false;

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

    if (name==="Special"){
      let p = random(0,1);
      if (p >= 0 && p < 0.2){
        this.des = "RED\nIS\nORANGE";
      }else if (p >= 0.2 && p < 0.4){
        this.des = "RED\nIS\nYELLOW";
      }else if (p >= 0.4 && p < 0.6){
        this.des = "RED\nIS\n GREEN";
      }else if (p >= 0.6 && p < 0.8){
        this.des = "ALL \nGREEN";
      }else if (p >= 0.8 && p < 1){
        this.des = "CHANGE\nKEYWORD";
      }
    }else{
      this.des = "KEYWORD";
    }

  }

  display(){
    push();
    rectMode(CENTER);
    textAlign(CENTER,CENTER);
    fill(this.color);
    rect(this.x,this.y,this.width,this.height);
    fill(255);
    textSize(20);
    text(this.name,this.x,this.y-this.height/2+24);
    textSize(16);
    text(this.des,this.x,this.y);
    pop();
  }

  changeFocus(focus){
    this.focus = focus;
    if (focus){
      this.y = lerp(this.y,this.yFocused,0.2);
    }else{
      this.y = lerp(this.y,this.yNotFocused,0.2);
    }
  }
}