class Item{
  constructor(name,id,singleUse,texture){
    this.name = name;
    this.id = id;
    this.singleUse = singleUse;
    this.texture = texture;

    this.using = false;
  }

  use(){
    this.using = true;
  }

  drop(){
    this.using = false;
  }
}
