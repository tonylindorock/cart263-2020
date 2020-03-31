class TextBox{
  constructor(){
    // dimension
    this.width = width/2;
    this.height = height/4;
    // position
    this.x = width/2;
    this.y = height/2;

    this.margin = 24;

    this.update = false;
    this.isBuffer = false;
    this.bufferText = null;

    this.displayText = "";
    this.textInput;
    this.textLength;
    this.text = [];
    this.index = 0;

    this.showing = false;
  }

  show(){
    this.showing = true;
  }

  hide(){
    this.showing = false;
  }

  buffer(text){
    this.bufferText = text;
  }

  insertBuffer(){
    this.isBuffer = true;
    this.insertText(this.bufferText);
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
    if (time%1 === 0 && time !=0){
      this.displayText += this.text[this.index].toUpperCase();
      if (this.index < this.textLength - 1){
        this.index += 1;
      }else{
        this.update = false;
        if (this.isBuffer){
          this.bufferText = null;
          this.isBuffer = false;
        }
      }
    }
  }

  fullText(){
    this.displayText = this.textInput.toUpperCase();
    this.update = false;
    if(this.isBuffer){
      this.bufferText = null;
      this.isBuffer = false;
    }
  }

  display(){
    if (this.showing){
      push();
      rectMode(CENTER);
      stroke(0);
      strokeWeight(4);
      strokeJoin(ROUND);
      textAlign(CENTER,CENTER);
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
