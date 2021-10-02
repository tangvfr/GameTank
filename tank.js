import {Angle} from "./angle.js";
import {Box} from "./box.js";
import {Vector} from "./vector.js";
import {Obu} from "./obu.js";
import {Wall} from "./wall.js";

class Tank {

    colide(game, list) {
        if(game.colideBorder(this.getBox())) {
            return true;
        }
        let ret = false;
        list.forEach((val, i) => {
            if (val != this && !ret) {
                if (val instanceof Tank) {
                    if (this.getBox().colide(val.getBox())) {
                        ret = true;
                    }
                } else if (val instanceof Wall) {
                    if (this.getBox().colide(val.getBox())) {
                        ret = true;
                    }
                }
            }
        });
        return ret;
    }

    constructor(colorCh, colorCo, colorCa, angle, vec, speed, speedAngle, life, damage) {
        this.colorCh = colorCh;
        this.colorCo = colorCo;
        this.colorCa = colorCa;
        this.angle = new Angle(angle);
        this.vec = vec;
        this.width = 108;
        this.height = 52;
        this.speed = speed;
        this.speedAngle = speedAngle;
        this.cof = 20;
        this.boxColide = false;
        //shoot obu
        this.obuLastTime = 0;
        this.obuCooldown = 1000;
        this.obuSpeed = 6;
        this.obuColor = "#444444";
        //life
        this.life = life;
        this.maxlife = life;
        this.damage = damage;
    }

    shoot(list) {
        let time = new Date().getTime();
        if (time >= (this.obuLastTime+this.obuCooldown) && list instanceof Array) {
            list.unshift(new Obu(this.obuColor, this.angle, new Vector(this.vec.x+(this.width/2)-5, this.vec.y+(this.height/2)-5), this.obuSpeed, this, this.damage));
            this.obuLastTime = new Date().getTime();
        }
    }

    render(ctx) {
        let x = -this.width/2;
        let y = -this.height/2;
        ctx.translate(this.vec.x-x, this.vec.y-y);
        ctx.rotate(this.angle.angle);
        ctx.fillStyle = this.colorCh;
        ctx.fillRect(x, y, 80, 6);
        ctx.fillStyle = this.colorCo;
        ctx.fillRect(x+6, y+6, 80, 40);
        ctx.fillStyle = this.colorCh;
        ctx.fillRect(x, y+46, 80, 6);
        ctx.fillStyle = this.colorCa;
        ctx.fillRect(x+68, y+20, 40, 12);
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        if (this.boxColide) {
            ctx.strokeStyle = "#FF00FF";
            ctx.strokeRect(this.vec.x+this.cof, this.vec.y-(this.width-this.height)/2+this.cof, this.width-this.cof*2, this.width-this.cof*2);
        }
        ctx.fillStyle = "#880000";
        ctx.fillRect(this.vec.x-x-30, this.vec.y-y-5, 60, 10);
        ctx.fillStyle = "#FF0000";
        ctx.fillRect(this.vec.x-x-30, this.vec.y-y-5, 60*(this.life/this.maxlife), 10);
        ctx.strokeStyle = "#000000";
        ctx.strokeRect(this.vec.x-x-30, this.vec.y-y-5, 60, 10);
    }

    getBox() {
        return new Box(new Vector(this.vec.x+this.cof, this.vec.y-(this.width-this.height)/2+this.cof), new Vector(this.width-this.cof*2, this.width-this.cof*2));
    }
    
}

export {Tank};