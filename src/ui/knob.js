import UIObj from './uiobj'
import Calc from '../util/calc'

export default class Knob extends UIObj {
    constructor(canvas, title) {
        super(canvas)
        this.otype = 'knob'

        this._x = 0
        this._y = 0
        this._angle = 270
        this._radius = 50
        this._lineWidth = 2

        this._max = 360
        this._min = 0
        this._changeFn = _.noop

        this._title = title || ''
    }

    init() {
        this.mousedownHandler()
        this.mousemoveHandler()
        this.mouseupHandler()
    }

    draw() {
        // Draw Circle
        this.ctx.beginPath()
        this.ctx.arc(this._x, this._y, this._radius, 0, 2 * Math.PI)
        this.ctx.lineWidth = this._lineWidth
        this.ctx.strokeStyle = '#FFF'
        this.ctx.stroke()
        this.ctx.closePath()

        // Draw indicator
        this.ctx.beginPath()
        this.ctx.moveTo(this._x, this._y)

        var rAngle = Calc.d2r(this._angle + 90)
        var rise = this._y + this._radius * Math.sin(rAngle)
        var run = this._x + this._radius * Math.cos(rAngle)

        this.ctx.lineTo(run, rise)
        this.ctx.stroke()
        this.ctx.closePath()

        // Draw text
        if (_.isArray(this._snaps)) {
            this.ctx.font = '12px Arial'
            this.ctx.textAlign = 'center'
            this.ctx.shadowColor = '#83d8ff';
            for (var s of this._snaps) {
                this.ctx.fillStyle = s.active ? '#83d8ff' : 'white'
                this.ctx.shadowBlur = s.active ? 10 : 0
                var safeAngle = Calc.d2r(((s.angle > 180) ? s.angle - 360 : s.angle) + 90)
                this.ctx.fillText(s.text, this._x + (16 + this._radius) * Math.cos(safeAngle), this._y + (16 + this._radius) * Math.sin(safeAngle))
            }
            this.ctx.shadowBlur = 0
        } else {

            // If not a snapping knob, show tracer
            let safeMin = Calc.d2r(((this._min > 180) ? this._min - 360 : this._min) + 90)
            let safeCurrent = Calc.d2r(((this._angle > 180) ? this._angle - 360 : this._angle) + 90)
            let safeMax = Calc.d2r(((this._max > 180) ? this._max - 360 : this._max) + 90)
            this.ctx.lineWidth = this._lineWidth

            this.ctx.beginPath()
            this.ctx.shadowBlur = 10
            this.ctx.shadowColor = '#83d8ff';
            this.ctx.arc(this._x, this._y, this._radius + 5, safeMin, safeCurrent)
            this.ctx.strokeStyle = '#83d8ff'
            this.ctx.stroke()
            this.ctx.closePath()
            this.ctx.shadowBlur = 0

            this.ctx.beginPath()
            this.ctx.arc(this._x, this._y, this._radius + 5, safeCurrent, safeMax)
            this.ctx.strokeStyle = '#19344c'
            this.ctx.stroke()
        }

        // Draw title
        this.ctx.fillStyle = 'white'
        this.ctx.fillText(this._title, this._x, this._y + this._radius * 2.2)
        this.ctx.closePath()
    }

    hitBox(x, y) {
        // Check if the coord is within the _radius of the Circle
        var deltax = Math.abs(this._x - x)
        var deltay = Math.abs(this._y - y)

        // Calculate hypotneuse
        return Calc.hyp(deltax, deltay) <= (this._radius + this._lineWidth)
    }

    setSnaps(arr, showText) {
        if (!_.isArray(arr)) throw ('setSnaps argument must be an array')
        this._snapsShowText = showText || true
        this._snaps = arr

        var self = this
        if (!this._snaps[0].angle) this._snaps.forEach(function(s, i) {
            s.angle = self._min + i * (self._max - self._min) / self._snaps.length
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

    change(fn) {
        this._changeFn = fn
        return this;
    }

    // Handlers

    mousemoveHandler(e) {
        if (!this.twistin) return
        if (e) this._angle = -1 * Calc.r2d(Math.atan2(e.pageX - this._x, e.pageY - this._y))
        else {
            if (this._snaps) {
                // Check if a default has been set
                var dflt = _.find(this._snaps, {
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
            this._changeFn(_.clamp((this.angle - this._min) / (this._max - this._min), 0, 1));
        }

        // Snap angle
        if (this._min && this.angle < this._min) this.angle = this._min
        else if (this._max && this.angle > this._max) this.angle = this._max
    }

    mouseupHandler(e) {
        this.twistin = false
    }

    mousedownHandler(e) {
        if (!e || this.hitBox(e.pageX, e.pageY)) this.twistin = true
    }

    // Property for a more understandable angle

    get angle() {
        return (this._angle < 0) ? 360 + this._angle : this._angle
    }

    set angle(a) {
        this._angle = (a > 180) ? a - 360 : a
    }
}
