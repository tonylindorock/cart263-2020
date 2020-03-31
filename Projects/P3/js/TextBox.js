class TextBox{
  constructor(text){
    // dimension
    this.width = width - width/4;
    this.height = height/4;
    // position
    this.x = width/2;
    this.y = height/2;

    this.margin = 24;

    this.update = false;

    this.displayText = "";
    this.textInput;
    this.textLength;
    this.text = [];
    this.index = 0;

    this.showing = false;

    this.insertText(text);
  }

  show(){
    this.showing = true;
  }

  hide(){
    this.showing = false;
  }

  insertText(text){
    this.show();
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
    if (this.showing){
      push();
      rectMode(CENTER);
      stroke(0);
      strokeWeight(4);
      textAlign(CENTER,TOP);
      fill(255);
      if (this.update){
        this.updateText();
      }
      textSize(20);
      text(this.displayText,this.x,this.y);
      pop();
    }
  }
}
