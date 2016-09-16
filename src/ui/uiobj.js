import Tool from '../util/tool'

export default class UIObj {
    constructor(canvas) {
        this.id = Tool.id()
        this.canvas = canvas
        this.ctx = canvas.ctx
        this.canvas.objs.push(this)

        this._changeFn = _.noop
        this._x = 0
        this._y = 0
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

    // Default hitbox is a rectangle

    hitBox(x, y) {
        return x > this._x && x < (this._x + this._width) && y > this._y && y < (this._y + this._height)
    }
}
