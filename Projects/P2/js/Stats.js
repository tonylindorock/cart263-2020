// Stats
//
// An object used to display player account information near the top of the screen
class Stats {
  constructor() {
    // size
    this.width = width / 6;
    this.height = height / 8;
    // position
    this.x = width / 2;
    this.y = height / 20 + height / 12 + this.height / 2;

    this.margin = 12;

    // BG containers x position
    this.rect0X = this.x - this.width - this.width / 2 - this.margin * 3;
    this.rect1X = this.x - this.width / 2 - this.margin;
    this.rect2X = this.x + this.width / 2 + this.margin;
    this.rect3X = this.x + this.width + this.width / 2 + this.margin * 3;

    // attributes
    this.views = 0;
    this.viewsDisplay = "";
    this.fans = 0;
    this.fansDisplay = "";
    this.rating = 100;

    this.recordForRating = []; // array to record video risk level

    this.videos = 0; // uploaded video

    this.viewsAddRate = 0; // how fast the views and fans will add up
  }

  // addViewsRate
  //
  // add the video value to the viewsAddRate
  addViewsRate(videoValue) {
    this.viewsAddRate += videoValue;
  }

  // setViews
  //
  // set the view
  setViews(views) {
    this.views = views;
  }

  // addView
  //
  // update views based on the rate and change how it's displayed if it's required
  addView() {
    this.views += this.viewsAddRate / 100;

    if (this.views < 1000) {
      this.viewsDisplay = int(this.views);
    } else if (this.views >= 1000 && this.views <= 9999) {
      let temp = int(this.views).toString()[0]; // extract frist character from 1000-9999
      this.viewsDisplay = temp + "K";
    } else if (this.views >= 10000 && this.views <= 99999) {
      let temp = int(this.views).toString().substring(0, 2); // extract frist 2 characters from 10000-99999
      this.viewsDisplay = temp + "K";
    } else if (this.views >= 100000 && this.views <= 999999) {
      let temp = int(this.views).toString().substring(0, 3); // extract frist 3 characters from 100000-999999
      this.viewsDisplay = temp + "K";
    } else if (this.views >= 1000000 && this.views <= 9999999) {
      let temp = int(this.views).toString()[0];
      this.viewsDisplay = temp + "M";
    } else if (this.views >= 10000000) {
      let temp = int(this.views).toString().substring(0, 2);
      this.viewsDisplay = temp + "M";
    }
  }

  // setFans
  //
  // set number of fans
  setFans(fans) {
    this.fans = fans;
  }

  // addFan
  //
  // update the number of fans according to the views
  addFan() {
    this.fans = this.views / 10; // getting every 10 views will add one fan

    if (this.fans < 1000) {
      this.fansDisplay = int(this.fans);
    } else if (this.fans >= 1000 && this.fans <= 9999) {
      let temp = int(this.fans).toString()[0];
      this.fansDisplay = temp + "K";
    } else if (this.fans >= 10000 && this.fans <= 99999) {
      let temp = int(this.fans).toString().substring(0, 2);
      this.fansDisplay = temp + "K";
    } else if (this.fans >= 100000 && this.fans <= 999999) {
      let temp = int(this.fans).toString().substring(0, 3);
      this.fansDisplay = temp + "K";
    } else if (this.fans >= 1000000 && this.fans <= 9999999) {
      let temp = int(this.fans).toString()[0];
      this.fansDisplay = temp + "M";
    } else if (this.fans >= 10000000) {
      let temp = int(this.fans).toString().substring(0, 2);
      this.fansDisplay = temp + "M";
    }
  }

  // setRating
  //
  // set rating
  setRating(rating) {
    this.rating = rating;
  }

  // updateRating
  //
  // calculate the rating
  updateRating() {
    let total = 0;
    // add up everything
    for (let i = 0; i < this.videos; i++) {
      total += this.recordForRating[i];
    }
    // get the rating
    this.rating = int((total / this.videos));
  }

  // setVideos
  //
  // set number of videos
  setVideos(videos) {
    this.videos = videos;
  }

  // addVideo
  //
  // call this every time the player uploads a video
  // update the array
  addVideo(risk) {
    // if high risk
    if (risk === 2) {
      this.recordForRating.push(33);
      // if mid risk
    } else if (risk === 1) {
      this.recordForRating.push(66);
      // if low risk
    } else if (risk === 0) {
      this.recordForRating.push(100);
    }
    this.videos++; // update number of videos
  }

  // display
  //
  // display the stats above the video interface
  display() {
    push();
    rectMode(CENTER);
    textAlign(CENTER, CENTER);
    // BG container
    fill(100);
    rect(this.x, this.y, width, this.height);
    // stats containers
    fill(0);
    rect(this.rect0X, this.y, this.width, this.height - this.margin * 2);
    rect(this.rect1X, this.y, this.width, this.height - this.margin * 2);
    rect(this.rect2X, this.y, this.width, this.height - this.margin * 2);
    rect(this.rect3X, this.y, this.width, this.height - this.margin * 2);
    // label
    fill(255);
    textSize(16);
    text("VIEWS", this.rect0X, this.y - this.height / 2 + this.margin * 2.25);
    text("FANS", this.rect1X, this.y - this.height / 2 + this.margin * 2.25);
    text("RATING", this.rect2X, this.y - this.height / 2 + this.margin * 2.25);
    text("VIDEOS", this.rect3X, this.y - this.height / 2 + this.margin * 2.25);
    // stats
    textSize(42);
    fill(RED);
    text(this.viewsDisplay, this.rect0X, this.y + this.margin);
    fill(ORANGE);
    text(this.fansDisplay, this.rect1X, this.y + this.margin);
    // match the rating color to the rating value
    if (this.rating >= 85) {
      fill(GREEN);
    } else if (this.rating < 85 && this.rating >= 70) {
      fill(ORANGE);
    } else if (this.rating < 70 && this.rating >= 50) {
      fill(YELLOW);
    } else if (this.rating < 50) {
      fill(RED);
    }
    text(this.rating + "%", this.rect2X, this.y + this.margin);
    fill(BLUE);
    text(this.videos, this.rect3X, this.y + this.margin);
    pop();
  }
}
