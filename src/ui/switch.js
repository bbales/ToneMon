import UIObj from './uiobj'
import Calc from '../util/calc'

export default class Switch extends UIObj {
    constructor(canvas, title, numPositions) {
        super(canvas)

        this._numPositions = numPositions
        this._title = title

        this._width = 40
        this._height = 40
    }

    draw() {
        // Draw bg
        this.ctx.lineWidth = 6
        this.ctx.shadowColor = 'green'
        this.ctx.fillStyle = 'green'
        this.ctx.strokeStyle = "white"
        this.ctx.shadowBlur = -15
        this.ctx.shadowOffsetX = 0
        this.ctx.shadowOffsetY = 0
        this.ctx.roundRect(this._x, this._y, this._width, this._height, 5)
        this.ctx.stroke()

        if (this._numPositions == 3) {
            // Three position

        } else {
            // Two position

        }
    }

    mousemoveHandler(e) {
        // Dont do anything if the switch isnt active
        if (!this._active) return

        // Set handle position
        if (this._numPositions === 3) {
            if (e.ry < this._y + this._width / 3) this._position = 2
            else if (e.ry < this._y + 2 * this._width / 3) this._position = 1
            else this._position = 0
        } else {
            if (e.ry < this._y + this._width / 2) this._position = 1
            else this._position = 0
        }
    }

    mouseupHandler(e) {
        this._active = false
    }

    mousedownHandler(e) {
        if (!e || this.hitBox(e.rx, e.ry)) this._active = true
    }
}
