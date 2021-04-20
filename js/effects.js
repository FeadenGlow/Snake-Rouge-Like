//саиовызывающаяся функция
(() => {

    let randColor = {
        r: 0,
        b: 0,
        g: 0,
    }

    const config = {
        dotMinRad: 6,
        dotMaxRad: 100,
        massFactor: 0.00002,
        defColor: `rgba(${randColor.r}, ${randColor.g}, ${randColor.b}, 0.3)`,
        smooth: 1,
    }

    const TWO_PI = 2 * Math.PI;
    const canvas = document.querySelector('canvas');
    const ctx = canvas.getContext('2d');

    let w, h, mouse, dots;


    class Dot {
        constructor(){
            this.pos = {x: Math.round(Math.random() * (2000 - 1) +1), y: Math.round(Math.random() * (800- 1) +1)};
            this.vel = {x: 0, y: 0};
            this.rad = random(config.dotMinRad, config.dotMaxRad);
            this.mass = this.rad * config.massFactor;
            this.color = config.defColor;
        }

        draw() {
            this.pos.x += this.vel.x;
            this.pos.y += this.vel.y;

            createCircle(this.pos.x, this.pos.y, this.rad, true, this.color);
            createCircle(this.pos.x, this.pos.y, this.rad, false, this.color);
        }
    }

    function updateDots(){
        for(let i = 0; i < dots.length; i++){
            let acc = {x: 0, y: 0}
            for(let j = 0; j < dots.length; j++){
                if(i == j) continue;
                let [a,b] = [dots[i], dots[j]];

                let delta = {x:b.pos.x - a.pos.x, y: b.pos.y - a.pos.y}
                let dist = Math.sqrt(delta.x * delta.x + delta.y * delta.y);
                let force = b.mass;

                acc.x += delta.x * force;
                acc.y += delta.y * force;
            }

            dots[i].vel.x = dots[i].vel.x * config.smooth + acc.x * dots[i].mass;
            dots[i].vel.y = dots[i].vel.y * config.smooth + acc.y * dots[i].mass;
        }
    }

    function createCircle(x, y, rad, fill, color){
        ctx.fillStyle = ctx.strokeStyle = color;
        ctx.beginPath();
        ctx.arc(x, y, rad, 0, TWO_PI);
        ctx.closePath();
        fill ? ctx.fill() : ctx.stroke();
    }

    function random(min, max){
        return Math.random() * (max - min) + min;
    }

    function init(){
        w = canvas.width = innerWidth;
        h = canvas.height = innerHeight;

        mouse = {x: w/2 , y: h/2 , down: false};
        dots = [];
    }

    function loop(){
        ctx.clearRect(0, 0, w, h);
        if(mouse.down) {dots.push(new Dot());}

        updateDots();
        dots.map(e => e.draw());

        window.requestAnimationFrame(loop);
    }

    init();
    loop();

    function setPos({layerX, layerY}){
        [mouse.x, mouse.y] = [layerX, layerY];
    }

    function isDown(){
        mouse.down = !mouse.down;
        randColor.r = Math.round(Math.random() * (250 - 1) +1);
        randColor.b = Math.round(Math.random() * (250 - 100) +100);
        randColor.g = Math.round(Math.random() * (250 - 1) +1);
        config.defColor = `rgba(${randColor.r}, ${randColor.g}, ${randColor.b}, 0.3)`;
    }

    for(let i = 0; i < 20; i++){
        dots.push(new Dot())
    }

})();