class TextBox{
  constructor(text){
    // dimension
    this.width = width - width/4;
    this.height = height/4;
    // position
    this.x = width/2;
    this.y = height - height/6;

    this.margin = 24;

    this.update = false;

    this.displayText = "";
    this.textInput;
    this.textLength;
    this.text = [];
    this.index = 0;

    this.insertText(text);
  }

  insertText(text){
    this.displayText = "";
    this.textInput = text;
    this.textLength = text.length
    this.text = [];
    this.index = 0;

    for(let i = 0; i < this.textLength; i++){
      append(this.text,this.textInput[i]);
    }
    this.update = true;
  }

  updateText(){
    let time = frameCount;
    if (time%2 === 0 && time !=0){
      this.displayText += this.text[this.index];
      if (this.index < this.textLength - 1){
        this.index += 1;
      }else{
        this.update = false;
      }
    }
  }

  fullText(){
    this.displayText = this.textInput;
    this.update = false;
  }

  display(){
    push();
    rectMode(CENTER);
    noStroke();
    fill(0,150);
    rect(this.x,this.y,this.width,this.height);
    textAlign(LEFT,TOP);
    fill(255);
    if (this.update){
      this.updateText();
    }else{
      fill(255);
      rect(this.x + this.width/2 - this.margin,this.y + this.height/2 - this.margin,16,16);
    }
    textSize(24);
    text(this.displayText,this.x - this.width/2 + this.margin,this.y - this.height/2 + this.margin);
    pop();
  }
}
