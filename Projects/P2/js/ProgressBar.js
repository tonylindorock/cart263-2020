class ProgressBar{
  constructor(x,y,color){
    this.color = color;

    this.progress = 0;
    this.height = height/24;
    this.width = width/4;
    this.x = x - width/8;
    this.y = y - height/48;
    this.progressWidth = this.progress;

    this.start = false;
    this.done = false;
  }

  display(){
    push();
    if (!this.done){
      rectMode(CORNER);
      fill(0);
      rect(this.x,this.y,this.width,this.height);
      fill(this.color);
      this.progressWidth = map(this.progress,0,100,0,this.width);
      rect(this.x,this.y,this.progressWidth,this.height);
      if (this.start){
        this.progress += 1;
      }
    }
    if (this.progress >= 100){
      this.done = true;
    }
    pop();
  }

  reset(){
    this.progress = 0;
    this.progressWidth = this.progress;
    this.start = false;
    this.done = false;
  }
}
