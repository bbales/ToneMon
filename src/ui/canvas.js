import Calc from '../util/calc'

export default class Canvas {
    constructor(id) {
        this.elem = document.querySelector('canvas')
        this.ctx = this.elem.getContext('2d')
        this.ctx.translate(0.5, 0.5)

        this.objs = []

        // Event capturing
        var capture = ['mouseup', 'mousedown', 'mousemove']
        for (var eventName of capture) this.elem.addEventListener(eventName, this[eventName + 'Handler'].bind(this))

        // Window mouseup
        window.addEventListener('mouseup', e => this.mouseupHandler(e))

        // Start draw loop
        setInterval(() => this.redraw(), 1000 / 24)

        // Set to default size
        this.setSize(800, 600)
    }

    width() {
        return this.elem.width
    }

    height() {
        return this.elem.height
    }

    setSize(width, height) {
        this.elem.height = height
        this.elem.width = width
    }

    mousedownHandler(e) {
        this.objs.map(o => o.mousedownHandler(e))
    }

    mouseupHandler(e) {
        this.objs.map(o => o.mouseupHandler(e))
    }

    mousemoveHandler(e) {
        this.objs.map(o => o.mousemoveHandler(e))
    }

    redraw() {
        this.ctx.clearRect(0, 0, this.elem.width, this.elem.height)
        this.objs.map(e => e.draw())
    }
}
