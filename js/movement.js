let direction = 'right';
let xParticle;
let yParticle;
let manaScore1 = document.querySelector('.mana-text');
let coins = document.querySelector('.stats');
let invEx;
let switcher = false;

function removeHealth(){
    if(switcher == true){
        return;
    }
    
    invEx = JSON.parse(window.localStorage.getItem('player-inventory'));
    snakeBody[snakeBody.length-1].classList.remove('snakeBody');
    if(invEx != null){
        for(let i = 0; i < invEx.length;i++){
            if(invEx[i].id == '#1'){
                if(snake.mana >= 10){
                    snake.mana -= 10;
                    manaScore1.innerHTML = snake.maxMana;


                    let canvas = document.querySelector('.particle-field');
                    let ctx = canvas.getContext('2d');


                        xParticle = snakeBody[0].getBoundingClientRect().x;
                        yParticle = snakeBody[0].getBoundingClientRect().y;

                        class Ball {
                            constructor(x, y, vx, vy, radius){
                                this.x = x;
                                this.y = y;
                                this.vx = vx;
                                this.vy = vy;
                                this.radius =  radius;
                                this.color = 'rgba(0, 225, 255, 0.734)';
                            }

                            draw() {
                                ctx.beginPath();
                                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
                                ctx.closePath();
                                ctx.fillStyle = this.color;
                                ctx.fill();
                            }
                        }
                        let ball = []
                    function raf() {
                        ball.push(new Ball(xParticle, yParticle, Math.round(Math.random()*(5-(-5))+(-5)), Math.round(Math.random()*(5-(-5))+(-5)), Math.round(Math.random()*(5-2)+2)))
                        ctx.clearRect(0,0, canvas.width, canvas.height);
                        if(ball.length > 10){
                            ball.pop();
                        }
                        ball.forEach(p=>{                            
                                if(p.x < 385 || p.y < 175){
                                    ctx.clearRect(0,0, canvas.width, canvas.height);
                                    return;
                                }
                                p.draw();
                                p.x += p.vx;
                                p.y += p.vy;
                        })
                        window.requestAnimationFrame(raf)
                    }
                    window.requestAnimationFrame(raf);

                    switcher = true;
                    setTimeout(function(e){
                        switcher = false;
                    },1000)
                    return;
                }
            }
        }
    }
    if(snakeBody[snakeBody.length-1].classList.contains('snakeHead')){
        clearInterval(interval);

        let restart = document.createElement('div');

        restart.classList.add('restart__menu');
        document.body.appendChild(restart);

        let restartButton = document.createElement('div');
        let returnButton = document.createElement('div');

        restartButton.classList.add('restart__button');
        returnButton.classList.add('restart-return__button');

        restartButton.innerHTML = 'restart';
        returnButton.innerHTML = 'main menu';
        
        restartButton.onclick = function(){
            document.location.reload();
        }
        returnButton.onclick = function(){
            window.open('main_menu.html', '_self');
        }


        restart.appendChild(restartButton);
        restart.appendChild(returnButton);



        window.localStorage.setItem('boss-counter', JSON.stringify(0));
        clearEnemies();
        restartSnake();
        return;
    }
    snake.hp--;
    snakeBody[snakeBody.length-1].innerHTML = ''
    snakeBody.pop();

    switcher = true;
    setTimeout(function(e){
        switcher = false;
    },1000)
}

function wall(){
    let chance;
    for(let i = 0; i < excel.length; i++){
        if(parseInt(excel[i].getAttribute('posX')) == (parseInt(snakeBody[0].getAttribute('posX')) + 1) && parseInt(excel[i].getAttribute('posY')) == parseInt(snakeBody[0].getAttribute('posY'))){
            if(direction == 'right'){
                if(excel[i].classList.contains('wall')){
                    chance = Math.round(Math.random() * (2 - 1) + 1);
                    switch(chance){
                        case 1:
                            for(let j = 0; j < excel.length; j++){
                                if(parseInt(excel[j].getAttribute('posY')) == (parseInt(snakeBody[0].getAttribute('posY')) - 1) && parseInt(excel[j].getAttribute('posX')) == parseInt(snakeBody[0].getAttribute('posX'))){
                                    if(excel[j].classList.contains('wall')){
                                        direction = 'up';
                                        return;
                                    }
                                }
                            }
                            direction = 'down';
                        break;
                        case 2:
                            for(let j = 0; j < excel.length; j++){
                                if(parseInt(excel[j].getAttribute('posY')) == (parseInt(snakeBody[0].getAttribute('posY')) + 1) && parseInt(excel[j].getAttribute('posX')) == parseInt(snakeBody[0].getAttribute('posX'))){
                                    if(excel[j].classList.contains('wall')){
                                        direction = 'down';
                                        return;
                                    }
                                }
                            }
                            direction = 'up';
                        break;
                    }
                }
            }
        }
        if(parseInt(excel[i].getAttribute('posX')) == (parseInt(snakeBody[0].getAttribute('posX')) - 1) && parseInt(excel[i].getAttribute('posY')) == parseInt(snakeBody[0].getAttribute('posY'))){
            if(direction == 'left'){
                if(excel[i].classList.contains('wall')){
                    chance = Math.round(Math.random() * (2 - 1) + 1);
                    switch(chance){
                        case 1:
                            for(let j = 0; j < excel.length; j++){
                                if(parseInt(excel[j].getAttribute('posY')) == (parseInt(snakeBody[0].getAttribute('posY')) - 1) && parseInt(excel[j].getAttribute('posX')) == parseInt(snakeBody[0].getAttribute('posX'))){
                                    if(excel[j].classList.contains('wall')){
                                        direction = 'up';
                                        return;
                                    }
                                }
                            }
                            direction = 'down';
                        break;
                        case 2:
                            for(let j = 0; j < excel.length; j++){
                                if(parseInt(excel[j].getAttribute('posY')) == (parseInt(snakeBody[0].getAttribute('posY')) + 1) && parseInt(excel[j].getAttribute('posX')) == parseInt(snakeBody[0].getAttribute('posX'))){
                                    if(excel[j].classList.contains('wall')){
                                        direction = 'down';
                                        return;
                                    }
                                }
                            }
                            direction = 'up';
                        break;
                    }
                }
            }
        }
        if(parseInt(excel[i].getAttribute('posY')) == (parseInt(snakeBody[0].getAttribute('posY')) + 1) && parseInt(excel[i].getAttribute('posX')) == parseInt(snakeBody[0].getAttribute('posX'))){
            if(direction == 'up'){
                if(excel[i].classList.contains('wall')){
                    chance = Math.round(Math.random() * (2 - 1) + 1);
                    switch(chance){
                        case 1:
                            for(let j = 0; j < excel.length; j++){
                                if(parseInt(excel[j].getAttribute('posX')) == (parseInt(snakeBody[0].getAttribute('posX')) + 1) && parseInt(excel[j].getAttribute('posY')) == parseInt(snakeBody[0].getAttribute('posY'))){
                                    if(excel[j].classList.contains('wall')){
                                        direction = 'left';
                                        return;
                                    }
                                }
                            }
                            direction = 'right';
                        break;
                        case 2:
                            for(let j = 0; j < excel.length; j++){
                                if(parseInt(excel[j].getAttribute('posX')) == (parseInt(snakeBody[0].getAttribute('posX')) - 1) && parseInt(excel[j].getAttribute('posY')) == parseInt(snakeBody[0].getAttribute('posY'))){
                                    if(excel[j].classList.contains('wall')){
                                        direction = 'right';
                                        return;
                                    }
                                }
                            }
                            direction = 'left';
                        break;
                    }
                }
            }
        }
        if(parseInt(excel[i].getAttribute('posY')) == (parseInt(snakeBody[0].getAttribute('posY')) - 1) && parseInt(excel[i].getAttribute('posX')) == parseInt(snakeBody[0].getAttribute('posX'))){
            if(direction == 'down'){
                if(excel[i].classList.contains('wall')){
                    chance = Math.round(Math.random() * (2 - 1) + 1);
                    switch(chance){
                        case 1:
                            for(let j = 0; j < excel.length; j++){
                                if(parseInt(excel[j].getAttribute('posX')) == (parseInt(snakeBody[0].getAttribute('posX')) + 1) && parseInt(excel[j].getAttribute('posY')) == parseInt(snakeBody[0].getAttribute('posY'))){
                                    if(excel[j].classList.contains('wall')){
                                        direction = 'left';
                                        return;
                                    }
                                }
                            }
                            direction = 'right';
                        break;
                        case 2:
                            for(let j = 0; j < excel.length; j++){
                                if(parseInt(excel[j].getAttribute('posX')) == (parseInt(snakeBody[0].getAttribute('posX')) - 1) && parseInt(excel[j].getAttribute('posY')) == parseInt(snakeBody[0].getAttribute('posY'))){
                                    if(excel[j].classList.contains('wall')){
                                        direction = 'right';
                                        return;
                                    }
                                }
                            }
                            direction = 'left';
                        break;
                    }
                }
            }
        }
    }
}

let steps = false;

function move(){
    wall();
    manaScore1.innerHTML = snake.mana;
    if(snake.mana == 0){
        manaScore1.style.visibility = 'hidden';
    } else{
        manaScore1.style.visibility = 'visible';
    }
    if(snake.coins == 0){
        coins.style.visibility = 'hidden';
    } else{
        coins.style.visibility = 'visible';
    }
    if(enemyArtifact.kills < enemyArtifact.neededKills){
        if(JSON.parse(window.localStorage.getItem('player-inventory')) == null){
            window.localStorage.setItem('player-inventory', null);
        }
    }
    if(snakeBody[0].classList.contains('portal')){
        window.open('shop.html', '_self');
    }
    let encountManaProgress = (snake.mana / snake.maxMana) * 100;
    setProgress(encountManaProgress);
    
    let snakeCoordinates = [snakeBody[0].getAttribute('posX'),snakeBody[0].getAttribute('posY')];
    snakeBody[0].classList.remove('snakeHead');
    snakeBody[0].innerHTML = '<img src = "./images/snakeBody.png" class = "gmi">';
    snakeBody[snakeBody.length-1].classList.remove('snakeBody');
    snakeBody[snakeBody.length-1].innerHTML = '';
    snakeBody[snakeBody.length-1].style.rotate = ''
    snakeBody.pop();

    if (direction == 'right') {  
        if(snakeCoordinates[0] < 29) {
            snakeBody.unshift(document.querySelector('[posX = "' + (+snakeCoordinates[0] + 1) + '"][posY = "' + snakeCoordinates[1] + '"]'));
        } else {
            if(bosschecker != null){
                console.log('ok')
                if(bosschecker.difficulty == 'boss'){
                    snakeBody.unshift(document.querySelector('[posX = "' + snakeCoordinates[0] + '"][posY = "' + (+snakeCoordinates[1]) + '"]'));
                }
                else{
                    snakeBody.unshift(document.querySelector('[posX = "1"][posY = "' + snakeCoordinates[1] + '"]'));
                }
            }
            else{
                snakeBody.unshift(document.querySelector('[posX = "1"][posY = "' + snakeCoordinates[1] + '"]'));
            }
        }
    } else if (direction == 'left') { 
        if(snakeCoordinates[0] > 1) {
            snakeBody.unshift(document.querySelector('[posX = "' + (+snakeCoordinates[0] - 1) + '"][posY = "' + snakeCoordinates[1] + '"]'));
        } else {
            if(bosschecker != null){
                if(bosschecker.difficulty == 'boss'){
                    snakeBody.unshift(document.querySelector('[posX = "' + snakeCoordinates[0] + '"][posY = "' + (+snakeCoordinates[1]) + '"]'));
                }
                else{
                    snakeBody.unshift(document.querySelector('[posX = "29"][posY = "' + snakeCoordinates[1] + '"]')); 
                }
            }
            else{
            snakeBody.unshift(document.querySelector('[posX = "29"][posY = "' + snakeCoordinates[1] + '"]')); 
            }
        }
    } else if (direction == 'up') {
        if(snakeCoordinates[1] < 16) {
            snakeBody.unshift(document.querySelector('[posX = "' + snakeCoordinates[0] + '"][posY = "' + (+snakeCoordinates[1]+1) + '"]')); 
        } else {
            if(bosschecker != null){
                if(bosschecker.difficulty == 'boss'){
                    snakeBody.unshift(document.querySelector('[posX = "' + snakeCoordinates[0] + '"][posY = "' + (+snakeCoordinates[1]) + '"]'));
                }
                else{
                    snakeBody.unshift(document.querySelector('[posX = "' + snakeCoordinates[0] + '"][posY = "1"]'));
                } 
            }
            else{
            snakeBody.unshift(document.querySelector('[posX = "' + snakeCoordinates[0] + '"][posY = "1"]'));
            } 
        }
    } else if (direction == 'down') {  
        if(snakeCoordinates[1] > 1) {
            snakeBody.unshift(document.querySelector('[posX = "' + snakeCoordinates[0] + '"][posY = "' + (+snakeCoordinates[1]-1) + '"]'));
        } else {
            if(bosschecker != null){
                if(bosschecker.difficulty == 'boss'){
                    snakeBody.unshift(document.querySelector('[posX = "' + snakeCoordinates[0] + '"][posY = "' + (+snakeCoordinates[1]) + '"]'));
                }
                else{
                    snakeBody.unshift(document.querySelector('[posX = "' + snakeCoordinates[0] + '"][posY = "16"]'));
                }  
            }else{
            snakeBody.unshift(document.querySelector('[posX = "' + snakeCoordinates[0] + '"][posY = "16"]'));
            }
        }
    }

    snakeBody[0].classList.add('snakeHead');
    snakeBody[0].innerHTML = '<img src = "./images/snakeHead.png" class = "img">'

    if(direction == 'up'){
        snakeBody[0].style.rotate = "0deg";
    }
    else if(direction == 'down'){
        snakeBody[0].style.rotate = "-180deg";
    }
    else if(direction == 'right'){
        snakeBody[0].style.rotate = "+90deg";
    }
    else if(direction == 'left'){
        snakeBody[0].style.rotate = "-90deg";
    }

    for(let i = 0; i<snakeBody.length; i++){
        snakeBody[i].classList.add('snakeBody');
    }

//
    let enemiesScore = document.querySelector('.enemies-text');
    if(bosschecker != null){
        if(bosschecker.difficulty == 'boss'){
            floor.enemies = 1;
        }
    }
    enemiesScore.innerHTML = floor.enemies;

    killcheck(snakeBody[0]);

    steps = true;
// 


}
let interval;
let intervalchecker = false;

window.addEventListener('keydown', function(e){
    if(intervalchecker == false){
        let speed = snake.speed+snake.speedmultiplier;
        intervalchecker = true;
        createLevel();
        interval = setInterval(move, speed);
    }
    if(steps == true){
        if(e.keyCode == 37 && direction!='right'){
            direction = 'left';
            steps = false;
        }
        else if(e.keyCode == 38 && direction!='down'){
            direction = 'up';
            steps = false;
        }
        else if(e.keyCode == 39 && direction!='left'){
            direction = 'right'
            steps = false;
        }
        else if(e.keyCode == 40 && direction!='up'){
            direction = 'down';
            steps = false;
        }
    }
});