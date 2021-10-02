class Game {

    setScreen() {
        let w = window.innerWidth;
        let h = window.innerHeight;
        let cofHeight = h/this.height;
        let widthValid = this.width*cofHeight;
        let widthDif = w-widthValid;
        //------------------------------
        let style = "position: fixed; left:"+(widthDif/2.0)+"px; top:0px;"
        +" width:"+widthValid+"px; height:"+h+"px;";
        this.canvas.style = style;
    }

    constructor(width, height, speed) {
        document.body.style = "background: black;";
        this.canvas = document.getElementById("canvas");
        this.width = width;
        this.height = height;
        canvas.width = this.width;
        canvas.height = this.height;
        this.ctx = canvas.getContext("2d");
        this.loop = null;
        //-------------------------------
        this.keysDown = {};
        window.onkeydown = (e) => {
            if (e.altKey && e.keyCode != 18) {
                alert(e.keyCode);
            }
            this.keysDown[e.keyCode] = true;
            this.states[this.idGameState].onKeyDown(this, e);
            this.onKeyDown(e);
        }
        window.onkeyup = (e) => {
            this.keysDown[e.keyCode] = false;
            this.states[this.idGameState].onKeyUp(this, e);
            this.onKeyUp(e);
        }
        window.onfocus = () => {
            this.keysDown = {};
        }
        //resize screen
        this.setScreen();
        window.onresize = () => {
            this.setScreen();
        }
        //var
        this.speed = speed;
        this.delta = 0;
        this.idGameState = 0;
        this.states = new Array();
        this.lastTime = 0;
    }

    addState(state) {
        this.states[state.getId()] = state;
    }

    changeState(id) {
        this.idGameState = id;
        this.states[this.idGameState].init(this);
    }

    getState(id) {
        return this.states[this.idGameState];
    }

    isKeyDown(key) {
        if (this.keysDown[key] != undefined && this.keysDown[key] != null) {
            return this.keysDown[key];
        } else {
            return false;
        }
    }

    start() {
        this.states[this.idGameState].init(this);
        this.init();
        this.loop = setInterval(() => {
            let time = new Date().getTime();
            this.delta = this.lastTime<=0 ? 0 : this.speed/(time-this.lastTime);
            this.lastTime = time;
            this.states[this.idGameState].update(this, this.delta);
            this.update(this.delta);
            this.states[this.idGameState].render(this, this.ctx);
            this.render(this.ctx);
        }, this.speed);
    }

    stop() {
        clearInterval(this.loop);
    }

    /*
    *
    * Implement require
    *
    */

    onKeyDown(e) {

    }

    onKeyUp(e) {

    }

    init() {

    }

    update(delta) {

    }

    render(ctx) {

    }

}

export {Game};