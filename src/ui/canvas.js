class Canvas {
    constructor(id) {
        this.elem = document.getElementById(id);
        this.ctx = this.elem.getContext('2d');

        this.objs = [];

        this.elem.addEventListener('mousedown', this.mousedownHandler.bind(this));
        this.elem.addEventListener('mouseup', this.mouseuphandler.bind(this));
    }

    width() {
        return this.elem.width;
    }

    height() {
        return this.elem.height;
    }

    mousedownHandler(e) {
        this.objs.map(function(o) {
            console.log(o.hitBox.bind(o, e.x, e.y)());
        })
    }

    mupHandler(e) {
        this.objs.map(function(o) {
            console.log(o.hitBox.bind(o, e.x, e.y)());
        })
    }
}

module.exports = {
    Canvas: Canvas
}
