import UIObj from './uiobj'
import Calc from '../util/calc'

export default class Switch extends UIObj {
    constructor(canvas, title, numPositions = 3) {
        super(canvas)

        this._numPositions = numPositions
        this._title = title

        this._width = 15
        this._height = 30

        this._handleHeight = this._height / this._numPositions

        this._position = 0;
    }

    draw() {
        // Draw bg
        this.ctx.lineWidth = 2
        this.ctx.shadowColor = 'green'
        this.ctx.fillStyle = 'white'
        this.ctx.strokeStyle = "white"
        this.ctx.shadowBlur = -15
        this.ctx.shadowOffsetX = 0
        this.ctx.shadowOffsetY = 0
        this.ctx.roundRect(this._x, this._y, this._width, this._height, 3)
        this.ctx.stroke()

        switch (this._position) {
            case 0:
                this.ctx.roundRect(this._x, this._y + this._height - this._handleHeight, this._width, this._handleHeight, 3)
                this.ctx.fill()
                break
            case 1:
                this.ctx.roundRect(this._x, this._y + this._handleHeight, this._width, this._handleHeight, 3)
                this.ctx.fill()
                break
            case 2:
                this.ctx.roundRect(this._x, this._y, this._width, this._handleHeight, 3)
                this.ctx.fill()
                break
        }
    }

    mousemoveHandler(e) {
        // Dont do anything if the switch isnt active
        if (!this._active) return

        // Set handle position
        if (this._numPositions === 3) {
            if (e.ry < this._y + this._height / 3) this._position = 2
            else if (e.ry < this._y + 2 * this._height / 3) this._position = 1
            else this._position = 0
        } else {
            if (e.ry < this._y + this._height / 2) this._position = 2
            else this._position = 0
        }
    }

    mouseupHandler(e) {
        this.mousemoveHandler(e)
        this._active = false
    }

    mousedownHandler(e) {
        if (!e || this.hitBox(e.rx, e.ry)) this._active = true
    }
}
