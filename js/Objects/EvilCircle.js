import { Shape } from "./Shape.js";

export function EvilCircle(x, y, exists) {
    Shape.call(this, x, y, 20, 20, exists);
    this.color = 'white';
    this.size = 10;
}

EvilCircle.prototype = Object.create(Shape.prototype);
EvilCircle.prototype.constructor = EvilCircle;

EvilCircle.prototype.draw = function(ctx) {
    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.strokeStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.stroke();
}

EvilCircle.prototype.checkBounds = function(width, height) {
    if ((this.x + this.size) >= width) {
        this.x -= this.size;
    }

    if ((this.x - this.size) <= 0) {
        this.x += this.size;
    }

    if ((this.y + this.size) >= height) {
        this.y -= this.size;
    }

    if ((this.y - this.size) <= 0) {
        this.y += this.size;
    }
}

EvilCircle.prototype.setControls = function() {
    let _this = this;

    window.onkeydown = function (e) {

        _getKeyName(e.key);

        switch (true) {
            case e.keyCode === 65:
                _this.x -= _this.velx;
                break;
            case e.keyCode === 68:
                _this.x += _this.velx;
                break;
            case e.keyCode === 87:
                _this.y -= _this.vely;
                break;
            case e.keyCode === 83:
                _this.y-= _this.vely;
                break;
            default:
                break;
        }
    }

    function _getKeyName(key) {
        console.log(`The ${key} is pressed !`);
    }
}

EvilCircle.prototype.collisionDetect = function(balls, count, compteur) {
    for (let j = 0; j < balls.length; j++) {
        if (balls[j].exists) {
            const dx = this.x - balls[j].x;
            const dy = this.y - balls[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < this.size + balls[j].size) {
                balls[j].exists = false;
                count --;
                compteur.textContent = 'Ball count : ' + count;
            }
        }
    }
}