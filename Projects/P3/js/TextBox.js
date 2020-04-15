// TextBox
//
// display message in the game, clicking or pressing any key will dismiss them
class TextBox {
  constructor() {
    // position
    this.x = width / 2;
    this.y = height / 2;

    this.update = false; // if updating the text

    this.isBuffer = false; // if the text is the second message
    this.bufferText = null; // store the second message

    this.displayText = ""; // message text to be displayed
    this.textInput; // input text
    this.textLength; // message length
    this.text = []; // store each character of the input text
    this.index = 0; // index of the text array

    this.showing = false; // visibility of the message
  }

  // show()
  //
  // set visibility to true
  show() {
    this.showing = true;
  }

  // hide()
  //
  // set visibility to false
  hide() {
    this.showing = false;
  }

  // buffer(text)
  //
  // store the second message
  buffer(text) {
    this.bufferText = text;
  }

  // insertBuffer()
  //
  // display the second message
  insertBuffer() {
    this.isBuffer = true;
    this.insertText(this.bufferText);
  }

  // insertText(text)
  //
  // prepare text to be displayed as a message
  insertText(text) {
    this.show();
    // reset
    this.displayText = "";
    this.textInput = text; // store text input
    this.textLength = text.length;
    this.text = [];
    this.index = 0;
    // push each character in the array
    for (let i = 0; i < this.textLength; i++) {
      this.text.push(this.textInput[i]);
    }
    this.update = true; // start displaying the message
  }

  // updateText()
  //
  // update the message by adding one character at a time
  updateText() {
    let time = frameCount; // get current frame count
    // every frame update the message
    if (time % 1 === 0 && time != 0) {
      // add the character to the displayed message
      this.displayText += this.text[this.index].toUpperCase();
      if (this.index < this.textLength - 1) {
        this.index += 1; // update index
      } else {
        // if done, stop updating
        this.update = false;
        // if it is the second message
        if (this.isBuffer) {
          // reset buffer
          this.bufferText = null;
          this.isBuffer = false;
        }
      }
    }
  }

  // fullText()
  //
  // skip text animation
  // reserved for the developer
  // sometimes the message is too short that skipping is unnecessary and might end up dismissing the message
  fullText() {
    // display the full text right away
    this.displayText = this.textInput.toUpperCase();
    this.update = false;
    if (this.isBuffer) {
      this.bufferText = null;
      this.isBuffer = false;
    }
  }

  // display()
  //
  // display the message text
  display() {
    // if the visibility is true
    if (this.showing) {
      push();
      rectMode(CENTER);
      // text will have a black smooth outline
      stroke(0);
      strokeWeight(4);
      strokeJoin(ROUND);
      textAlign(CENTER, CENTER);
      fill(255);
      // if the text is not fully displayed, update the text
      if (this.update) {
        this.updateText();
      }
      textSize(20);
      text(this.displayText, this.x, this.y);
      pop();
    }
  }
}
