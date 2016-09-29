import UIObj from './uiobj'
import Label from './label'
import Calc from '../util/calc'

export default class Switch extends UIObj {
    constructor(canvas, title, options, numPositions = 2, default_position = 2) {
        super(canvas)

        this._numPositions = numPositions
        this._title = title
        this._width = 15
        this._height = 30
        this._handleHeight = this._height / this._numPositions
        this._position = default_position

        this._options = _.isObject(options) ? options : {
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

        // Title label
        this.titleLabel = new Label(canvas).setOffset(this, this._width / 2, 59).dynamicText(() => {
            return this._title
        })

        // On Label
        this.onLabel = new Label(canvas).setSize(8).setOffset(this, this._width + 10, this._y).dynamicText(() => {
            return this._options.on.text
        })

        // Middle Label
        this.middleLabel = new Label(canvas).setSize(8).setOffset(this, this._width + 10, this._height / 2 + 2).dynamicText(() => {
            return this._options.mid.text
        })

        // Off Label
        this.offLabel = new Label(canvas).setSize(8).setOffset(this, this._width + 10, this._height + 5).dynamicText(() => {
            return this._options.off.text
        })
    }

    draw() {
        // Draw bg
        this.ctx.lineWidth = 2
        this.ctx.fillStyle = 'white'
        this.ctx.strokeStyle = 'white'
        this.ctx.roundRect(this._x, this._y, this._width, this._height, 3)
        this.ctx.stroke()

        // Draw handle
        let handleY = this._y
        if (this._position !== 2) handleY += this._position ? this._handleHeight : this._height - this._handleHeight
        this.ctx.roundRect(this._x, handleY, this._width, this._handleHeight, 3)
        this.ctx.fill()

        // Draw options
        this.ctx.textAlign = 'start'
        this.ctx.font = '8px Arial'

        // On
        this.onLabel.setColor(this._position == 2 ? '#83d8ff' : '#fff').setBlur(this._position == 2 ? 10 : 0)

        // // Mid
        if (this._numPositions === 3) {
            this.middleLabel.show().setColor(this._position == 1 ? '#83d8ff' : '#fff').setBlur(this._position == 1 ? 10 : 0)
        } else {
            this.middleLabel.hide()
        }

        // Off
        this.offLabel.setColor(this._position == 0 ? '#83d8ff' : '#fff').setBlur(this._position == 0 ? 10 : 0)
    }

    mousemoveHandler(e) {
        // Dont do anything if the switch isnt active
        if (!this._active) return

        // Keep track of old position for monitoring changes
        let oldPosition = this._position

        // Set handle position
        if (e.ry < this._y + this._height / this._numPositions) this._position = 2
        else if (this._numPositions == 3 && e.ry < this._y + 2 * this._height / 3) this._position = 1
        else this._position = 0

        if (oldPosition !== this._position) this._changeFn(this.value)
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
        this._changeFn(this.value)
        return this
    }

    setDefault(val) {
        this._position = 0
        return this
    }

    get value() {
        switch (this._position) {
            case 0:
                return this._options.off.value
            case 1:
                return this._options.mid.value
            case 2:
                return this._options.on.value
        }
    }
}
