let lvl1 = document.querySelector('.map-excell1');
let lvl2 = document.querySelector('.map-excell2');
let lvl3 = document.querySelector('.map-excell3');
let lvl4 = document.querySelector('.map-excell4');
let bossCounter = JSON.parse(window.localStorage.getItem('boss-counter'));
if(bossCounter == null){
    bossCounter = 0;
}
let lvls = [lvl1, lvl2, lvl3, lvl4];
let params = [];
let mapDeskField = document.querySelector('.map-description');

function setParameters(){
    for(let i = 0; i < lvls.length; i++){
        let difficulty;

        let climberChance;
        let enemyChance;
        let walkerChance;

        let bossChanceNumber = 16 - bossCounter;

        let bossChance = Math.round(Math.random() * (bossChanceNumber - 0) + 0);

        difficulty = Math.round(Math.random() * (3 - 1) + 1);

        if(bossChance == bossChanceNumber){
            difficulty = 4;
        }

        switch(difficulty){
            case 1:
                difficulty = 'easy';
                climberChance = Math.round(Math.random() * (2 - 1) + 1);
                walkerChance = Math.round(Math.random() * (3 - 1) + 1);
                enemyChance = 1;
            break;
            case 2:
                difficulty = 'medium';
                climberChance = Math.round(Math.random() * (3 - 2) + 2);
                walkerChance = Math.round(Math.random() * (4 - 2) + 2);
                enemyChance = Math.round(Math.random() * (2 - 1) + 1);
            break;
            case 3:
                difficulty = 'hard';
                climberChance = Math.round(Math.random() * (3 - 2) + 2);
                walkerChance = Math.round(Math.random() * (4 - 3) + 3);
                enemyChance = Math.round(Math.random() * (3 - 2) + 2);
            break;
            case 4:
                difficulty = 'boss';
                climberChance = Math.round(Math.random() * (0 - 0) + 0);
                walkerChance = Math.round(Math.random() * (0 - 0) + 0);
                enemyChance = Math.round(Math.random() * (0 - 0) + 0);
        }

        let setting = {
            difficulty: difficulty,
            climberChance: climberChance,
            enemyChance: enemyChance,
            walkerChance: walkerChance,
        }
        params[i] = setting;
    }
}
setParameters();

for(let i = 0; i < lvls.length; i++){
    if(params[i].difficulty == 'boss'){
        lvls[i].classList.remove('map-excell');
        lvls[i].classList.add('map-boss-excell');
    }
    lvls[i].addEventListener('click', function(e){
        for(let j = 0; j < lvls.length; j++){
            lvls[j].classList.remove('map-selected');
        }
        lvls[i].classList.add('map-selected');
        mapDeskField.classList.add('map-description-selected');
        mapDeskField.innerHTML = `<p class = "map-heading">
        difficulty: ${params[i].difficulty}</p><p class = "map-description-text">
        walkers: ${params[i].walkerChance},
        climbers: ${params[i].climberChance},
        spitters: ${params[i].enemyChance}</p>`;

        let continuelvl = document.createElement('continue');
        document.body.appendChild(continuelvl);
        continuelvl.classList.add('continue');

        continuelvl.innerHTML = 'Continue';

        continuelvl.addEventListener('click', function(e){
            bossCounter++;
            window.localStorage.setItem('level-description', JSON.stringify(params[i]));
            window.localStorage.setItem('player-info', JSON.stringify(snake));
            window.localStorage.setItem('boss-counter', JSON.stringify(bossCounter));
            window.open('index.html', '_self');
        });
    });
}