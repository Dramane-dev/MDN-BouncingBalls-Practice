import { random } from "../functions/random.js";
import { Shape } from "./Shape.js";

export function Ball(x, y, velx, vely, exists, color, size) {
    Shape.call(this, x, y, velx, vely, exists);

    this.color = color;
    this.size = size;
}

// Héritage
Ball.prototype = Object.create(Shape.prototype);
Ball.prototype.constructor = Ball;

Ball.prototype.draw = function(ctx) {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
}

Ball.prototype.update = function(width, height) {
    if ((this.x + this.size) >= width) {
        this.velx = -(this.velx);
    }

    if ((this.x - this.size) <= 0) {
        this.velx = -(this.velx);
    }

    if ((this.y + this.size) >= height) {
        this.vely = -(this.vely);
    }

    if ((this.y - this.size) <= 0) {
        this.vely = -(this.vely);
    }

    this.x += this.velx;
    this.y += this.vely;
}

Ball.prototype.collisionDetect = function(balls) {
    for (let j = 0; j < balls.length; j++) {
        if (!(this === balls[j])) {
            const dx = this.x - balls[j].x;
            const dy = this.y - balls[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < this.size + balls[j].size) {
                balls[j].color = this.color = 'rgb(' + random(0, 255) + ',' + random(0, 255)  + ',' + random(0, 255) + ')';
            }
        }
    }
}