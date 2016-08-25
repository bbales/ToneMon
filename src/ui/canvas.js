class Canvas {
    constructor(id) {
        this.elem = document.getElementById(id);
        this.ctx = this.elem.getContext('2d');

        this.objs = [];

        var capture = ['mouseup', 'mousedown'];
        for (var e of capture) this.elem.addEventListener(e, this[e + 'Handler'].bind(this));
    }

    width() {
        return this.elem.width;
    }

    height() {
        return this.elem.height;
    }

    mousedownHandler(e) {
        this.objs.map(function(o) {
            o.mousedownHandler.bind(o, e)()
        });
    }

    mouseupHandler(e) {
        this.objs.map(function(o) {
            o.mouseupHandler.bind(o, e)();
        })
    }
}

export default Canvas;
