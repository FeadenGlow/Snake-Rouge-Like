
let field = document.createElement('div');

let messageField = document.createElement('div');
messageField.classList.add('message-field');

let inventoryExchange = [{
    type: '',
    img: '',
    name: '',
}]

let enemyArtifact = {
    kills: 0,
    neededKills: 10,
}

let skills = [{
    img: 'skills/splash.png',
    name: 'Splash',
    id: '#1',
    rarity: 'default',
    description: 'Converts mana into wandering souls that kills everyone on their way',
    manaCost: '2 mana for each shoot',
    damage: 5,
}]

let floor = {
    biome: 'DarkDungeon',
    enemies: 10,
}

let bosschecker = JSON.parse(window.localStorage.getItem('level-description'));
if(bosschecker != null){
    if(bosschecker.difficulty == 'boss'){
        let bossname;
        switch(floor.biome){
            case 'DarkDungeon':
                bossname = 'Quest Master';
        }
        window.localStorage.setItem('boss-name', JSON.stringify(bossname));
        import("./boss.js");
    }
}
if(JSON.parse(window.localStorage.getItem('player-info')) == null){
    let selectedSkill = '#1';
    window.localStorage.setItem('selected-skill', JSON.stringify(selectedSkill));
}

window.localStorage.setItem('player-skills', JSON.stringify(skills));
createMessage('Press any key to start');


let snake = JSON.parse(window.localStorage.getItem('player-info'));
if(snake == null){
    snake = {

    spawnRange: 29,
    mana: 0,
    maxMana: 10,
    maxManamultiplier: 0,

    hp: 3,

    coinschecker: false,
    coinsmultiplier: 0,
    
    speed: 200,
    speedmultiplier: 0,

    lvl: 0,
    lvlNum: 0,
    maxLvlScore: 10,

    skillpoints:0,

    coins: 0,
    }
}
console
snake.maxMana += snake.maxManamultiplier;

document.body.appendChild(field);
field.classList.add('field');

function createMessage(message){
    let messageField = document.createElement('div');
    messageField.classList.add('message-field');

    let messageText = document.createElement('p');
    messageField.appendChild(messageText);
    messageText.classList.add('message-text');
    messageText.innerHTML = message;
    document.body.appendChild(messageField)
    setTimeout(function(e){
        document.body.removeChild(messageField);
    },5000)
}

for(let i=1; i < 465; i++){
    let excel = document.createElement('div');
    field.appendChild(excel);
    excel.classList.add('excel');
}

let excel = document.getElementsByClassName('excel');
let x = 1,
    y = 16;

for(let i = 0; i<excel.length; i++){
    if(x>29){
        x = 1;
        y--;
    }
    excel[i].setAttribute('posX', x)
    excel[i].setAttribute('posY', y)
    x++;
}

function generateSnake() {
    if(bosschecker != null){
        if(bosschecker.difficulty == 'boss'){
            snake.spawnRange = 5;
        }
    }else{
        snake.spawnRange = 29;
    }
    let posX = Math.round(Math.random() * (snake.spawnRange - 3) + 3);
    let posY = Math.round(Math.random() * (16 - 1) + 1);
    return[posX, posY];
}

let coordinates = generateSnake();
let snakeBody = [document.querySelector('[posX = "' + coordinates[0] + '"][posY = "' + coordinates[1] + '"]'),
                 document.querySelector('[posX = "' + (coordinates[0]-1) + '"][posY = "' + coordinates[1]),
                 document.querySelector('[posX = "' + (coordinates[0]-2) + '"][posY = "' + coordinates[1])];
if(snake.hp < 3){
    for(let i = 0; i < 3 - snake.hp; i++){
        snakeBody.pop();
    }
}
for(let i = 0; i < snakeBody.length; i++){
    snakeBody[i].classList.add('snakeBody');
    snakeBody[i].innerHTML = '<img src = "./images/snakeBody.png" class = "gmi">'//
}
snakeBody[0].classList.add('snakeHead');
snakeBody[0].innerHTML = '<img src = "./images/snakeHead.png" class = "img">'//
let fruit;
function createFruit(){
    function generateFruit() {
        let fruitPosX = Math.round(Math.random() * (29 - 1) + 1);
        let fruitPosY = Math.round(Math.random() * (16 - 1) + 1);
        return[fruitPosX, fruitPosY];
    }
    fruitcoords = generateFruit();
    fruit = document.querySelector('[posX = "'+fruitcoords[0]+'"][posY = "'+fruitcoords[1]+'"]');

    while(fruit.classList.contains('snakeBody') || fruit.classList.contains('enemy')){
        fruitcoords = generateFruit();
        fruit  = document.querySelector('[posX = "'+fruitcoords[0]+'"][posY = "'+fruitcoords[1]+'"]');  
    }
    fruit.classList.add('fruit');
    fruit.innerHTML = '<img src = "./images/fruit.png" class = "fruit-img">'//
}

function checker(element){
    if(element.classList.contains('enemy')){
        element.style.rotate = '0deg'
        element.innerHTML = '<img src = "./images/enemies/enemy.png" class = "enemy-img">'
    }
    else if(element.classList.contains('fruit')){
        element.innerHTML = '<img src = "./images/fruit.png" class = "fruit-img">'
    }
    else if(element.classList.contains('climber')){
        element.innerHTML = '<img src = "./images/enemies/climber.png" class = "climber-img">'
    }
    else if(element.classList.contains('walker')){
        element.innerHTML = '<img src = "./images/enemies/walker.png" class = "walker-img">'
    }
}

function killcheck(element){

    let enemiesScore = document.querySelector('.enemies-text');
    enemiesScore.innerHTML = floor.enemies;

    if(element.classList.contains('enemy')){
        enemyArtifact.kills++;
        console.log(enemyArtifact.kills)
        if(enemyArtifact.kills == enemyArtifact.neededKills){
            let counter = 0;
            createMessage('You received Mana Shield in your inventory')
            if(invEx != null){
                counter = invEx.length-1
            }
            inventoryExchange[counter].img = '/artifacts/artifact.png';
            inventoryExchange[counter].name = 'Mana Shield';
            inventoryExchange[counter].id = '#1';
            inventoryExchange[counter].type = 'artifact';
            inventoryExchange[counter].description = 'Absorbs the taken damage with mana';
            inventoryExchange[counter].manaCost = '10 for each taken damage';
            window.localStorage.setItem('player-inventory', JSON.stringify(inventoryExchange));
        }

        getReward(0.25, 1);

        if(floor.enemies <= 0){
            ending();
            return;
        }

        enemy.pop(new Enemy);
    }
    else if(element.classList.contains('fruit')){

        getReward(0.25, 1);

        element.classList.remove('fruit');
        
        if(floor.enemies <= 0){
            ending();
            return;
        }

        createFruit();
    }
}

function blastkillcheck(element){
    
    let enemiesScore = document.querySelector('.enemies-text');
    enemiesScore.innerHTML = floor.enemies;

    if(element.classList.contains('walker')){

        element.classList.remove('walker');

        getReward(0.25, 1);

        if(floor.enemies <= 0){
            ending();
            return;
        }
    }
    if(element.classList.contains('climber')){
        element.classList.remove('climber');

        getReward(0.25, 1);


        if(floor.enemies <= 0){
            ending();
            return;
        }

        climber.pop(new Climber);

    }
}


