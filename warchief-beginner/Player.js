class Player {
  
  constructor(){
    this._health = 20;
  }
  playTurn(warrior) {
    
    // Cool code goes here
    var space = warrior.feel();
    console.log(warrior.health());
    console.log(this._health);
    if(space.isEmpty())
    {
       if(warrior.health() < 13 && this.isTakingDamage(warrior) === false)
       {
         warrior.rest();
       }
       else
       {
         warrior.walk();
       }
    }
    else{
        if(space.isCaptive()){
          warrior.rescue()
        }
        else if(space.isEnemy()){
         warrior.attack();
        }
    }
    this._health = warrior.health();
  }
  
isTakingDamage(warrior){
    if(warrior.health() < this._health){
      return true;
    }
    return false;
  }
}
