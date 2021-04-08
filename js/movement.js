let direction = 'right';
let xParticle;
let yParticle;
let manaScore1 = document.querySelector('.mana-text');
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
                    manaScore1.innerHTML = "Mana: " + snake.mana + "/"+snake.maxMana;


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
                        ball.push(new Ball(xParticle, yParticle, Math.round(Math.random()*(10-(-10))+(-10)), Math.round(Math.random()*(10-(-10))+(-10)), Math.round(Math.random()*(5-2)+2)))
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
        createMessage('Game Over');
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

let steps = false;

function move(){
    manaScore1.innerHTML = "Mana: " + snake.mana + "/"+snake.maxMana;
    if(enemyArtifact.kills < enemyArtifact.neededKills){
        window.localStorage.setItem('player-inventory', null);
    }
    if(snakeBody[0].classList.contains('portal')){
        window.open('shop.html', '_self');
    }
    
    let snakeCoordinates = [snakeBody[0].getAttribute('posX'),snakeBody[0].getAttribute('posY')];
    snakeBody[0].classList.remove('snakeHead');
    snakeBody[0].innerHTML = '<img src = "/images/snakeBody.png" class = "gmi">';
    snakeBody[snakeBody.length-1].classList.remove('snakeBody');
    snakeBody[snakeBody.length-1].innerHTML = '';
    snakeBody.pop();

    if (direction == 'right') {  
        if(snakeCoordinates[0] < 29) {
            snakeBody.unshift(document.querySelector('[posX = "' + (+snakeCoordinates[0] + 1) + '"][posY = "' + snakeCoordinates[1] + '"]'));
        } else {
            snakeBody.unshift(document.querySelector('[posX = "1"][posY = "' + snakeCoordinates[1] + '"]'));
        }
    } else if (direction == 'left') { 
        if(snakeCoordinates[0] > 1) {
            snakeBody.unshift(document.querySelector('[posX = "' + (+snakeCoordinates[0] - 1) + '"][posY = "' + snakeCoordinates[1] + '"]'));
        } else {
            snakeBody.unshift(document.querySelector('[posX = "29"][posY = "' + snakeCoordinates[1] + '"]')); 
        }
    } else if (direction == 'up') {
        if(snakeCoordinates[1] < 16) {
            snakeBody.unshift(document.querySelector('[posX = "' + snakeCoordinates[0] + '"][posY = "' + (+snakeCoordinates[1]+1) + '"]')); 
        } else {
            snakeBody.unshift(document.querySelector('[posX = "' + snakeCoordinates[0] + '"][posY = "1"]')); 
        }
    } else if (direction == 'down') {  
        if(snakeCoordinates[1] > 1) {
            snakeBody.unshift(document.querySelector('[posX = "' + snakeCoordinates[0] + '"][posY = "' + (+snakeCoordinates[1]-1) + '"]'));
        } else {
            snakeBody.unshift(document.querySelector('[posX = "' + snakeCoordinates[0] + '"][posY = "16"]'));
        }
    }

    snakeBody[0].classList.add('snakeHead');
    snakeBody[0].innerHTML = '<img src = "/images/snakeHead.png" class = "img">'

    if(direction == 'up'){
        document.querySelector('.snakeHead').style.rotate = "0deg";
    }
    else if(direction == 'down'){
        document.querySelector('.snakeHead').style.rotate = "-180deg";
    }
    else if(direction == 'right'){
        document.querySelector('.snakeHead').style.rotate = "+90deg";
    }
    else if(direction == 'left'){
        document.querySelector('.snakeHead').style.rotate = "-90deg";
    }

    for(let i = 0; i<snakeBody.length; i++){
        snakeBody[i].classList.add('snakeBody');
    }

//
    let enemiesScore = document.querySelector('.enemies-text');
    enemiesScore.innerHTML = "Enemies left: "+floor.enemies;

    killcheck(snakeBody[0]);

    steps = true;
// 

}
let speed = snake.speed+snake.speedmultiplier;
console.log(speed);
let interval = setInterval(move, speed);

window.addEventListener('keydown', function(e){
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