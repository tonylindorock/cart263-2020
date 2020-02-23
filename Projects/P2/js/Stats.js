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
    this.fans = 0;
    this.rating = 100;
    this.videos = 0;
  }

  setViews(views){
    this.views = views;
  }

  addView(views){
    this.views += views;
  }

  setFans(fans){
    this.fans = fans;
  }

  addFans(fans){
    this.fans += fans;
  }

  setRating(rating){
    this.rating = rating;
  }

  addRating(rating){
    this.rating += rating;
  }

  setVideos(videos){
    this.videos = videos;
  }

  addVideos(videos){
    this.videos += videos;
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
    text("VIEWS", this.rect0X, this.y - this.height / 2 + this.margin * 2.5);
    text("FANS", this.rect1X, this.y - this.height / 2 + this.margin * 2.5);
    text("RATING", this.rect2X, this.y - this.height / 2 + this.margin * 2.5);
    text("VIDEOS", this.rect3X, this.y - this.height / 2 + this.margin * 2.5);
    textSize(42);
    fill(RED);
    text(this.views, this.rect0X, this.y + this.margin);
    fill(ORANGE);
    text(this.fans, this.rect1X, this.y + this.margin);
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
