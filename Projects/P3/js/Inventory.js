class Inventory{
  constructor(){
    this.margin = 24;
    // dimension
    this.width = width - width/4;
    this.height = height/8;
    // position
    this.x = width/2;
    this.y = this.height/2 + this.margin;

    this.items = [];
  }

  addItem(item){
    this.items.push(item);
  }

  useItem(index){
    this.items[index].use();
  }

  removeItem(index){
    this.items.splice(index,1);
  }

  display(){
    push();
    fill(0,150);
    rect(this.x,this.y,this.width,this.height);
    pop();
  }
}
