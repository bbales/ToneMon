class Canvas {
    constructor(id) {
        this.elem = document.getElementById(id);
        this.ctx = this.elem.getContext('2d');
        // this.ctx.translate(0.5, 0.5);

        this.objs = [];

        // Event capturing
        var capture = ['mouseup', 'mousedown', 'mousemove'];
        for (var eventName of capture) this.elem.addEventListener(eventName, this[eventName + 'Handler'].bind(this));

        // Window mouseup
        window.addEventListener('mouseup', this.mouseupHandler.bind(this));

        // Start draw loop
        setInterval(this.redraw.bind(this), 1000 / 24);
    }

    width() {
        return this.elem.width;
    }

    height() {
        return this.elem.height;
    }

    mousedownHandler(e) {
        this.objs.map(o => o.mousedownHandler.bind(o, e)());
    }

    mouseupHandler(e) {
        this.objs.map(o => o.mouseupHandler.bind(o, e)());
    }

    mousemoveHandler(e) {
        this.objs.map(o => o.mousemoveHandler.bind(o, e)());
    }

    redraw() {
        this.ctx.clearRect(0, 0, this.elem.width, this.elem.height);
        this.objs.map(e => e.draw.bind(e)());
    }
}

export default Canvas;
