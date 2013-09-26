jsWarrior.turn = function(warrior) {
    if(typeof(warrior.status) == "undefined"){
        warrior.status = 'start';
    }

    if(typeof(warrior.takeDiamond) == "undefined"){
        if(warrior.check() != "wall" && warrior.check('backward') != 'wall') {
            warrior.takeDiamond = 'start';
        } else if(warrior.check('backward') == 'wall') {
            warrior.takeDiamond = false;
        }
    }

    warrior.checkNeedHealth = function(){
        if( this.getHealth() < 20){
            if(this.getHealth() < this.health){
                return false
            } else {
                return true;
            }
        }
    };

    warrior.goNext = function(){
      if(this.takeDiamond === true){
        this.pivot();
        this.takeDiamond = false;
        this.status = 'wall';
      }else if(this.takeDiamond == 'start'){
            this.pivot();
        	this.takeDiamond='inprogress'
        } else if(this.status == "wall") {
            this.walk();
            this.status = 'walk';
        } else {
          
            switch(this.check()) {
                case 'enemy':
                    this.attack();
                    this.status = 'attack';
                    break;
                case 'diamond':
                    this.collect();
                    this.status = 'collect';
                    if(this.takeDiamond=='inprogress'){
                      this.takeDiamond =true;
                    }
                    break;
                case 'wall':
                    this.pivot();
                    this.status = 'wall';
                    break;
                default:
                    this.walk();
                    this.status = 'walk';
                    break;
            }
        }

    };

    if(warrior.checkNeedHealth()){
        warrior.rest();
    } else {
      
        if( warrior.getHealth() < 10){
            warrior.walk('backward')
        } else {
            warrior.goNext();
        }
    }

    warrior.health = warrior.getHealth();
}
