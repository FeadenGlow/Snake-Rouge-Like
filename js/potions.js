let potionslot1 = document.createElement('div');
let potionslot2 = document.createElement('div');

potionslot1.classList.add('active-potions-slots');
potionslot2.classList.add('active-potions-slots');
potionslot1.classList.add('active-potions-slot1');
potionslot2.classList.add('active-potions-slot2');

activepotions.appendChild(potionslot1);
activepotions.appendChild(potionslot2);

let potions = [];

function addNewPotion(){
    const config = {
        maxPotions:3,
    }
    let potionscount;
    for(let i = 0; i < config.maxPotions; i++){
        potionscount = i;
        switch(potionscount){
            case 0:
                potionscount = {
                    id: 0,
                    img: "/images/potions/pot-of-swiftness.png",
                    name: 'Potion Of Swiftness',
                    description: 'increase speed for 10% on 1 level',
                    cost: '1 coins',
                    price: 1,
                    function: function(){
                        snake.speedmultiplier = (snake.speed/100)*10;
                    }
                }
            break;
            case 1:
                potionscount = {
                    id: 1,
                    img: "/images/potions/pot-of-coins.png",
                    name: 'Potion Of Coins',
                    description: 'increase recieved coins for 15% on 1 level',
                    cost: '3 coins',
                    price: 3,
                    function: function(){
                        snake.coinmultiplier = 15;
                    }
                }
            break;
            case 2:
                potionscount = {
                    id: 2,
                    img: "/images/potions/pot-of-mana.png",
                    name: 'Potion Of Max Mana',
                    description: '+5 max mana on 1 level',
                    cost: '5 coins',
                    price: 5,
                    function: function(){
                        snake.maxManamultiplier = 5;
                    }
                }
            break;


        }
        potions[i] = potionscount;
    }

    if(potions.length < 2){
        createPotion(potions[0]);
    }
    else{
        for(let i = 0; i < potions.length; i++){
            createPotion(potions[i]);
        }
    }
}

function createPotion(potionstats){
    let slideList = document.querySelector('.splide__list');
    
    slideList.innerHTML+=`<div class="splide__slide id_${potionstats.id}"><img class = "slide__image" src = "${potionstats.img}"><p class = "slide__text">${potionstats.name}</p><p class = "slide__cost">${potionstats.cost}</p></div>`;




    let description = document.createElement('div');
    document.body.appendChild(description);

    let potion = slideList.querySelector(`.id_${potionstats.id}`);

    description.innerHTML = `<p class = "potion-description__text">${potionstats.description}</p>`;
    description.classList.add(`potion-id__${potionstats.id}`);
    description.style.visibility = 'hidden';


    console.log(potion);
    potion.onmousemove = function(){
        description.style.visibility = 'visible';
        description.classList.add('potion-description');

        let x = event.clientX+10;
        let y = event.clientY+10;



        description.style.top = `${y}px`;
        description.style.left = `${x}px`;
    }
    potion.onmouseout = function(){
        description.style.visibility = 'hidden';
        description.classList.remove('potion-description');
    }
    potion.onclick = function(){
        if(snake.coins >= potionstats.price){
            snake.coins -= potionstats.price;
            shopCoins.innerHTML = `Coins: ${snake.coins}`;
        }else{
            return;
        }
        if(potionslot1.innerHTML != ''){
            if(potionslot1.classList.contains(`id_${potionstats.id}`)){
                return;
            }
            potionslot2.innerHTML = `<div class="id_${potionstats.id} active-potion"><img class = "active-potion__image" src = "${potionstats.img}"><p class = "active-potion__text">${potionstats.name}</p></div>`
        }
        else{
            potionslot1.innerHTML = `<div class="id_${potionstats.id} active-potion"><img class = "active-potion__image" src = "${potionstats.img}"><p class = "active-potion__text">${potionstats.name}</p></div>`
            potionslot1.classList.add(`id_${potionstats.id}`);
        }
        potionstats.function();
        }
    }

addNewPotion();

let splide = new Splide( '.splide',{
    perPage: 4,
	rewind : true,
    width: '1100px',
    height: '250px',
    gap: '10px',
    
}).mount();
