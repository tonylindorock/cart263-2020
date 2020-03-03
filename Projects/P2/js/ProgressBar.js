// ProgressBar
//
// An object used to display an a progress bar
class ProgressBar {
  constructor(x, y, color) {
    this.color = color;

    this.progress = 0; // 0 - 100
    // size
    this.height = height / 24;
    this.width = width / 4;
    // position
    this.x = x - width / 8;
    this.y = y - height / 48;

    this.progressWidth = this.progress; // the width of progress rect

    this.start = false;
    this.done = false;
  }

  // display
  //
  // display the progress bar and handle the animation
  display() {
    push();
    // if the progress is not done
    if (!this.done) {
      rectMode(CORNER);
      fill(0);
      rect(this.x, this.y, this.width, this.height);
      fill(this.color);
      // map the progress to the width
      this.progressWidth = map(this.progress, 0, 100, 0, this.width);
      rect(this.x, this.y, this.progressWidth, this.height); // inner rect
      // if starting, progress!
      if (this.start) {
        this.progress += 1;
      }
      // if reaches 100, it is done
      if (this.progress >= 100) {
        this.done = true;
        this.start = false;
      }
    }
    pop();
  }

  // reset
  //
  // reset the progress bar
  reset() {
    this.progress = 0;
    this.progressWidth = this.progress;
    this.start = false;
    this.done = false;
  }
}
