let selectedSkillGet = JSON.parse(window.localStorage.getItem('selected-skill'));

let skillField = document.createElement('div');
skillField.classList.add('skill-field');

let skillImage = document.createElement('div');
let skillButton = document.createElement('div');

let skillText = document.createElement('p');

skillText.classList.add('skill-text');
skillImage.classList.add('skill-image');
skillButton.classList.add('skill-button');

document.body.appendChild(skillField)

skillField.appendChild(skillImage);
skillField.appendChild(skillButton);
skillButton.appendChild(skillText);

skillText.innerHTML = 'spacebar';

let counterBlastX = 0;
let counterBlastY = 0;

let blast = 0;
let blastDirection;

let blastX = 0;
let blastY = 0;

let switcherblast = false;
let switcherblastshoot = true;


switch(selectedSkillGet){
    case '#1':

        skillImage.innerHTML = '<img src = "./images/skills/splash.png" class = "skill-image">';

        function createBlast(){
            switcherblast = true;

            blastY = 0;
            blastX = 0;

            switch(direction){
                case 'right':
                    blastDirection = 'right';
                    counterBlastX = 2;
                    counterBlastY = 0;
                     
                    if((parseInt(snakeBody[0].getAttribute('posX'))+counterBlastX) > 30){
                        return;
                    }
                break;

                case 'down':
                    blastDirection = 'down';
                    counterBlastX = 0;
                    counterBlastY = -2;
                    if((parseInt(snakeBody[0].getAttribute('posY'))+counterBlastY) <= 1){
                        return;
                    }
                break;

                case 'up':
                    blastDirection = 'up';
                    counterBlastX = 0;
                    counterBlastY = 2;
                    if((parseInt(snakeBody[0].getAttribute('posY'))+counterBlastY) > 17){
                        return;
                    }
                break;

                case 'left':
                    blastDirection = 'left';
                    counterBlastX = -2;
                    counterBlastY = 0;
                    if((parseInt(snakeBody[0].getAttribute('posX'))+counterBlastX) <= 1){
                        return;
                    }
                break;
            }

            blast = document.querySelector('[posX = "' + (+parseInt(snakeBody[0].getAttribute('posX'))+counterBlastX) + '"][posY = "' + (+parseInt(snakeBody[0].getAttribute('posY'))+counterBlastY) +'"]');
            blast.classList.add('blast');
            blast.innerHTML = '<img src = "./images/skills/skill-cast/blast.png" class = "blast-image">';
        }
        function moveBlast(){  
            if(blast == null){switcherblast = false; return}

            blast.classList.remove('blast');
            blast.innerHTML = '';

            if(blast.getAttribute('posX')>30 || blast.getAttribute('posX')<=1){switcherblast = false; return}

            if(blast.getAttribute('posY')>17 || blast.getAttribute('posY')<=1){switcherblast = false; return}


            switch(blastDirection){
                case 'right':
                    blastX = 1;
                    blast.style.rotate = '0deg';
                break;

                case 'down':
                    blastY = -1;
                    blast.style.rotate = '-90deg';
                break;

                case 'up':
                    blastY = 1;
                    blast.style.rotate = '+90deg';
                break;

                case 'left':
                    blastX = -1 ;
                    blast.style.transform = 'scale(-1, 1)'
                break;
            }

            blast = document.querySelector('[posX = "' + (+parseInt(blast.getAttribute('posX'))+blastX) + '"][posY = "' + (+parseInt(blast.getAttribute('posY'))+blastY) +'"]');
            blast.classList.add('blast');
            blast.innerHTML = '<img src = "./images/skills/skill-cast/blast.png" class = "blast-image">';

            switch(blastDirection){
                case 'right':
                    blast.style.rotate = '0deg';
                break;

                case 'down':
                    blast.style.rotate = '+90deg';
                break;

                case 'up':
                    blast.style.rotate = '-90deg';
                break;

                case 'left':
                    blast.style.rotate = '0deg';
                    blast.style.transform = 'scale(-1, 1)'
                break;
            }
            killcheck(blast);
            blastkillcheck(blast);
        }

        window.addEventListener('keydown', function(e){
            if(e.keyCode == 32 && switcherblast == false){
                if(snake.mana < 2){
                    return;
                }
                snake.mana-=2; 
                createBlast();
                if(switcherblastshoot != false){
                    let shoot = setInterval(moveBlast, 35);
                }
                switcherblastshoot = false;
            }
        });
        
    break;
}