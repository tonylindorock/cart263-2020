// Card
//
// The keyword card for player to choose to generate their videos
class Card {
  constructor(id) {
    this.id = id; // number id
    // size
    this.width = width / 6;
    this.height = height / 4;

    this.y = height; // height in the screen
    this.yNotFocused = height; // height when not focused
    this.yFocused = height - this.height / 4; // height when is focused
    this.focused = false;
    // condition for playing the animation
    this.swaped = false;
    this.accepted = false;

    // x positions for all 5 cards
    this.x_0 = width / 2 - this.width * 2 - 24;
    this.x_1 = width / 2 - this.width - 12;
    this.x_2 = width / 2;
    this.x_3 = width / 2 + this.width + 12;
    this.x_4 = width / 2 + this.width * 2 + 24;

    // set x position based on the id
    if (id === 0) {
      this.x = this.x_0;
    } else if (id === 1) {
      this.x = this.x_1;
    } else if (id === 2) {
      this.x = this.x_2;
    } else if (id === 3) {
      this.x = this.x_3;
    } else if (id === 4) {
      this.x = this.x_4;
    }

    // display attributes
    this.word = "Name";
    this.colorId = 0;
    this.des = "KEYWORD"; // description of the card
    this.value = 0; // keyword value

    this.specialId = -1; // if this card is a special card (-1 is not)
  }

  // setCardAttributes
  //
  // set these values to the card's attributes
  setCardAttributes(word, color, value) {
    this.word = word;
    this.colorId = color;
    this.value = value;
    this.des = "KEYWORD";
  }

  // setSpecial
  //
  // make this card special
  setSpecial() {
    // random special ID
    let p = int(random(0, 4));
    this.specialId = p;
    // id: 0 risk level is 1 lower
    if (p === 0) {
      this.des = "-1\nRISK\nLEVEL";
      // id: 1 risk level is 2 lower
    } else if (p === 1) {
      this.des = "-2\nRISK\nLEVEL";
      // id: 2 addition 10 values
    } else if (p === 2) {
      this.des = "+10\nVALUE";
      this.value += 10;
      // id: 3 addition 20 values
    } else if (p === 3) {
      this.des = "+20\nVALUE";
      this.value += 20;
    }
    this.colorId = 3; // special card is purple
  }

  // display
  //
  // display the card and handle the animation
  display() {
    push();
    rectMode(CENTER);
    textAlign(CENTER, CENTER);
    // outer
    fill(255);
    rect(this.x, this.y, this.width, this.height);
    // color
    if (this.colorId === 0) {
      fill(GREEN);
    } else if (this.colorId === 1) {
      fill(ORANGE);
    } else if (this.colorId === 2) {
      fill(RED);
    } else if (this.colorId === 3) {
      fill(PURPLE);
    }
    // inner
    rect(this.x, this.y, this.width * 0.9, this.height * 0.9);
    // description
    fill(255);
    textSize(18);
    text(this.word, this.x, this.y - this.height / 2 + 24);
    textSize(16);
    text(this.des, this.x, this.y);
    pop();
    // if focused, raise up
    if (this.focus) {
      this.y = lerp(this.y, this.yFocused, 0.2);
    } else {
      // if being swapped, go to the top of the screen
      if (this.swaped) {
        this.y = lerp(this.y, -this.height, 0.1);
        // if being accepted, go to the bottom of the screen
      } else if (this.accepted) {
        this.y = lerp(this.y, height + this.height, 0.1);
        // if not being swapped, reset
      } else {
        this.y = lerp(this.y, this.yNotFocused, 0.2);
      }
    }
  }

  // swap
  //
  // set the card to swapping state, reset it after 300 ms
  swap() {
    // prepare for animation
    this.focus = false;
    this.swaped = true;

    // reset itself after 300 ms
    var thisObject = this;
    setTimeout(function() {
      thisObject.reset();
    }, 300);
  }

  // accept
  //
  // set card to accepting state
  accept() {
    this.focus = false;
    this.accepted = true;
  }

  // reset
  //
  // reset the card to original position
  reset() {
    this.y = height + this.height; // bottom of the screen, card cannot be seen
    // reset these variables, so the card will raise up
    this.swaped = false;
    this.accepted = false;
  }
}
