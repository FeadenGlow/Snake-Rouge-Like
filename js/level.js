let lvlinfo = JSON.parse(window.localStorage.getItem('level-description'));

let climberChance;
let enemyChance;
let walkerChance;

if(lvlinfo == null){
    climberChance = 1;
    enemyChance = 1;
    walkerChance = 1;
}
else{
    climberChance = lvlinfo.climberChance;
    enemyChance = lvlinfo.enemyChance;
    walkerChance = lvlinfo.walkerChance;
}
let walker = [];
let enemy = [];
let climber = [];


for(let i = 0; i < enemyChance; i++){
    enemy[i] = new Enemy;
}

for(let i = 0; i < climberChance;i++){
    climber[i] = new Climber;
}
for(let i = 0; i < walkerChance;i++){
    walker[i] = new Walker;
}
