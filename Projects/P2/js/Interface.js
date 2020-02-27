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

  setRisk(id){
    this.risk = id;
  }

  setValue(value){
    this.value = value;
  }

  addViolation(){
    this.violations += 1;
  }

  setRank(rank){
    if (rank <= 0){
      this.rank = 1
    }else if (rank < 1000 && rank > 0){
      this.rank = rank;
    }else if (rank >= 1000 && rank <= 9999){
      let temp = rank.toString()[0];
      this.rank = temp+"K";
    }else if (rank >= 10000 && rank <= 99999){
      let temp = rank.toString().substring(0, 2);
      this.rank = temp+"K";
    }else if (rank >= 100000 && rank <= 999999){
      let temp = rank.toString().substring(0, 3);
      this.rank = temp+"K";
    }else if (rank >= 1000000 && rank <= 9999999){
      let temp = rank.toString()[0];
      this.rank = temp+"M";
    }else if (rank >= 10000000){
      let temp = rank.toString().substring(0, 2);
      this.rank = temp+"M";
    }
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
    text("VIOLATIONS\n"+this.violations+" / 3 MAX",this.x - width/6 - this.margin,this.y - this.margin*2);
    fill(255);
    text("USER RANK\n@ "+this.rank+" @",this.x - width/6 - this.margin,this.y + this.margin*2);
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
