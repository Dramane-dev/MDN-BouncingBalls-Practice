import { random } from '../js/functions/random.js';
import { Ball } from './Objects/Ball.js';
import { EvilCircle } from './Objects/EvilCircle.js';

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
let compteur = document.getElementById('compteur');
let count = 0;

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

let balls = [];


while (balls.length < 25) {
    let size = random(10, 20);
    let ball = new Ball(
        random(0 + size, width - size),
        random(0 + size, height - size),
        random(-7,7),
        random(-7,7),
        true,
        'rgb(' + random(0,255) + ',' + random(0,255) + ',' + random(0,255) +')',
        size
    );
    
    count ++;
    compteur.textContent = 'Ball count : ' + count;
    balls.push(ball);
}

let evilCircle = new EvilCircle(
    random(0, width),
    random(0, height),
    true
);

evilCircle.setControls();

function loop() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
    ctx.fillRect(0, 0, width, height);

    for (let i = 0; i < balls.length; i++) {
        if (balls[i].exists) {
            balls[i].draw(ctx);
            balls[i].update(width, height);
            balls[i].collisionDetect(balls);
        }

        evilCircle.draw(ctx);
        evilCircle.checkBounds(width, height);
        evilCircle.collisionDetect(balls, count, compteur);
    }
  
    requestAnimationFrame(loop);
}

loop();




