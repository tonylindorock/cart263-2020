class History{
  constructor(){
    this.rectHieght = height/8;
    this.rectWdith = width - width/12;
    this.videoObject = {
      name: "",
      color :"",
      value: 0
    }

    this.record = [];
    this.margin = 12;

    this.rangeFrom = 4;
    this.rangeTo = 0;

    this.viewFrom = this.rangeFrom;
    this.viewTo = this.rangeTo;

    this.rect0Y = height/6;
    this.rect1Y = height/6 + height/8 + this.margin;
    this.rect2Y = height/6 + 2*(height/8) + 2*this.margin;
    this.rect3Y = height/6 + 3*(height/8) + 3*this.margin;
    this.rect4Y = height/6 + 4*(height/8) + 4*this.margin;
  }

  addVideoToRecord(name,risk,value){
    let videoObject = {
      name: "",
      color: "",
      value: 0
    };
    videoObject.name = name;
    if (risk===0){
      videoObject.color = "#33de7a";
    }else if (risk===1){
      videoObject.color = "#ffaf4b";
    }else if (risk===2){
      videoObject.color = "#ff6464";
    }
    videoObject.value = value;

    this.record.push(videoObject);

    if (this.record.length > 5){
      this.rangeFrom = this.record.length-1;
      this.rangeTo = this.rangeFrom - 4;
      this.resetView();
    }
  }

  nextPage(){
    if (this.viewTo > 0){
      this.viewFrom -= 1;
      this.viewTo -= 1;
    }
  }

  prevPage(){
    if (this.viewFrom < this.record.length - 1){
      this.viewFrom += 1;
      this.viewTo += 1;
    }
  }

  resetView(){
    this.viewFrom = this.rangeFrom;
    this.viewTo = this.rangeTo;
  }

  displayRecord(){
    push();
    if (this.record[0]!=null){
      if (this.record.length <= 5){
        for(let i = this.record.length - 1, j = 0; i >= 0; i--, j++){
          let yPos = height/6 + j*height/8 + j*this.margin;
          textAlign(LEFT,CENTER);
          textSize(22);
          fill(this.record[i].color);
          text("0"+(i+1)+" "+this.record[i].name,width / 12, yPos);
          textAlign(RIGHT,CENTER);
          textSize(32);
          fill(YELLOW);
          text(this.record[i].value,width - width / 12, yPos);
        }
      }else{
        for(let i = this.viewFrom, j = 0; i >= this.viewTo; i--, j++){
          let yPos = height/6 + j*height/8 + j*this.margin;
          textAlign(LEFT,CENTER);
          textSize(22);
          fill(this.record[i].color);
          if (i+1 < 10){
            text("0"+(i+1)+" "+this.record[i].name,width / 12, yPos);
          }else{
            text((i+1)+" "+this.record[i].name,width / 12, yPos);
          }
          textAlign(RIGHT,CENTER);
          textSize(32);
          fill(YELLOW);
          text(this.record[i].value,width - width / 12, yPos);
        }
      }
    }
    pop();
  }

  display(){
    push();
    rectMode(CENTER);
    textAlign(CENTER,CENTER);
    fill("#262626");
    rect(width / 2, height / 2, width, height);
    fill(25);
    rect(width / 2, this.rect0Y, this.rectWdith, this.rectHieght);
    rect(width / 2, this.rect1Y, this.rectWdith, this.rectHieght);
    rect(width / 2, this.rect2Y, this.rectWdith, this.rectHieght);
    rect(width / 2, this.rect3Y, this.rectWdith, this.rectHieght);
    rect(width / 2, this.rect4Y, this.rectWdith, this.rectHieght);
    this.displayRecord();
    // buttons
    fill(255);
    text("NEXT", width - width / 8, height - height / 12);
    text("PREV", width - width / 8 - width / 6 - this.margin, height - height / 12);
    rect(width / 6, height - height / 12, width / 4, height / 12);
    textSize(32);
    fill(0);
    text("CLOSE", width / 6, height - height / 12);
    pop();
  }
}
