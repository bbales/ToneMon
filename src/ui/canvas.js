class Canvas {
    constructor(id) {
        this.elem = document.getElementById(id);
        this.ctx = this.elem.getContext('2d');

        this.objs = [];

        // Event capturing
        var capture = ['mouseup', 'mousedown', 'mousemove'];
        for (var eventName of capture) this.elem.addEventListener(eventName, this[eventName + 'Handler'].bind(this));

        // Start draw loop
        setInterval(this.redraw.bind(this), 1000 / 30);
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
        });
    }

    mousemoveHandler(e) {
        this.objs.map(function(o) {
            o.mousemoveHandler.bind(o, e)();
        });
    }

    redraw() {
        this.ctx.clearRect(0, 0, this.elem.width, this.elem.height);
        this.objs.map(e => e.draw.bind(e)());
    }
}

export default Canvas;
