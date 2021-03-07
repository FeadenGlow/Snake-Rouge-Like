class Walker{
    constructor(){
        let walker;

        let walkerPosX;
        let walkerPosY;

        function createWalker(){
            function generateWalker() {
                walkerPosX = Math.round(Math.random() * (29 - 1) + 1);
                walkerPosY = Math.round(Math.random() * (16 - 1) + 1);
                return[walkerPosX, walkerPosY];
            }
            let walkercoords = generateWalker();
            walker  = document.querySelector('[posX = "'+walkercoords[0]+'"][posY = "'+walkercoords[1]+'"]');

            while(walker.classList.contains('snakeBody') || walker.classList.contains('enemy') || walker.classList.contains('climber')){
                let walkercoords = generateWalker();
                walker  = document.querySelector('[posX = "'+walkercoords[0]+'"][posY = "'+walkercoords[1]+'"]');  
            }
            walker.classList.add('walker');
            walker.innerHTML = '<img src = "/images/enemies/walker.png" class = "walker-img">';
        }

        createWalker();

        function moveWalker(){
            if(walkerSwitcher == true){
                walker.innerHTML = ''
                walker.classList.remove('walker')
                clearInterval(interval);
                return;
            }
            let walkerDirection = Math.round(Math.random() * (100 - 1) + 1);


            if(walkerDirection <= 25){
                if(walkerPosX <= 1){
                    return;
                }
                walkerPosX = walkerPosX-1
            }

            else if(walkerDirection <= 50 && walkerDirection > 25){
                if(walkerPosX >= 29){
                    return;
                }
                walkerPosX = walkerPosX+1
            }

            else if(walkerDirection <= 75 && walkerDirection > 50){
                if(walkerPosY <= 1){
                    return;
                }
                walkerPosY = walkerPosY-1
            }

            else {
                if(walkerPosY >= 16){
                    return;
                }
                walkerPosY = walkerPosY+1
            }

            walker.innerHTML = ''
            walker.classList.remove('walker')
            checker(walker);

            walker.style.rotate = '0deg';
            walker = document.querySelector('[posX = "'+walkerPosX+'"][posY = "'+walkerPosY+'"]');
            walker.classList.add('walker');
            walker.innerHTML = '<img src = "/images/enemies/walker.png" class = "walker-img">';

            if(walker.classList.contains('snakeBody')){
                walker.innerHTML = '';
                removeHealth();
                walker.classList.remove('walker');
                clearInterval(interval);
            }
        }
        let interval = setInterval(moveWalker,300);

        function check(){
            if(walker.classList.contains('blast')){
                clearInterval(interval);

                walker.innerHTML = '';
                walker.classList.remove('walker');
                return;
            }
        }

        let checkinterval = setInterval(check, 25)
    }
}