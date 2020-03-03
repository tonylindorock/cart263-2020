// History
//
// An object used to display as a list of player's uploaded videos
class History {
  constructor() {
    // the BG container for each video info
    this.rectHieght = height / 8;
    this.rectWdith = width - width / 12;

    this.margin = 12;

    this.record = []; // contain video objects

    // range of the array to be displayed on the screen
    this.rangeFrom = 4;
    this.rangeTo = 0;

    // range of the array the player is seeing (viewing range)
    this.viewFrom = this.rangeFrom;
    this.viewTo = this.rangeTo;

    // 5 y positions for the BG container and text
    this.rect0Y = height / 6;
    this.rect1Y = height / 6 + height / 8 + this.margin;
    this.rect2Y = height / 6 + 2 * (height / 8) + 2 * this.margin;
    this.rect3Y = height / 6 + 3 * (height / 8) + 3 * this.margin;
    this.rect4Y = height / 6 + 4 * (height / 8) + 4 * this.margin;
  }

  // addVideoToRecord
  //
  // creat a video object with given information and add it to the array
  addVideoToRecord(name, risk, value) {
    // initiate object
    let videoObject = {
      name: "",
      color: "",
      value: 0
    };
    // change attributes
    videoObject.name = name;
    if (risk === 0) {
      videoObject.color = "#33de7a";
    } else if (risk === 1) {
      videoObject.color = "#ffaf4b";
    } else if (risk === 2) {
      videoObject.color = "#ff6464";
    }
    videoObject.value = value;

    this.record.push(videoObject);

    // this way, the history will always display the most recent videos when opened
    if (this.record.length > 5) {
      this.rangeFrom = this.record.length - 1;
      this.rangeTo = this.rangeFrom - 4;
      this.resetView();
    }
  }

  // nextPage
  //
  // update viewing range of the array to be seen
  nextPage() {
    if (this.viewTo > 0) {
      this.viewFrom -= 1;
      this.viewTo -= 1;
    }
  }

  // prevPage
  //
  // update viewing range of the array to be seen
  prevPage() {
    if (this.viewFrom < this.record.length - 1) {
      this.viewFrom += 1;
      this.viewTo += 1;
    }
  }

  // resetView
  //
  // reset the viewing range to display the most recent videos
  resetView() {
    this.viewFrom = this.rangeFrom;
    this.viewTo = this.rangeTo;
  }

  // removeVideo
  //
  // remove a video by its index
  removeVideo(index) {
    // not actually removing an object from the array but changing its display attributes
    this.record[index].name = "VIDEO REMOVED";
    this.record[index].color = "#FFF";
    this.record[index].value = "--";
  }

  // displayRecord
  //
  // display 5 objects or fewer at a time from the array based on the viewing range
  displayRecord() {
    push();
    if (this.record[0] != null) {
      // if <= 5 videos, viewing range is fixed at 5-0
      if (this.record.length <= 5) {
        for (let i = this.record.length - 1, j = 0; i >= 0; i--, j++) {
          // so the video info is displayed from top to the bottom
          let yPos = height / 6 + j * height / 8 + j * this.margin;
          textAlign(LEFT, CENTER);
          textSize(20);
          // video title and number
          fill(this.record[i].color);
          text("0" + (i + 1) + " " + this.record[i].name, width / 12, yPos);
          textAlign(RIGHT, CENTER);
          textSize(32);
          fill(YELLOW);
          // video value
          text(this.record[i].value, width - width / 12, yPos);
        }
      } else {
        // if > 5 videos, the range of videos can be seen is decided by the viewing range
        for (let i = this.viewFrom, j = 0; i >= this.viewTo; i--, j++) {
          let yPos = height / 6 + j * height / 8 + j * this.margin;
          textAlign(LEFT, CENTER);
          textSize(20);
          fill(this.record[i].color);
          // if < 10, add a 0 to the number
          if (i + 1 < 10) {
            text("0" + (i + 1) + " " + this.record[i].name, width / 12, yPos);
            // if >= 10, do not add anything
          } else {
            text((i + 1) + " " + this.record[i].name, width / 12, yPos);
          }
          textAlign(RIGHT, CENTER);
          textSize(32);
          fill(YELLOW);
          text(this.record[i].value, width - width / 12, yPos);
        }
      }
    }
    pop();
  }

  // display
  //
  // display the history interface
  display() {
    push();
    rectMode(CENTER);
    textAlign(CENTER, CENTER);
    fill("#262626");
    rect(width / 2, height / 2, width, height);
    fill(25);
    // BG containers
    rect(width / 2, this.rect0Y, this.rectWdith, this.rectHieght);
    rect(width / 2, this.rect1Y, this.rectWdith, this.rectHieght);
    rect(width / 2, this.rect2Y, this.rectWdith, this.rectHieght);
    rect(width / 2, this.rect3Y, this.rectWdith, this.rectHieght);
    rect(width / 2, this.rect4Y, this.rectWdith, this.rectHieght);
    // display video info in the containers
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
