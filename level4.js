jsWarrior.turn = function(warrior) {
  if (warrior.getHealth() < 20 && warrior.health <= warrior.getHealth())
  {
    warrior.rest();
  }
  else {
    jsWarrior.check(warrior);
  }
  warrior.health = warrior.getHealth();
}

jsWarrior.check = function(warrior) {
  switch (warrior.check())
  {
    case "enemy":
      warrior.attack();
      break;
    default:
      warrior.walk();
  }
}