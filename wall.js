class Wall {

    constructor(vecPos, vecSize, color) {
        this.vecPos = vecPos;
        this.vecSize = vecSize;
        this.color = color;
    }

    render(ctx) {
        ctx.translate(this.vecPos.x, this.vecPos.y);
        ctx.fillStyle = this.color;
        ctx.fillRect(this.vecPos.x, this.vecPos.y, this.vecSize.x, this.vecSize.y);
        ctx.setTransform(1, 0, 0, 1, 0, 0);
    }
    
    getBox() {
        return new Box(this.vecPos, this.vecSize);
    }

}

export {Wall};