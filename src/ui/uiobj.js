import Tool from '../util/tool'

export default class UIObj {
    constructor(canvas) {
        this.id = Tool.id()
        this.canvas = canvas
        this.ctx = canvas.ctx
        this.canvas.objs.push(this)
    }

    remove() {
        _.remove(this.canvas.items, {
            'id': this.id
        })
    }

    // Empty handler methods

    mousemoveHandler() {}
    mouseupHandler() {}
    mousedownHandler() {}
    draw() {}

    setPos(x, y) {
        this._x = x
        this._y = y
        return this
    }
}
