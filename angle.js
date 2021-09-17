import {Vector} from "./vector.js";

class Angle {

    constructor (angle) {
        this.set(angle);
    }

    get() {
        return this.angle*180/Math.PI;
    }

    add(angle) {
        this.set((this.angle*180/Math.PI)+angle);
    }

    substrat(angle) {
        this.set((this.angle*180/Math.PI)-angle);
    }

    set(angle) {
        if (angle >= 360) {
            angle = angle%360;
        }else if (angle < 0) {
            angle = (angle%360)+360;
        }
        this.angle = angle*Math.PI/180.0;
    }

    forward() {
        return new Vector(Math.cos(this.angle), Math.sin(this.angle));
    }

    left() {
        let angle = this.angle-(Math.PI/2);
        return new Vector(Math.cos(angle), Math.sin(angle));
    }

    clone() {
        let angle = new Angle(0);
        angle.angle = this.angle;
        return angle;
    }

}

export {Angle};