class Player {
  
  constructor(){
    this._health = 20;
  }
  
  playTurn(warrior) {
    // Cool code goes here
    let directionOfStairs = warrior.directionOfStairs();
    let feel = warrior.feel(directionOfStairs)
    
    //console.log(feel());
    //console.log(feel());
    console.log(warrior.feel('forward').toString());
    //console.log(warrior.feel('forward', 'right')());
    
   
    console.log(directionOfStairs);
    warrior.walk(directionOfStairs);
  }
  
  isTakingDamage(warrior){
    if(warrior.health() < this._health){
      return true;
    }
    return false;
  }
  
  feelEveryDirection(warrior){
    let feelEveryDirection = [warrior.feel('forward'), warrior.feel('backward'),warrior.feel('right'),warrior.feel('left')]
    console.log("feelEveryDirection: " + feelEveryDirection)
    return feelEveryDirection;
  }
}
