
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
    img: '/skills/splash.png',
    name: 'Splash',
    id: '#1',
    rarity: 'default',
    description: 'Converts mana into wandering souls that kills everyone on their way',
    manaCost: '2 mana for each shoot',
    damage: 5,
}]

let selectedSkill = '#1'; 

window.localStorage.setItem('player-skills', JSON.stringify(skills));
window.localStorage.setItem('selected-skill', JSON.stringify(selectedSkill));


let floor = {
    enemies: 10,
}

let snake = {
    mana: 0,
    maxMana: 10,

    lvl: 0,
    lvlNum: 0,
    maxLvlScore: 10,

    skillpoints:0,

    coins: 0,
}

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
    let posX = Math.round(Math.random() * (29 - 3) + 3);
    let posY = Math.round(Math.random() * (16 - 1) + 1);
    return[posX, posY];
}

let coordinates = generateSnake();
let snakeBody = [document.querySelector('[posX = "' + coordinates[0] + '"][posY = "' + coordinates[1] + '"]'),
                 document.querySelector('[posX = "' + (coordinates[0]-1) + '"][posY = "' + coordinates[1]),
                 document.querySelector('[posX = "' + (coordinates[0]-2) + '"][posY = "' + coordinates[1])];
for(let i = 0; i < snakeBody.length; i++){
    snakeBody[i].classList.add('snakeBody');
    snakeBody[i].innerHTML = '<img src = "/images/snakeBody.png" class = "gmi">'//
}
snakeBody[0].classList.add('snakeHead');
snakeBody[0].innerHTML = '<img src = "/images/snakeHead.png" class = "img">'//
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
    fruit.innerHTML = '<img src = "/images/fruit.png" class = "fruit-img">'//
}
createFruit();

function checker(element){
    if(element.classList.contains('enemy')){
        element.style.rotate = '0deg'
        element.innerHTML = '<img src = "/images/enemies/enemy.png" class = "enemy-img">'
    }
    else if(element.classList.contains('fruit')){
        element.innerHTML = '<img src = "/images/fruit.png" class = "fruit-img">'
    }
    else if(element.classList.contains('climber')){
        element.innerHTML = '<img src = "/images/enemies/climber.png" class = "climber-img">'
    }
    else if(element.classList.contains('walker')){
        element.innerHTML = '<img src = "/images/enemies/walker.png" class = "walker-img">'
    }
}

function killcheck(element){
    let manaScore = document.querySelector('.mana-text');
    let lvlScore = document.querySelector('.lvl-text');
    let coinsScore = document.querySelector('.coins-text');
    
    let enemiesScore = document.querySelector('.enemies-text');
    enemiesScore.innerHTML = "Enemies left: "+floor.enemies;

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
    
        floor.enemies--;
        let lvlScore1 = document.querySelector('.lvl-text');
        let coinsScore1 = document.querySelector('.coins-text');
        
        let enemiesScore1 = document.querySelector('.enemies-text');
        enemiesScore1.innerHTML = "Enemies left: "+floor.enemies;


        let coinsChance = Math.round(Math.random()*(2-1)+1);
        if(coinsChance == 1){
            snake.coins+=0.25
            coinsScore1.innerHTML = "Coins: "+snake.coins;
        }

        if(snake.mana>=snake.maxMana){
            snake.mana--;
        }
        snake.lvlNum+=Math.round(Math.random()*(1 - 0.5) + 0.5);
        if(snake.lvlNum >= snake.maxLvlScore){
            snake.lvl++;
            snake.skillpoints++;
            snake.maxLvlScore*=2.5;
            lvlScore1.innerHTML = "Lvl: "+snake.lvl;
        }
        snake.mana++;


        if(floor.enemies <= 0){
            ending();
            return;
        }

        enemy.pop(new Enemy);
    }
    else if(element.classList.contains('fruit')){
        floor.enemies--;
        element.classList.remove('fruit');

        let coinsChance = Math.round(Math.random()*(2-1)+1);
        if(coinsChance == 1){
            snake.coins+=0.25
            coinsScore.innerHTML = "Coins: "+snake.coins;
        }

        if(snake.mana>=snake.maxMana){
            snake.mana--;
        }
        snake.lvlNum+=Math.round(Math.random()*(1 - 0.5) + 0.5);
        if(snake.lvlNum >= snake.maxLvlScore){
            snake.lvl++;
            snake.skillpoints++;
            snake.maxLvlScore*=2.5;
            lvlScore.innerHTML = "Lvl: "+snake.lvl;
        }
        snake.mana++;
        manaScore.innerHTML = "Mana: " + snake.mana + "/"+snake.maxMana;


        if(floor.enemies <= 0){
            ending();
            return;
        }

        createFruit();
    }
}

function blastkillcheck(element){
    let manaScore = document.querySelector('.mana-text');
    let lvlScore = document.querySelector('.lvl-text');
    let coinsScore = document.querySelector('.coins-text');
    
    let enemiesScore = document.querySelector('.enemies-text');
    enemiesScore.innerHTML = "Enemies left: "+floor.enemies;

    if(element.classList.contains('walker')){
        floor.enemies--;
        element.classList.remove('walker');

        let coinsChance = Math.round(Math.random()*(2-1)+1);
        if(coinsChance == 1){
            snake.coins+=0.25
            coinsScore.innerHTML = "Coins: "+snake.coins;
        }

        if(snake.mana>=snake.maxMana){
            snake.mana--;
        }
        snake.lvlNum+=Math.round(Math.random()*(1 - 0.5) + 0.5);
        if(snake.lvlNum >= snake.maxLvlScore){
            snake.lvl++;
            snake.skillpoints++;
            snake.maxLvlScore*=2.5;
            lvlScore.innerHTML = "Lvl: "+snake.lvl;
        }
        snake.mana++;
        manaScore.innerHTML = "Mana: " + snake.mana + "/"+snake.maxMana;


        if(floor.enemies <= 0){
            ending();
            return;
        }
        floor.enemies--;
    }
    if(element.classList.contains('climber')){
        floor.enemies--;
        element.classList.remove('climber');

        let coinsChance = Math.round(Math.random()*(2-1)+1);
        if(coinsChance == 1){
            snake.coins+=0.25
            coinsScore.innerHTML = "Coins: "+snake.coins;
        }

        if(snake.mana>=snake.maxMana){
            snake.mana--;
        }
        snake.lvlNum+=Math.round(Math.random()*(1 - 0.5) + 0.5);
        if(snake.lvlNum >= snake.maxLvlScore){
            snake.lvl++;
            snake.skillpoints++;
            snake.maxLvlScore*=2.5;
            lvlScore.innerHTML = "Lvl: "+snake.lvl;
        }
        snake.mana++;
        manaScore.innerHTML = "Mana: " + snake.mana + "/"+snake.maxMana;


        if(floor.enemies <= 0){
            ending();
            return;
        }
        floor.enemies--;
        climber.pop(new Climber);

    }
}


