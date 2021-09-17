import {Vector} from "./vector.js";

class Box {

    constructor(vec1, vecs) {
        this.vec1 = vec1;
        this.vec2 = vec1.clone().addVec(vecs);
    }

    colide(box) {
        if (this.vec2.x < box.vec1.x) {return false};
        if (this.vec2.y < box.vec1.y) {return false};
        if (this.vec1.x > box.vec2.x) {return false};
        if (this.vec1.y > box.vec2.y) {return false};
        return true;
    }

}

export {Box};