let snake = JSON.parse(window.localStorage.getItem('player-info'));
let inventoryExchange = JSON.parse(window.localStorage.getItem('player-inventory'));
let skillsExchange = JSON.parse(window.localStorage.getItem('player-skills'));

let shopButton = document.querySelector('.shop-text');
let skillsButton = document.querySelector('.skills-text');
let inventoryButton = document.querySelector('.inventory-text');

let shop = document.querySelector('.shop');
let skills = document.querySelector('.skills');
let inventory = document.querySelector('.inventory');
let inventorySide1 = document.querySelector('.inventory-side-1');
let inventorySide2 = document.querySelector('.inventory-side-2');

let skillsSide1 = document.querySelector('.skills-side-1');
let skillsSide2 = document.querySelector('.skills-side-2');

let counterInv = 0;

snake.speedmultiplier = 0;
snake.coinsmultiplier = 0;
snake.maxManamultiplier = 0;

// function preventBack() { window.history.forward(); }  
// setTimeout("preventBack()", 0);  
// window.onunload = function () { null };

inventory.appendChild(inventorySide1);

if(skillsExchange != null){
    for( let i = 0; i <= skillsExchange.length-1; i++){
        let skillsExcel = document.createElement('div');
        skillsSide2.appendChild(skillsExcel);
        skillsExcel.classList.add('skills-excel');

        let skillsExcelCell = document.createElement('div');
        skillsExcel.appendChild(skillsExcelCell);
        skillsExcelCell.classList.add('skills-excel-cell');

        let skillsText = document.createElement('p');
        skillsExcel.appendChild(skillsText);
        skillsText.classList.add('skills-text-cell');


        skillsExcelCell.innerHTML = '<img src = "./images/'+ skillsExchange[i].img  +'" class = "skills-image">';
        skillsText.innerHTML = skillsExchange[i].name;

        skillsExcelCell.addEventListener('click', function(e){

            let skillsExcells = document.getElementsByClassName('skills-excel');

            for(let j = 0; j < skillsExcells.length; j++){
                skillsExcells[j].classList.remove('inventory__skill-selected');
            }

            skillsSide1.innerHTML = ''

            window.localStorage.setItem('selected-skill', JSON.stringify(skillsExchange[i].id));
            skillsExcel.classList.add('inventory__skill-selected');

            let img = document.createElement('img');
            img.src = './images/'+ skillsExchange[i].img
            img.classList.add('skill-image-description');

            let name = document.createElement('p');
            name.innerHTML = skillsExchange[i].name;
            name.classList.add('skill-name');

            let description = document.createElement('p')
            description.innerHTML = skillsExchange[i].description;
            description.classList.add('skill-description')
            
            let stats = document.createElement('table');
            stats.classList.add('skill-stats-description');



            let headings = document.createElement('tr');
            headings.classList.add('skill-headings');

            let damage = document.createElement('td');
            damage.innerHTML = 'damage';
            let rarity = document.createElement('td');
            rarity.innerHTML = 'rarity';
            let mana = document.createElement('td');
            mana.innerHTML = 'mana';



            let headingsDescription = document.createElement('tr');

            let damageDesc = document.createElement('td');
            damageDesc.innerHTML = skillsExchange[i].damage;

            let rarityDesc = document.createElement('td');
            rarityDesc.innerHTML = skillsExchange[i].rarity;
            let manaDesc = document.createElement('td');
            manaDesc.innerHTML = skillsExchange[i].manaCost;

            stats.appendChild(headings);

            headings.appendChild(damage);
            headings.appendChild(rarity);
            headings.appendChild(mana);

            stats.appendChild(headingsDescription);

            headingsDescription.appendChild(damageDesc);
            headingsDescription.appendChild(rarityDesc);
            headingsDescription.appendChild(manaDesc);

            skillsSide1.appendChild(img);
            skillsSide1.appendChild(name);
            skillsSide1.appendChild(description);
            skillsSide1.appendChild(stats);

    });
    }
}

if(inventoryExchange != null){
    for( let i = 0; i <= inventoryExchange.length-1; i++){
        counterInv++;
        let inventoryExcel = document.createElement('div');
        inventorySide1.appendChild(inventoryExcel);
        inventoryExcel.classList.add('inventory-excel');

        let inventoryExcelCell = document.createElement('div');
        inventoryExcel.appendChild(inventoryExcelCell);
        inventoryExcelCell.classList.add('inventory-excel-cell');

        let inventoryText = document.createElement('p');
        inventoryExcel.appendChild(inventoryText);
        inventoryText.classList.add('inventory-text-cell');

        inventoryExcelCell.innerHTML = '<img src = "./images/'+ inventoryExchange[i].img  +'" class = "artifact-image">';
        inventoryText.innerHTML = inventoryExchange[i].name;

        inventoryExcelCell.addEventListener('click', function(e){

            inventorySide2.innerHTML = ''

            let img = document.createElement('img');
            img.src = './images/'+ inventoryExchange[i].img
            img.classList.add('artifact-image-description');

            let name = document.createElement('p');
            name.innerHTML = inventoryExchange[i].name;
            name.classList.add('artifact-name');

            let description = document.createElement('p')
            description.innerHTML = inventoryExchange[i].description;
            description.classList.add('artifact-description')
            
            let stats = document.createElement('table');
            stats.classList.add('artifact-stats-description');



            let headings = document.createElement('tr');
            headings.classList.add('artifact-headings');

            let reforge = document.createElement('td');
            reforge.innerHTML = 'reforge';
            let type = document.createElement('td');
            type.innerHTML = 'type';
            let mana = document.createElement('td');
            mana.innerHTML = 'mana';



            let headingsDescription = document.createElement('tr');

            let reforgeDesc = document.createElement('td');
            if(inventoryExchange[i].reforge != null){
                reforgeDesc.innerHTML = inventoryExchange[i].reforge;
            }else{
                reforgeDesc.innerHTML = 'none';
            }
            let typeDesc = document.createElement('td');
            typeDesc.innerHTML = inventoryExchange[i].type;
            let manaDesc = document.createElement('td');
            manaDesc.innerHTML = inventoryExchange[i].manaCost;

            stats.appendChild(headings);

            headings.appendChild(reforge);
            headings.appendChild(type);
            headings.appendChild(mana);

            stats.appendChild(headingsDescription);

            headingsDescription.appendChild(reforgeDesc);
            headingsDescription.appendChild(typeDesc);
            headingsDescription.appendChild(manaDesc);

            inventorySide2.appendChild(img);
            inventorySide2.appendChild(name);
            inventorySide2.appendChild(description);
            inventorySide2.appendChild(stats);

    });
    }
}

let shopCoins = document.createElement('p');
let shopMana = document.createElement('p');
let shopHp = document.createElement('p');
let slidervis = document.createElement('div');
let activepotions = document.createElement('div');

shopCoins.classList.add('shop-coins');
shopMana.classList.add('shop-mana');
shopHp.classList.add('shop-hp');
slidervis.classList.add('slider');
slidervis.classList.add('splide');
activepotions.classList.add('active-potions');


shop.appendChild(shopCoins);
shop.appendChild(shopMana);
shop.appendChild(shopHp);
shop.appendChild(slidervis);
shop.appendChild(activepotions);

shopCoins.innerHTML = `<img class = "coins-image" src = "./images/coin.png"><p class = "coins-shop-text">${snake.coins}</p>`;
shopMana.innerHTML = `<img class = "mana-image" src = "./images/mana.webp"><p class = "coins-shop-text">${snake.mana}</p>`;
shopHp.innerHTML = `<img class = "coins-image" src = "./images/snakeHead.png"><p class = "coins-shop-text">${snake.hp}</p>`


shopButton.addEventListener('click', function(){
    skills.style.visibility = 'hidden';
    shop.style.visibility = 'visible';
    let slider = document.getElementById('splide01');
    slider.style.visibility = 'visible';
    inventory.style.visibility = 'hidden';

});
skillsButton.addEventListener('click', function(){
    skills.style.visibility = 'visible';
    shop.style.visibility = 'hidden';
    let slider = document.getElementById('splide01');
    slider.style.visibility = 'hidden';
    inventory.style.visibility = 'hidden';

});
inventoryButton.addEventListener('click', function(){
    skills.style.visibility = 'hidden';
    shop.style.visibility = 'hidden';
    let slider = document.getElementById('splide01');
    slider.style.visibility = 'hidden';
    inventory.style.visibility = 'visible';

});