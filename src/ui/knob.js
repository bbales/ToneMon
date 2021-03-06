import UIObj from './uiobj'
import Label from './label'
import Calc from '../util/calc'

export default class Knob extends UIObj {
    constructor(canvas, title = '') {
        super(canvas)

        this._title = title
        this._angle = 270
        this._radius = 50
        this._lineWidth = 2
        this._max = 360
        this._min = 0
        this._titleY = 44

        // Title label
        this.titleLabel = new Label(canvas).setColor('#fff').setOffset(this, 0, this._titleY).dynamicText(() => this._title)
    }

    init() {
        this.mousedownHandler()
        this.mousemoveHandler()
        this.mouseupHandler()
    }

    draw() {
        // Set up colors based on state
        let glowColor = this._disabled ? '#2d2d2d' : '#83d8ff'
        let inactiveGlowColor = this._disabled ? '#2d2d2d' : '#19344c'
        let whiteColor = this._disabled ? '#3c3c3c' : '#fff'

        this.titleLabel.setColor(whiteColor).setOffset(this, 0, this._titleY)

        // Draw Circle
        this.ctx.beginPath()
        this.ctx.arc(this._x, this._y, this._radius, 0, 2 * Math.PI)
        this.ctx.lineWidth = this._lineWidth
        this.ctx.strokeStyle = whiteColor
        this.ctx.stroke()
        this.ctx.closePath()

        // Draw indicator
        this.ctx.beginPath()
        this.ctx.moveTo(this._x, this._y)

        // Trig to calculate position
        let rAngle = Calc.d2r(this._angle + 90)
        let rise = this._y + this._radius * Math.sin(rAngle)
        let run = this._x + this._radius * Math.cos(rAngle)

        this.ctx.lineTo(run, rise)
        this.ctx.stroke()
        this.ctx.closePath()

        // Draw text
        if (_.isArray(this._snaps)) {
            this.ctx.font = this._radius < 20 ? '10px Arial' : '12px Arial'
            this.ctx.textBaseline = 'middle'
            this.ctx.textAlign = 'center'
            this.ctx.shadowColor = glowColor
            for (let s of this._snaps) {
                this.ctx.fillStyle = s.active ? glowColor : whiteColor
                this.ctx.shadowBlur = s.active ? 10 : 0
                let safeAngle = Calc.nd2r(s.angle)
                if (this._radius <= 15) {
                    this.ctx.fillText(s.text, this._x + (10 + this._radius) * Math.cos(safeAngle), this._y + (10 + this._radius) * Math.sin(safeAngle))
                } else {
                    this.ctx.fillText(s.text, this._x + (16 + this._radius) * Math.cos(safeAngle), this._y + (16 + this._radius) * Math.sin(safeAngle))
                }
            }
            this.ctx.shadowBlur = 0
        } else {

            // If not a snapping knob, show tracer
            let safeMin = Calc.nd2r(this._min)
            let safeCurrent = Calc.nd2r(this._angle)
            let safeMax = Calc.nd2r(this._max)
            this.ctx.lineWidth = this._lineWidth

            // Draw active arc
            this.ctx.beginPath()
            this.ctx.shadowBlur = 10
            this.ctx.shadowColor = glowColor
            this.ctx.arc(this._x, this._y, this._radius + 5, safeMin, safeCurrent)
            this.ctx.strokeStyle = glowColor
            this.ctx.stroke()
            this.ctx.closePath()
            this.ctx.shadowBlur = 0

            // Draw remaining inactive arc
            this.ctx.beginPath()
            this.ctx.arc(this._x, this._y, this._radius + 5, safeCurrent, safeMax)
            this.ctx.strokeStyle = inactiveGlowColor
            this.ctx.stroke()
        }
    }

    hitBox(x, y) {
        // Check if the coord is within the _radius of the Circle
        let deltax = Math.abs(this._x - x)
        let deltay = Math.abs(this._y - y)

        // Calculate hypotneuse
        return Calc.hyp(deltax, deltay) <= (this._radius + this._lineWidth)
    }

    setSnaps(arr, defaultValue, showText) {
        if (!_.isArray(arr)) throw ('setSnaps argument must be an array')
        this._snapsShowText = showText || true
        this._snaps = arr

        if (defaultValue) _.find(this._snaps, {
            value: defaultValue
        }).default = true

        if (!this._snaps[0].angle) this._snaps.forEach((s, i) => {
            s.angle = this._min + i * (this._max - this._min) / this._snaps.length
        })

        this.init()
        return this
    }

    setMinMax(min, max) {
        this._min = min
        this._max = max
        this.init()
        return this
    }

    setRadius(rad) {
        this._radius = rad
        return this
    }

    setTitleY(y) {
        this._titleY = y
        return this
    }

    change(fn) {
        this._changeFn = fn
        return this
    }

    disable() {
        this._disabled = true
        return this
    }

    enable() {
        this._disabled = false
        return this
    }

    // Handlers

    mousemoveHandler(e) {
        if (!this.twistin) return
        if (e) this._angle = -1 * Calc.r2d(Math.atan2(e.rx - this._x, e.ry - this._y))
        else {
            if (this._snaps) {
                // Check if a default has been set
                let dflt = _.find(this._snaps, {
                    default: true
                })

                // Set the default or first in snaps
                this._angle = (dflt) ? dflt.angle : this._snaps[0].angle
            } else this.angle = this._min
        }

        // If snaps
        if (_.isArray(this._snaps)) {
            var closest = this._snaps[0]
            for (var a of this._snaps) {
                if (Math.abs(a.angle - this.angle) < Math.abs(closest.angle - this.angle)) closest = a
            }

            // If this snap is not currently active
            if (!closest.active) {
                // Run its setter
                if (_.isFunction(closest.set)) closest.set()
                else this._changeFn(closest.value)

                // Reset all active states
                for (var b of this._snaps) b.active = false

                // Set this one to active
                closest.active = true
            }

            // Set the angle
            this.angle = closest.angle
            return
        } else {
            this._valuePercent = _.clamp((this.angle - this._min) / (this._max - this._min), 0, 1)
            this._changeFn(this._valuePercent)
        }

        // Snap angle
        if (this._min && this.angle < this._min) this.angle = this._min
        else if (this._max && this.angle > this._max) this.angle = this._max
    }

    mouseupHandler(e) {
        this.twistin = false
    }

    mousedownHandler(e) {
        if (!e || this.hitBox(e.rx, e.ry)) this.twistin = true
    }

    // Property for a more understandable angle

    get angle() {
        return (this._angle < 0) ? 360 + this._angle : this._angle
    }

    set angle(a) {
        this._angle = (a > 180) ? a - 360 : a
    }

    setValue(value) {
        this.angle = (this._max - this._min) * value + this._min
        this._changeFn(value)
    }
}
