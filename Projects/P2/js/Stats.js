// Stats
//
// An object used to display player account information near the top of the screen
class Stats {
  constructor() {
    this.width = width / 6;
    this.height = height / 8;
    this.x = width / 2;
    this.y = height / 20 + height / 12 + this.height/2;

    this.margin = 12;
    this.rect0X = this.x - this.width - this.width / 2 - this.margin * 3;
    this.rect1X = this.x - this.width / 2 - this.margin;
    this.rect2X = this.x + this.width / 2 + this.margin;
    this.rect3X = this.x + this.width + this.width / 2 + this.margin * 3;

    this.views = 0;
    this.viewsDisplay = "";
    this.fans = 0;
    this.fansDisplay = "";
    this.rating = 100;

    this.recordForRating = [];

    this.videos = 0;

    this.viewsAddRate = 0;
  }

  addViewsRate(videoValue){
    this.viewsAddRate += videoValue;
  }

  setViews(views){
    this.views = views;
  }

  addView(){
    this.views += this.viewsAddRate/100;

    if (this.views < 1000){
      this.viewsDisplay = int(this.views);
    }else if (this.views >= 1000 && this.views <= 9999){
      let temp = int(this.views).toString()[0];
      this.viewsDisplay = temp+"K";
    }else if (this.views >= 10000 && this.views <= 99999){
      let temp = int(this.views).toString().substring(0, 2);
      this.viewsDisplay = temp+"K";
    }else if (this.views >= 100000 && this.views <= 999999){
      let temp = int(this.views).toString().substring(0, 3);
      this.viewsDisplay = temp+"K";
    }else if (this.views >= 1000000 && this.views <= 9999999){
      let temp = int(this.views).toString()[0];
      this.viewsDisplay = temp+"M";
    }else if (this.views >= 10000000){
      let temp = int(this.views).toString().substring(0, 2);
      this.viewsDisplay = temp+"M";
    }
  }

  setFans(fans){
    this.fans = fans;
  }

  addFan(){
    this.fans = this.views/10;
    if (this.fans < 1000){
      this.fansDisplay = int(this.fans);
    }else if (this.fans >= 1000 && this.fans <= 9999){
      let temp = int(this.fans).toString()[0];
      this.fansDisplay = temp+"K";
    }else if (this.fans >= 10000 && this.fans <= 99999){
      let temp = int(this.fans).toString().substring(0, 2);
      this.fansDisplay = temp+"K";
    }else if (this.fans >= 100000 && this.fans <= 999999){
      let temp = int(this.fans).toString().substring(0, 3);
      this.fansDisplay = temp+"K";
    }else if (this.fans >= 1000000 && this.fans <= 9999999){
      let temp = int(this.fans).toString()[0];
      this.fansDisplay = temp+"M";
    }
  }

  setRating(rating){
    this.rating = rating;
  }

  updateRating(){
    let total = 0;
    for(let i=0;i<this.videos;i++){
      total += this.recordForRating[i];
    }
    this.rating = int((total/this.videos));
  }

  setVideos(videos){
    this.videos = videos;
  }

  addVideo(risk){
    if (risk === 2){
      this.recordForRating.push(33);
    }else if (risk === 1){
      this.recordForRating.push(66);
    }else if (risk === 0){
      this.recordForRating.push(100);
    }
    this.videos ++;
  }

  display() {
    push();
    rectMode(CENTER);
    textAlign(CENTER, CENTER);
    fill(100);
    rect(this.x, this.y, width, this.height);
    fill(0);
    rect(this.rect0X, this.y, this.width, this.height - this.margin * 2);
    rect(this.rect1X, this.y, this.width, this.height - this.margin * 2);
    rect(this.rect2X, this.y, this.width, this.height - this.margin * 2);
    rect(this.rect3X, this.y, this.width, this.height - this.margin * 2);
    fill(255);
    textSize(16);
    text("VIEWS", this.rect0X, this.y - this.height / 2 + this.margin * 2.25);
    text("FANS", this.rect1X, this.y - this.height / 2 + this.margin * 2.25);
    text("RATING", this.rect2X, this.y - this.height / 2 + this.margin * 2.25);
    text("VIDEOS", this.rect3X, this.y - this.height / 2 + this.margin * 2.25);
    textSize(42);
    fill(RED);
    text(this.viewsDisplay, this.rect0X, this.y + this.margin);
    fill(ORANGE);
    text(this.fansDisplay, this.rect1X, this.y + this.margin);
    if (this.rating >= 85){
      fill(GREEN);
    }else if (this.rating < 85 && this.rating >= 70){
      fill(ORANGE);
    }else if (this.rating < 70 && this.rating >= 50){
      fill(YELLOW);
    }else if (this.rating < 50){
      fill(RED);
    }
    text(this.rating + "%", this.rect2X, this.y + this.margin);
    fill(BLUE);
    text(this.videos, this.rect3X, this.y + this.margin);
    pop();
  }
}
