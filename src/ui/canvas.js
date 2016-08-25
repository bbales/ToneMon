class Canvas {
    constructor(id) {
        this.elem = document.getElementById(id);
        this.ctx = this.elem.getContext('2d');

        this.objs = [];

        this.elem.addEventListener('click', this.clickHandler.bind(this));
    }

    width() {
        return this.elem.width;
    }

    height() {
        return this.elem.height;
    }

    clickHandler(e) {
        this.objs.map(function(o) {
            console.log(o.hitBox.bind(o, e.x, e.y)());
        })
    }
}

export default Canvas;