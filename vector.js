class Vector {

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    setVal(x) {
        this.x = x;
        this.y = x;
        return this;
    }

    set(x, y) {
        this.x = x;
        this.y = y;
        return this;
    }

    setVec(vec) {
        this.x = vec.x;
        this.y = vec.y;
        return this;
    }

    addVal(x) {
        this.x += x;
        this.y += x;
        return this;
    }

    add(x, y) {
        this.x += x;
        this.y += y;
        return this;
    }

    addVec(vec) {
        this.x += vec.x;
        this.y += vec.y;
        return this;
    }

    substratVal(x) {
        this.x -= x;
        this.y -= x;
        return this;
    }

    substrat(x, y) {
        this.x -= x;
        this.y -= y;
        return this;
    }

    substratVec(vec) {
        this.x -= vec.x;
        this.y -= vec.y;
        return this;
    }

    multipleVal(x) {
        this.x *= x;
        this.y *= x;
        return this;
    }

    multiple(x, y) {
        this.x *= x;
        this.y *= y;
        return this;
    }

    multipleVec(vec) {
        this.x *= vec.x;
        this.y *= vec.y;
        return this;
    }

    diviseVal(x) {
        this.x /= x;
        this.y /= x;
        return this;
    }

    divise(x, y) {
        this.x /= x;
        this.y /= y;
        return this;
    }

    diviseVec(vec) {
        this.x /= vec.x;
        this.y /= vec.y;
        return this;
    }

    distance(vec) {
        let width = this.x-vec.x;
        let height = this.y-vec.y;
        return Math.sqrt((width*width)+(height*height));
    }

    normalize() {
        let v = Math.sqrt((x*x)+(y*y));
        return new Vector(x/v, y/v);
    }

    clone() {
        return new Vector(this.x, this.y);
    }

}

export {Vector};