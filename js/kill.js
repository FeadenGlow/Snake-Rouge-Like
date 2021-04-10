function getReward(coins, mana){
    floor.enemies--;
    let coinsScore1 = document.querySelector('.coins');
    
    let enemiesScore1 = document.querySelector('.enemies-text');
    enemiesScore1.innerHTML = floor.enemies;


    let coinsChance = Math.round(Math.random()*(2-1)+1);
    if(coinsChance == 1){
        if(snake.coinschecker == true){
            snake.coins += coins + (coins/100)*snake.coinmultiplier;
        }
        else{
            snake.coins+=coins
        }
        coinsScore1.innerHTML = snake.coins;
    }

    snake.mana++;

    if(snake.mana>=snake.maxMana){
        snake.mana = snake.maxMana;
    }

    snake.mana+mana;
}
