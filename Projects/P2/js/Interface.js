class Interface{
  constructor(){
    this.height = height/2 - height/14;
    // center x y
    this.x = width/2;
    this.y = height / 20 + height / 12 + height / 8 + this.height/2;

    this.margin = 24;

    this.risk = 0;
    this.value = 0;
    this.violations = 0;
    this.rank = -1;

    this.progressBar = new ProgressBar(this.x,this.y,BLUE);
    this.uploading = false;
  }

  upload(){
    this.progressBar.start = true;
    this.uploading = true;
  }

  display(){
    push();
    rectMode(CENTER);
    // rect(this.x,this.y,width,this.height);
    if (!this.uploading){
      fill(100);
      rect(this.x,this.y,width/3,this.height/2);
      fill(RED);
      ellipse(this.x,this.y,this.height/4);
      fill(255);
      triangle(this.x-14,this.y+20,this.x+24,this.y,this.x-14,this.y-20);
    }else{
      fill(75);
      rect(this.x,this.y,width/3,this.height/2);
      this.progressBar.display();
      if (this.progressBar.done){
        textSize(32);
        textAlign(CENTER,CENTER);
        fill(BLUE);
        text("VIDEO\nUPLOADED",this.x,this.y);
        var thisObject = this;
        setTimeout(function(){
          thisObject.uploading = false;
        },500);
      }
    }

    textAlign(RIGHT,CENTER);
    textSize(32);
    fill(RED);
    text("VIOLATIONS\n"+this.violations+" / 5 MAX",this.x - width/6 - this.margin,this.y - this.margin*2);
    fill(255);
    text("GLOBAL RANK\n@ "+this.rank+" @",this.x - width/6 - this.margin,this.y + this.margin*2);
    textAlign(LEFT,CENTER);
    let riskLevel = "LOW";
    if (this.risk === 0){
      fill(GREEN);
      riskLevel = "LOW";
    }else if (this.risk === 1){
      fill(ORANGE);
      riskLevel = "MEDIUM";
    }else if (this.risk === 2){
      fill(RED);
      riskLevel = "HIGH";
    }
    text("RISK LEVEL\n< "+riskLevel+" >",this.x + width/6 + this.margin,this.y - this.margin*2);
    fill(YELLOW);
    text("VIDEO VALUE\n- "+this.value+" -",this.x + width/6 + this.margin,this.y + this.margin*2);
    pop();
  }
}
