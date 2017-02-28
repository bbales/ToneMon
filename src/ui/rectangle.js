import UIObj from './uiobj'

export default class Rectangle extends UIObj {
    constructor(canvas, width, height, radius = 5, fill = false) {
        super(canvas)

        // Set defaults
        this._width = width
        this._height = height
        this._radius = radius
        this._lineWidth = 2
        this._color = '#fff'
        this._fill = fill
    }

    draw() {
        this.ctx.lineWidth = this._lineWidth
        this.ctx.strokeStyle = this._color
        this.ctx.fillStyle = this._color
        this.ctx.roundRect(this._x, this._y, this._width, this._height)
        this.ctx[this._fill ? 'fill' : 'stroke']()
    }

    setColor(color) {
        this._color = color
        return this
    }
}
