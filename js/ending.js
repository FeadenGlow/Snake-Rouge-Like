function ending(){
    let portal;
    let portalcoords;

    floor.enemies++;
    clearEnemies();

    function createPortal(){
        function generatePortal() {
            let portalPosX = Math.round(Math.random() * (29 - 1) + 1);
            let portalPosY = Math.round(Math.random() * (16 - 1) + 1);
            return[portalPosX, portalPosY];
        }
        portalcoords = generatePortal();
        portal = document.querySelector('[posX = "'+portalcoords[0]+'"][posY = "'+portalcoords[1]+'"]'); 
        portal.classList.add('portal');
        portal.innerHTML = '<img src = "/images/portal.gif" class = "portal-image">';
        window.localStorage.setItem('player-info', JSON.stringify(snake));
        
    } 

    createPortal();
}