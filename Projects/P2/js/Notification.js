// Notification
//
// An object used to display as a notification
class Notification {
  constructor(id, colorId) {
    // position
    this.x = width / 2;
    this.y = height / 2;
    // size
    this.height = height / 2;
    this.width = width / 2;

    this.id = id; // notification id
    this.colorId = colorId;
    // color
    if (colorId === 0) {
      this.color = "#4bafff"; // BLUE
    } else {
      this.color = "#ff6464"; // RED
    }
    // contents
    this.title = "";
    this.des = "";

    this.show = true; // determine whether to display the notification

    // button position
    this.buttonX = this.x;
    this.buttonY = this.y + this.width / 2 - this.height / 8;
  }

  // setColor
  //
  // set the notification border color
  setColor(colorId) {
    this.colorId = colorId;
    if (colorId === 0) {
      this.color = "#4bafff"; // BLUE
    } else {
      this.color = "#ff6464"; // RED
    }
  }

  // setMessageType
  //
  // set the type of the notification
  setMessageType(id, removedVideoNum) {
    this.color = "#ff6464";
    // if it is monthly inspection
    // standard inspection
    if (id === 0) {
      this.id = id;
      this.title = "INSPECTION";
      this.des = "This month, we will have" +
        "\n..." +
        "\na STANDARD inspection!" +
        "\n..." +
        "\n\nAny of your videos marked as red" +
        "\nand valued at 75 or greater" +
        "\nwill be inspected." +
        "\n\nWe found " + removedVideoNum + " videos. Your fine is" +
        "\n$" + (100 * removedVideoNum) + ".";
      // deep inspection
    } else if (id === 1) {
      this.id = id;
      this.title = "INSPECTION";
      this.des = "This month, we will have" +
        "\n..." +
        "\na DEEP inspection!" +
        "\n..." +
        "\n\nAny of your videos marked as red" +
        "\nwill be inspected and be removed." +
        "\n\nWe found " + removedVideoNum + " videos. Your fine is" +
        "\n$" + (100 * removedVideoNum) + ".";
      // if it is email
    } else if (id === 2) {
      this.id = id;
      this.color = "#4bafff";
      this.title = "MESSAGE";
      this.des = "From E-MAIL SERVICE" +
        "\n\nYou have received 1 e-mail!" +
        "\n\nFROM: Good Media Inc." +
        "\nSUBJECT: Important Message" +
        "\nCONTENT: DEAR OUR ROYAL USER..." +
        "\n\nClick READ to open it.";
    }
  }

  // display
  //
  // display the notification window
  display() {
    if (this.show) {
      push();
      rectMode(CENTER);
      // darken the screen
      fill(0, 100);
      rect(this.x, this.y, width, height);
      // window
      fill(255);
      stroke(this.color);
      strokeWeight(8);
      rect(this.x, this.y, this.width, this.height);
      // top border
      noStroke();
      fill(this.color);
      rect(this.x, this.y - this.height / 2 + this.height / 16, this.width, this.height / 8);
      fill(255);
      textAlign(CENTER, CENTER);
      textSize(32);
      text("-- " + this.title + " --", this.x, this.y - this.width / 2 + this.height / 16);
      fill(0);
      // buttons
      if (this.id === 0 || this.id === 1) {
        text("CLOSE", this.x, this.y + this.width / 2 - this.height / 8);
      } else if (this.id === 2) {
        text("READ", this.x, this.y + this.width / 2 - this.height / 8);
      }

      fill(0, 200);
      textAlign(CENTER, TOP);
      textSize(16);
      text(this.des, this.x, this.y - this.width / 4 - 32);
      pop();
    }
  }
}
