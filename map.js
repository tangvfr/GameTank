import {Vector} from "./vector.js";

class Map {

    constructor() {
        this.name = "";
        this.walls = [];
        this.background = "#FFFF00";
        this.posTank = [new Vector(50, 20), new Vector(972, 648)];
        this.angleTank = [0, 180];
    }

}

export {Map};