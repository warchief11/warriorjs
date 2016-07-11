class Player {
  
  constructor(){
    this._health = 20;
    this._rested = false;
    //debugger
  }
  playTurn(warrior) {
    
    // Cool code goes here
    var space = warrior.feel();
    warrior.look('forward')
    // console.log(warrior.health());
    // console.log(this._health);
    var damageTakenLastTurn  = this.damageTaken(warrior)
  
    this._rested = false;

    if(this.canDie(warrior)){
      warrior.walk('backward');
    }
    if(warrior.feel('backward').isCaptive()){
      warrior.rescue('backward');
    }
    if(space.isWall()){
      warrior.pivot();
    }
    if(space.isEmpty())
    {
       if(damageTakenLastTurn > 0){
         if(warrior.health() < 10){
           warrior.walk('backward');
         }
         else{
           warrior.walk();
         }
       }
       else
       {
         if(warrior.health() < 15){
           this.restWarrior(warrior);
         }
         else{
           warrior.walk();
         }
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

  restWarrior(warrior){
    this._rested = true;
    warrior.rest();

  }
  canDie(warrior){
    if (this.damageTaken(warrior) >= warrior.health){
      return true;
    }
    return false;
  }
    
  damageTaken(warrior){
    if(this._rested === true){
      return this._health - warrior.health() + 2;
    }
    else{
      return this._health - warrior.health();
    }
  
    }
}
