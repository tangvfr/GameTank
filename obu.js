import {Tank} from "./tank.js";
import {Box} from "./box.js";
import {Vector} from "./vector.js";
import {Angle} from "./angle.js";
import {Wall} from "./wall.js";

class Obu {

    constructor(color, angle, vec, speed, propri, damage) {
        this.color = color;
        this.angle = angle.clone();
        this.direction = this.angle.forward();
        this.vec = vec;
        this.width = 20;
        this.height = 20;
        this.damage = damage;
        this.speed = speed;
        this.propri = propri;
    }

    update(list, game, delta) {
        this.vec.addVec(this.direction.clone().multipleVal(delta*this.speed));
        let stop = 0;
        if (list instanceof Array) {
            if(game.colideBorder(this.getBox())) {
                list.splice(list.indexOf(this), 1);
                stop = 1;
            } else {
                list.forEach((val, i) => {
                    if (val != this.propri && !stop) {
                        if (val instanceof Tank) {
                            if (this.getBox().colide(val.getBox())) {
                                list.splice(list.indexOf(this), 1);
                                stop = 1;
                                val.life -= this.damage;
                            }
                        } else if (val instanceof Wall) {
                            if (this.getBox().colide(val.getBox())) {
                                list.splice(list.indexOf(this), 1);
                                stop = 1;
                            }
                        }
                    }
                });
            }
        }
    }

    render(ctx) {
        ctx.translate(this.vec.x+10, this.vec.y+10);
        ctx.rotate(this.angle.angle);
        ctx.fillStyle = this.color;
        ctx.fillRect(-10, -10, 10, 10);
        ctx.setTransform(1, 0, 0, 1, 0, 0);
    }
    
    getBox() {
        return new Box(this.vec, new Vector(this.width, this.height));
    }

}

export {Obu};