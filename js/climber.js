class Climber{
    constructor(){
        let climber;
        let climberdirection;

        let xclimber;
        let yclimber;
        let xclimberCounter = 0;
        let yclimberCounter = 0;

        let climbercoords;

        function generateClimber(){
            let posX = Math.round(Math.random() * (29 - 1) + 1);
            let posY = Math.round(Math.random() * (16 - 1) + 1);
            return[posX, posY];
        }

        function createClimber(){
            climbercoords = generateClimber();
            climber = document.querySelector('[posX = "'+climbercoords[0]+'"][posY = "'+climbercoords[1]+'"]');
        
            while(climber.classList.contains('snakeBody') || climber.classList.contains('fruit') || climber.classList.contains('enemy')){
                climbercoords = generateClimber();
                climber  = document.querySelector('[posX = "'+climbercoords[0]+'"][posY = "'+climbercoords[1]+'"]');
            }
        
            if(Math.round(Math.random()*(1-0)+0) == 0){
                climberdirection = 'right';
            }else{
                climberdirection = 'down'
            }
            xclimber = climbercoords[0];
            yclimber = climbercoords[1];
        
            climber.classList.add('climber');
            climber.innerHTML = '<img src = "/images/enemies/climber.png" class = "climber-img">'
        }
        createClimber();

        function climberMove(){

            if(climberSwitcher == true){
                climber.innerHTML = ''
                climber.classList.remove('climber')
                clearInterval(interval);
                return;
            }

            climber.innerHTML = ''
            climber.classList.remove('climber');
            checker(climber);

            if((xclimber+xclimberCounter) > 28){
                climberdirection = 'left';
            }else if((xclimber+xclimberCounter) <= 1){
                climberdirection = 'right';
            }else if((yclimber+yclimberCounter) >= 16){
                climberdirection = 'down';
            }else if((yclimber+yclimberCounter) <= 1){
                climberdirection = 'up';
            }

            if(climberdirection == 'left'){
                climber.style.rotate = '+180deg'
                xclimberCounter--;
            }
            else if(climberdirection == 'right'){
                climber.style.rotate = '0deg'
                xclimberCounter++;
            }
            else if(climberdirection == 'up'){
                climber.style.rotate = '-90deg'
                yclimberCounter++;
            }
            else if(climberdirection == 'down'){
                climber.style.rotate = '+90deg'
                yclimberCounter--;
            }


            climber = document.querySelector('[posX = "'+(+xclimber+xclimberCounter)+'"][posY = "'+(+yclimber+yclimberCounter)+'"]');
            climber.classList.add('climber');
            climber.innerHTML = '<img src = "/images/enemies/climber.png" class = "climber-img">'

            if(climber.classList.contains('snakeBody')){
                removeHealth();
            }
        }
        let interval = setInterval(climberMove,100);

        function check(){
            if(climber.classList.contains('blast')){
                clearInterval(interval);

                climber.innerHTML = '';
                climber.classList.remove('climber');
                return;
            }
        }

        let checkinterval = setInterval(check, 25)
    }
}