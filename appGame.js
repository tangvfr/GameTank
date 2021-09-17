import {Tank} from "./tank.js";
import {GameState} from "./gamestate.js";
import {Game} from "./game.js";
import {Vector} from "./vector.js";
import {Angle} from "./angle.js";
import {Box} from "./box.js";
import {Obu} from "./obu.js";
import {Map} from "./map.js";
import {Wall} from "./wall.js";

class AppGame extends Game {
    
    colideBorder(box) {
        return box.vec1.x < 0 
        || box.vec1.y < 0 
        || box.vec2.x > this.width 
        || box.vec2.y > this.height;
    }

    init() {
        
    }

    update(delta) {

    }

    render(ctx) {
        
    }

}

export {AppGame};