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
        this._changeFn = _.noop

        this._options = {
            on: {
                text: 'On',
                value: 2
            },
            mid: {
                text: 'Mid',
                value: 1
            },
            off: {
                text: 'Off',
                value: 0
            }
        }
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

        // Draw handle
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

        // Draw options
        this.ctx.fillStyle = 'white'
        this.ctx.textAlign = 'start'
        this.ctx.font = "8px Arial";

        // On
        this.ctx.fillStyle = this._position == 2 ? '#83d8ff' : 'white'
        this.ctx.shadowBlur = this._position == 2 ? 10 : 0
        this.ctx.fillText(this._options.on.text, this._x + this._width + 10, this._y)
        this.ctx.closePath()

        // Mid
        if (this._numPositions === 3) {
            this.ctx.fillStyle = this._position == 1 ? '#83d8ff' : 'white'
            this.ctx.shadowBlur = this._position == 1 ? 10 : 0
            this.ctx.fillText(this._options.mid.text, this._x + this._width + 10, this._y + this._height / 2 + 2)
            this.ctx.closePath()
        }

        // Off
        this.ctx.fillStyle = this._position == 0 ? '#83d8ff' : 'white'
        this.ctx.shadowBlur = this._position == 0 ? 10 : 0
        this.ctx.fillText(this._options.off.text, this._x + this._width + 10, this._y + this._height + 5)
        this.ctx.closePath()

        // Draw title
        this.ctx.font = "12px Arial";
        this.ctx.fillStyle = 'white'
        this.ctx.shadowBlur = 0
        this.ctx.textAlign = 'center'
        this.ctx.fillText(this._title, this._x + this._width / 2, this._y + 48)
        this.ctx.closePath()
    }

    mousemoveHandler(e) {
        // Dont do anything if the switch isnt active
        if (!this._active) return

        let oldPosition = this._position;

        // Set handle position
        if (this._numPositions === 3) {
            if (e.ry < this._y + this._height / 3) this._position = 2
            else if (e.ry < this._y + 2 * this._height / 3) this._position = 1
            else this._position = 0
        } else {
            if (e.ry < this._y + this._height / 2) this._position = 2
            else this._position = 0
        }

        if (oldPosition !== this._position) this._changeFn(this.value);
    }

    mouseupHandler(e) {
        this.mousemoveHandler(e)
        this._active = false
    }

    mousedownHandler(e) {
        if (!e || this.hitBox(e.rx, e.ry)) this._active = true
    }

    change(fn) {
        this._changeFn = fn
        return this;
    }

    get value() {
        switch (this._position) {
            case 0:
                return this._options.off.value
            case 1:
                return this._options.mid.value
            case 2:
                return this._options.on.value;
        }
    }
}
