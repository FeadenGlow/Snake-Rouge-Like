let bossbar;
let bossbarLength = 1020;
let bossbarDecrease = 0;
let end;
let bossname = JSON.parse(window.localStorage.getItem('boss-name'));
function createBossbar(){
    let bossbarBackground;
    let bossbarText;
    
    bossbar = document.createElement('div');
    bossbarBackground = document.createElement('div');
    bossbarText = document.createElement('p');

    document.body.appendChild(bossbar);
    document.body.appendChild(bossbarBackground);
    document.body.appendChild(bossbarText);

    bossbar.classList.add('bossbar');
    bossbarBackground.classList.add('bossbar__background');
    bossbarText.classList.add('bossbar__text');

    bossbarText.innerHTML = bossname;
}
createBossbar();

function bossbarDamage(damage){
    let bossbarSum = bossbarLength - damage;

    let id = setInterval(decreaseBossbar,5);

    function decreaseBossbar(){
        if(bossbarLength == bossbarSum){
            clearInterval(id);
            return;
        }
        bossbarLength--;
        bossbar.style.width = bossbarLength+'px';
    }
}

function bossInit(){
    let fieldChild = document.createElement('div');
    let bossimage = document.createElement('img');

    bossimage.classList.add('boss__image');
    fieldChild.classList.add('boss__field');

    field.appendChild(fieldChild);
    fieldChild.appendChild(bossimage);
    switch(bossname){
        case 'Quest Master':
            bossimage.setAttribute('src', './images/bosses/QuestMaster.jpg');
        break;
    }
}
bossInit();

function bossFight(){
    switch(bossname){
        case 'Quest Master':
            let fazecounter = 0;
            let fazechecker1 ,fazecheker2, fazechecker3 = false;
            let interval = setInterval(bossframes, 20);


            function bossframes(){
                if(680 < bossbarLength){
                    fazecounter = 1;
                }
                if( 340 < bossbarLength && bossbarLength <= 680){
                    fazecounter = 2;
                }
                if( 0 < bossbarLength && bossbarLength <= 340){
                    fazecounter = 3;
                }
                switch(fazecounter){
                    case 1:
                        if(fazechecker1 == true){
                            break;
                        }
                        fazechecker1 = true;
                        faze1();
                    break;
                    case 2:

                    break;
                }
            }



            function faze1(){
                let counter = 1;
                let mapTemplate1 = [
                    [8,1],[22,1],
                    [8,2],[22,2],
                    [8,3],[11,3],[12,3],[13,3],[14,3],[15,3],[16,3],[19,3],[22,3],[25,3],[26,3],[27,3],
                    [8,4],[19,4],[22,4],[25,4],
                    [8,5],[19,5],[25,5],
                    [8,6],[9,6],[10,6],[11,6],[12,6],[15,6],[16,6],[17,6],[18,6],[19,6],[25,6],
                    [19,7],[22,7],[23,7],[24,7],[25,7],[28,7],[29,7],
                    [19,8],[22,8],
                    [8,9],[16,9],[17,9],[18,9],[19,9],[20,9],[21,9],[22,9],
                    [8,10],[16,10],[19,10],[25,10],
                    [8,11],[9,11],[10,11],[11,11],[12,11],[13,11],[14,11],[15,11],[16,11],[19,11],[25,11],
                    [19,12],[22,12],[23,12],[24,12],[25,12],[26,12],[27,12],[28,12],[29,12],
                    [19,13],
                    [8,14],[9,14],[10,14],[11,14],[12,14],[13,14],[14,14],[15,14],[16,14],[19,14],
                    [19,15],[22,15],
                    [19,16],[22,16],
                ];
                let mapTemplate2 = [
                    [8,1],
                    [8,2],
                    [8,3],[11,3],[12,3],[13,3],[14,3],[15,3],[16,3],[17,3],[18,3],[19,3],[20,3],[21,3],[22,3],[23,3],[24,3],[25,3],
                    [8,4],[25,4],
                    [8,5],[25,5],[28,5],[29,5],
                    [8,6],[9,6],[10,6],[11,6],[12,6],[13,6],[14,6],[15,6],[16,6],[17,6],[18,6],[19,6],[22,6],[25,6],
                    [10,7],[16,7],[22,7],[25,7],
                    [10,8],[16,8],[22,8],[25,8],[26,8],[27,8],
                    [13,9],[16,9],[19,9],[22,9],[25,9],
                    [13,10],[16,10],[19,10],[22,10],[25,10],
                    [8,11],[11,11],[12,11],[13,11],[16,11],[19,11],[22,11],[25,11],[28,11],[29,11],
                    [8,12],[11,12],[19,12],[25,12],
                    [8,13],[11,13],[19,13],[25,13],
                    [8,14],[11,14],[12,14],[13,14],[14,14],[15,14],[16,14],[17,14],[18,14],[19,14],[20,14],[21,14],[22,14],[23,14],[24,14],[25,14],[26,14],[27,14],
                    [8,15],
                    [8,16],
                ];
                let mapTemplate3 = [
                    [14,1],[20,1],
                    [14,2],[20,2],
                    [8,3],[9,3],[10,3],[11,3],[17,3],[23,3],[24,3],[25,3],[26,3],[29,3],
                    [8,4],[17,4],[23,4],
                    [8,5],[14,5],[15,5],[16,5],[17,5],[18,5],[19,5],[20,5],[21,5],[22,5],[23,5],
                    [8,6],[11,6],[14,6],[23,6],[26,6],[27,6],[28,6],[29,6],
                    [8,7],[9,7],[10,7],[11,7],[14,7],[23,7],
                    [14,8],

                    [14,16],[20,16],
                    [14,15],[20,15],
                    [8,14],[9,14],[10,14],[11,14],[17,14],[23,14],[24,14],[25,14],[26,14],[29,14],
                    [8,13],[17,13],[23,13],
                    [8,12],[14,12],[15,12],[16,12],[17,12],[18,12],[19,12],[20,12],[21,12],[22,12],[23,12],
                    [8,11],[11,11],[14,11],[23,11],[26,11],[27,11],[28,11],[29,11],
                    [8,10],[9,10],[10,10],[11,10],[14,10],[23,10],
                    [14,9],
                ];

                function addTemplate(number){
                    let mapTemplate;
                    switch(number){
                        case 1:
                            mapTemplate = mapTemplate1;
                        break;
                        case 2:
                            mapTemplate = mapTemplate2;
                        break;
                        case 3: 
                            mapTemplate = mapTemplate3;
                        break;
                    }
                    for(let i = 0; i < excel.length; i++){
                        for(let j = 0; j < mapTemplate.length; j++){
                            if(excel[i].getAttribute('posX') == mapTemplate[j][0] && excel[i].getAttribute('posY') == mapTemplate[j][1]){
                                excel[i].classList.add('wall');
                            }
                       }
                    }
                }
                function clearTemplate(number){
                    let mapTemplate;
                    switch(number){
                        case 1:
                            mapTemplate = mapTemplate1;
                        break;
                        case 2:
                            mapTemplate = mapTemplate2;
                        break;
                        case 3: 
                            mapTemplate = mapTemplate3;
                        break;
                    }
                    for(let i = 0; i < excel.length; i++){
                        for(let j = 0; j < mapTemplate.length; j++){
                            if(excel[i].getAttribute('posX') == mapTemplate[j][0] && excel[i].getAttribute('posY') == mapTemplate[j][1]){
                                excel[i].classList.remove('wall');
                            }
                       }
                    }
                }
                function snakeTp(){
                    snakeBody.unshift(document.querySelector('[posX = "4"][posY = "8"]'));
                    snakeBody.pop();
                }
                addTemplate(1);

                function createGodFruit(fposX,fposY){
                    for(let i = 0; i < excel.length; i++){
                        if(excel[i].getAttribute('posX') == fposX && excel[i].getAttribute('posY') == fposY){
                            excel[i].classList.add('god__fruit');
                        }
                        if(excel[i].getAttribute('posX') == fposX + 1 && excel[i].getAttribute('posY') == fposY){
                            excel[i].classList.add('god__fruit');
                        }
                        if(excel[i].getAttribute('posX') == fposX && excel[i].getAttribute('posY') == fposY + 1){
                            excel[i].classList.add('god__fruit');
                            excel[i].innerHTML = `<img src = "./images/holy-fruit.webp">`;
                        }
                        if(excel[i].getAttribute('posX') == fposX + 1 && excel[i].getAttribute('posY') == fposY + 1){
                            excel[i].classList.add('god__fruit');
                        }
                    }
                    let intervalGod = setInterval(eatGodFruit, 50);
                    function eatGodFruit(){
                        if(snakeBody[0].classList.contains('god__fruit')){
                            bossbarDamage(113);
                            for(let i = 0; i < excel.length; i++){
                                excel[i].classList.remove('god__fruit');
                                excel[i].innerHTML = '';
                            }
                            clearTemplate(counter);
                            counter++;
                            if(counter == 4){
                                faze2();
                                return;
                            }
                            addTemplate(counter);
                            spawnGodFruit();
                            snakeTp();
                        }
                    }
                }
                function spawnGodFruit(){
                    switch(counter){
                        case 1:
                            createGodFruit(27,14);
                        break;

                        case 2:
                            createGodFruit(27,2);
                        break;

                        case 3:
                            createGodFruit(18,9);
                        break;
                    }
                }
                spawnGodFruit();
            }

            function faze2(){

            }

        break;
    }
}
bossFight();