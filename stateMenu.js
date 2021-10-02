import {Tank} from "./tank.js";
import {GameState} from "./gamestate.js";
import {Game} from "./game.js";
import {Vector} from "./vector.js";
import {Angle} from "./angle.js";
import {Box} from "./box.js";
import {Obu} from "./obu.js";
import {Map} from "./map.js";
import {Wall} from "./wall.js";

class StateMenu extends GameState {

    constructor(game) {
        super();
        document.getElementById("startButton").onclick = function() {
            document.getElementById("menu").hidden = true;
            game.changeState(1);
        }
    }

    init(game) {
        document.getElementById("menu").hidden = false;
    }

    getId() {
        return 0;
    }

}

export {StateMenu};