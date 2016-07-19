class Player {
  
  constructor(){
    this._health = 20;
    this._rested = false;
    //debugger
  }
  playTurn(warrior) {
    
    // console.log(this._health);
    var damageTakenLastTurn  = this.damageTaken(warrior)
  
    this._rested = false;

    //ensure that warrior won't die in next turn on this space
    if(this.canDie(warrior)){
      warrior.walk('backward');
    }
    
    //warrior will live to play next turn. Attack if any enemy in range
    else if(this.isEnemyInRange(warrior)){
      this.attackEnemy(warrior);  
    }
    
    //No enemy to attack, check if warrior is in critical health
    else if(warrior.health() < 8){
      warrior.rest();
    }
    
    //warrior is fine, without taking damage, check for any captive.
    else if(this.isCaptiveInRange(warrior)){
       
        this.tryRescueCaptive(warrior);
    }
    else{
      this.tryWalk();
    }
    
    
    // if(warrior.feel('backward').isCaptive()){
    //   warrior.rescue('backward');
    // }
    // if(space.isWall()){
    //   warrior.pivot();
    // }
    // if(space.isEmpty())
    // {
    //    if(damageTakenLastTurn > 0){
    //      if(warrior.health() < 10){
    //        warrior.walk('backward');
    //      }
    //      else{
    //        warrior.walk();
    //      }
    //    }
    //    else
    //    {
    //      if(warrior.health() < 15){
    //        this.restWarrior(warrior);
    //      }
    //      else{
    //        warrior.walk();
    //      }
    //    }
    // }
    // else{
    //     if(space.isCaptive()){
    //       warrior.rescue()
    //     }
    //     else if(space.isEnemy()){
    //      warrior.attack();
    //     }
    // }
    //take note of warrior's health
    this._health = warrior.health();
  }

  restWarrior(warrior){
    this._rested = true;
    warrior.rest();

  }
  
  attackEnemy(warrior){
    //check enemy in front attack for melee attack
    if(warrior.feel('forward').isEnemy()) warrior.attack();
    if(warrior.feel('backward').isEnemy()) warrior.pivot(); //pivot this turn to attack in next.
    if(this.isEnemyInSight(warrior, 'forward')) warrior.shoot();
    if(this.isEnemyInSight(warrior, 'backward')) warrior.pivot();
  }
  canDie(warrior){
    if (this.damageTaken(warrior) >= warrior.health && this.isEnemyInRange(warrior) ){
      return true;
    }
    return false;
  }
  
  isEnemyInRange(warrior){
    return this.isEnemyInSight(warrior, 'forward') || this.isEnemyInSight(warrior, 'backward');
  }
  
  isEnemyInSight(warrior, direction){
    var unit = warrior.look(direction).find(space => !space.isEmpty());
    return unit && unit.isEnemy();
  }
  
  isCaptiveInRange(warrior){
    return this.isCaptiveInSight(warrior, 'forward') || this.isCaptiveInSight(warrior, 'backward');
  }
  
  isCaptiveInSight(warrior, direction){
    var unit = warrior.look(direction).find(space => !space.isEmpty());
    return unit && unit.isCaptive();
  }
  
  tryRescueCaptive(warrior){
    if(warrior.feel().isCaptive()){
          warrior.rescue();
        }
    if(warrior.feel('backward').isCaptive()){
      warrior.rescue('backward');
    }
    if(isCaptiveInSight(warrior, 'forward')){
      this.tryWalk();
    }
    if(isCaptiveInSight(warrior, 'backward')){
      warrior.pivot();
    }
  }
  
  tryWalk(warrior){
    if(warrior.feel().isWall()){
       warrior.pivot();
    }
    else
    {
      warrior.walk();
    }
  }
    
  getClosestEnemy(warrior){
    if(warrior.feel('forward').isEnemy())   return 'forward'
    if(warrior.feel('backward').isEnemy())   return 'backward'
    var unit = warrior.look().find(space => !space.isEmpty());
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
