import {Tank} from "./tank.js";
import {GameState} from "./gamestate.js";
import {Game} from "./game.js";
import {Vector} from "./vector.js";
import {Angle} from "./angle.js";
import {Box} from "./box.js";
import {Obu} from "./obu.js";
import {Map} from "./map.js";
import {Wall} from "./wall.js";

class StatePlay extends GameState {

    setMap(map) {
        this.map = map;
    }

    init(game, scoreNoReset) {
        let tank1ColorCh = document.getElementById("tank1ColorCh").value;
        let tank1ColorCo = document.getElementById("tank1ColorCo").value;
        let tank1ColorCa = document.getElementById("tank1ColorCa").value;
        let tank2ColorCh = document.getElementById("tank2ColorCh").value;
        let tank2ColorCo = document.getElementById("tank2ColorCo").value;
        let tank2ColorCa = document.getElementById("tank2ColorCa").value;
        //---------------------------
        this.pause = false;
        let tankDamage = 1;
        let tankLife = 3;
        let obuCooldown = 800;
        let obuSpeed = 6;
        let speed = 1.8;
        let speedAngle = 1.8;
        this.tank1 = new Tank(tank1ColorCh, tank1ColorCo, tank1ColorCa, this.map.angleTank[0], this.map.posTank[0].clone(), speed, speedAngle, tankLife, tankDamage);
        this.tank2 = new Tank(tank2ColorCh, tank2ColorCo, tank2ColorCa, this.map.angleTank[1], this.map.posTank[1].clone(), speed, speedAngle, tankLife, tankDamage);
        this.tank1.obuCooldown = obuCooldown;
        this.tank2.obuCooldown = obuCooldown;
        this.tank1.obuSpeed = obuSpeed;
        this.tank2.obuSpeed = obuSpeed;
        let obuColor = "#444444";
        this.tank1.obuColor = obuColor;
        this.tank2.obuColor = obuColor;
        //init
        this.list = [this.tank1];
        this.list.unshift(this.tank2);
        this.list.unshift(this.map.walls);
        if (scoreNoReset == undefined || !scoreNoReset) {
            this.resetScore();
        }
    }

    resetScore() {
        //Score
        this.score1 = 0;
        this.score2 = 0;
        this.winner = 0;
    }

    reload(game) {
        this.init(game, true);
        this.winner = 0;
    }

    update(game, delta) {
        if (!this.pause) {
            if (game.isKeyDown(68)) {
                this.tank1.angle.add(this.tank1.speedAngle*delta);
            }
            if (game.isKeyDown(81)) {
                this.tank1.angle.substrat(this.tank1.speedAngle*delta);
            }
            if (game.isKeyDown(90)) {
                this.tank1.vec.addVec(this.tank1.angle.forward().multipleVal(this.tank1.speed*delta));
                if (this.tank1.colide(game, this.list)) {
                    this.tank1.vec.substratVec(this.tank1.angle.forward().multipleVal(this.tank1.speed*delta));
                }
            }
            if (game.isKeyDown(83)) {
                this.tank1.vec.substratVec(this.tank1.angle.forward().multipleVal(this.tank1.speed*delta));
                if (this.tank1.colide(game, this.list)) {
                    this.tank1.vec.addVec(this.tank1.angle.forward().multipleVal(this.tank1.speed*delta));
                }
            }
            if (game.isKeyDown(70)) {
                this.tank1.shoot(this.list);
            }
            //tank2
            if (game.isKeyDown(39)) {
                this.tank2.angle.add(this.tank2.speedAngle*delta);
            }
            if (game.isKeyDown(37)) {
                this.tank2.angle.substrat(this.tank2.speedAngle*delta);
            }
            if (game.isKeyDown(38)) {
                this.tank2.vec.addVec(this.tank2.angle.forward().multipleVal(this.tank2.speed*delta));
                if (this.tank2.colide(game, this.list)) {
                    this.tank2.vec.substratVec(this.tank2.angle.forward().multipleVal(this.tank2.speed*delta));
                }
            }
            if (game.isKeyDown(40)) {
                this.tank2.vec.substratVec(this.tank2.angle.forward().multipleVal(this.tank2.speed*delta));
                if (this.tank2.colide(game, this.list)) {
                    this.tank2.vec.addVec(this.tank2.angle.forward().multipleVal(this.tank2.speed*delta));
                }
            }
            if (game.isKeyDown(13)) {
                this.tank2.shoot(this.list);
            }
            this.list.forEach((val, i) => {
                if (val instanceof Obu) {
                    val.update(this.list, game, delta);
                }
            });
            if (this.tank1.life <= 0) {
                this.winner = 2;
                this.score2++;
                this.pause = true;
            } else if (this.tank2.life <= 0) {
                this.winner = 1;
                this.score1++;
                this.pause = true;
            }
        }
    }

    onKeyDown(game, e) {
        if (e.keyCode == 27) {
            game.changeState(0);
        } else if (e.keyCode == 115) {
            this.tank1.boxColide = !this.tank1.boxColide;
            this.tank2.boxColide = !this.tank2.boxColide;
        } else if (e.keyCode == 113 && this.pause) {
            this.reload(game);
        }
    }

    render(game, ctx) {
        ctx.fillStyle = this.map.background;
        ctx.fillRect(0, 0, game.width, game.height);
        this.list.forEach((val, i) => {
            if (val instanceof Tank) {
                val.render(ctx);
            } else if (val instanceof Obu) {
                val.render(ctx);
            } else if (val instanceof Wall) {
                val.render(ctx);
            }
        });
        if (this.pause) {
            game.ctx.fillStyle = "#000000";
            game.ctx.font = "40px Georgia";
            game.ctx.fillText("Tank Winner "+this.winner, 400, 300);
            game.ctx.font = "20px Georgia";
            game.ctx.fillText("F2 To Restart", 480, 330);
            game.ctx.font = "20px Georgia";
            game.ctx.fillText("S1: "+this.score1+" S2: "+this.score2, 480, 350);
        } else {
            game.ctx.fillStyle = "#000000";
            game.ctx.font = "16px Georgia";
            game.ctx.fillText("S1: "+this.score1+" S2: "+this.score2, 480, 600);
        }
    }

    getId() {
        return 1;
    }

}

export {StatePlay};