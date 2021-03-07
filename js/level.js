let climberChance = Math.round(Math.random() * (3 - 1) + 1);
let enemyChance = Math.round(Math.random() * (3 - 1) + 1);
let walkerChance = walkerPosY = Math.round(Math.random() * (5 - 1) + 1);

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
