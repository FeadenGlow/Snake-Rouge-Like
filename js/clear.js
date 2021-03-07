let walkerSwitcher;
let climberSwitcher;
let enemySwitcher;

function clearEnemies(){
    walkerSwitcher = true;
    climberSwitcher = true;
    enemySwitcher = true;

    fruit.innerHTML = '';
    fruit.classList.remove('fruit');
}