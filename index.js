import {Map} from "./map.js";
import {AppGame} from "./appGame.js";
import {StateMenu} from "./stateMenu.js";
import {StatePlay} from "./statePlay.js";

let game = new AppGame(1080, 720, 10);
let statePlay = new StatePlay();
statePlay.setMap(new Map());
game.addState(statePlay);
game.addState(new StateMenu(game));
game.start();