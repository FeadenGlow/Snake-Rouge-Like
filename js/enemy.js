class Enemy{
    constructor(){
        let enemycoords;
        let enemy;
        function createEnemy(){
            function generateEnemy(){
                let posX = Math.round(Math.random() * (29 - 2) + 2);
                let posY = Math.round(Math.random() * (16 - 1) + 1);
                return[posX, posY];
            }
            enemycoords = generateEnemy();
            enemy  = document.querySelector('[posX = "'+enemycoords[0]+'"][posY = "'+enemycoords[1]+'"]');

            while(enemy.classList.contains('snakeBody') || enemy.classList.contains('fruit')){
                enemycoords = generateEnemy();
                enemy  = document.querySelector('[posX = "'+enemycoords[0]+'"][posY = "'+enemycoords[1]+'"]'); 
            }

            enemy.classList.add('enemy');
            enemy.innerHTML = '<img src = "./images/enemies/enemy.png" class = "enemy-img">'//
        }
        createEnemy();

        let spitdirection;
        let spitcoords;

        let countersplitX = 0;
        let countersplitY = 0;
        let xspit;
        let yspit;
        let reasonspit;
        let blockcheck = false;

        let spit;
        let headdirX = snakeBody[0].getAttribute('posX');
        let headdirY = snakeBody[0].getAttribute('posY');

        function createNewSpit(){
            spit.innerHTML = ''
            spit.classList.remove('spit');
            countersplitY = 0;
            countersplitX = 0;

            spit = document.querySelector('[posX = "'+parseInt(enemycoords[0]-1) +'"][posY = "'+enemycoords[1]+'"]');
            spitcoords = [parseInt(enemycoords[0]-1), enemycoords[1]];
            spit.classList.add('spit');
            spit.innerHTML = '<img src = "./images/shoot.png" class = "shoot-img">';

            headdirX = snakeBody[0].getAttribute('posX');
            headdirY = snakeBody[0].getAttribute('posY');
            blockcheck = false;
        }
        function shoot(){

            if(enemySwitcher == true){
                clearInterval(interval);
                spit.innerHTML = ''
                spit.classList.remove('spit');
                countersplitY = 0;
                countersplitX = 0;

                enemy.innerHTML = '';
                enemy.classList.remove('enemy');
                return;
            }

            if(spit == null){

                spitcoords = [parseInt(enemycoords[0]-1), enemycoords[1]];
                spit = document.querySelector('[posX = "'+spitcoords[0]+'"][posY = "'+spitcoords[1]+'"]');
                spit.classList.add('spit');

                createNewSpit();
                return;
            }
            
            if(headdirX > parseInt(spit.getAttribute('posX')) && blockcheck == false){
                spitdirection = 'right';
                xspit = (spitcoords[0] + countersplitX);
                yspit = (spitcoords[1] + countersplitY);
                reasonspit = (spitcoords[0] + countersplitX) < 30;
            }
            else if(headdirX < parseInt(spit.getAttribute('posX')) && blockcheck == false){
                spitdirection = 'left';
                xspit = (spitcoords[0] + countersplitX);
                yspit = (spitcoords[1] + countersplitY);
                reasonspit = (spitcoords[0] + countersplitX) >= 1;
            }
            else if(headdirY < parseInt(spit.getAttribute('posY')) && blockcheck == false){
                spitdirection = 'down';
                xspit = (spitcoords[0] + countersplitX);
                yspit = (spitcoords[1] + countersplitY);
                reasonspit = (spitcoords[1] + countersplitY) >= 1;
            }
            else if(headdirY > parseInt(spit.getAttribute('posY')) && blockcheck == false){
                spitdirection = 'up';
                xspit = (spitcoords[0] + countersplitX);
                yspit = (spitcoords[1] + countersplitY);
                reasonspit = (spitcoords[1] + countersplitY) < 17;
            }else {
                blockcheck = true;
                if(spitdirection == 'left'){
                    xspit = (spitcoords[0] + countersplitX);
                    yspit = (spitcoords[1] + countersplitY);
                    reasonspit = (spitcoords[0] + countersplitX) >= 1;
                }
                else if(spitdirection == 'right'){
                    xspit = (spitcoords[0] + countersplitX);
                    yspit = (spitcoords[1] + countersplitY);
                    reasonspit = (spitcoords[0] + countersplitX) < 30;
                }
                else if(spitdirection == 'down'){
                    xspit = (spitcoords[0] + countersplitX);
                    yspit = (spitcoords[1] + countersplitY);
                    reasonspit = (spitcoords[1] + countersplitY) >= 1;
                }
                else if(spitdirection == 'up'){
                    xspit = (spitcoords[0] + countersplitX);
                    yspit = (spitcoords[1] + countersplitY);
                    reasonspit = (spitcoords[1] + countersplitY) < 17;
                }
            }

            
            if(reasonspit && spit != null) {
                spit.innerHTML = ''
                checker(spit);
                if(spit.classList.contains('snakeBody')){
                    createNewSpit();
                    removeHealth();
                    return;
                }
                spit.classList.remove('spit');
                

                spit = document.querySelector('[posX = "' + xspit + '"][posY = "' + yspit + '"]');
                spit.classList.add('spit');
                spit.innerHTML = '<img src = "./images/shoot.png" class = "shoot-img">';
            } else{
                createNewSpit();
                return;
            }

            if(headdirX < parseInt(spit.getAttribute('posX')) && blockcheck == false){
                countersplitX--;
            }
            else if(headdirX > parseInt(spit.getAttribute('posX')) && blockcheck == false){
                countersplitX++;
            }
            else if(headdirY < parseInt(spit.getAttribute('posY')) && blockcheck == false){
                countersplitY--;
            }
            else if(headdirY > parseInt(spit.getAttribute('posY')) && blockcheck == false){
                countersplitY++;
            } else{
                if(spitdirection == 'left'){
                    countersplitX--;
                }
                else if(spitdirection == 'right'){
                    countersplitX++;
                }
                else if(spitdirection == 'down'){
                    countersplitY--;
                }
                else if(spitdirection == 'up'){
                    countersplitY++;
                }
            }
        }

        let interval = setInterval(shoot,100);

        function check(){
            if(snakeBody[0].classList.contains('enemy') || enemy.classList.contains('blast')){
                clearInterval(interval);
                spit.innerHTML = ''
                spit.classList.remove('spit');
                countersplitY = 0;
                countersplitX = 0;

                enemy.innerHTML = '';
                enemy.classList.remove('enemy');
                return;
            }
        }

        let checkinterval = setInterval(check, 35)
    }
}
