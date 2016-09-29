import UIObj from './uiobj'

export default class Label extends UIObj {
    constructor(canvas, title = 'text', size = 12) {
        super(canvas)

        // Set defaults
        this._blur = 0
        this._align = 'center'
        this._size = size
        this._text = title
        this.setColor()
    }

    draw() {
        // Dont draw if hidden
        if (this._hidden) return

        // Draw title
        this.ctx.beginPath()
        this.ctx.shadowBlur = this._blur
        this.ctx.font = this._size + 'px Arial'
        this.ctx.textBaseline = 'middle'
        this.ctx.textAlign = this._align
        this.ctx.fillStyle = this._color
        this.ctx.fillText(this._dynamicText ? this._dynamicText() : this._text, this._x, this._y)
        this.ctx.closePath()

        this.ctx.shadowBlur = 0
    }

    setAlign(align) {
        this._align = align
        return this
    }

    setBlur(blur) {
        this._blur = blur
        return this
    }

    setText(text) {
        this._text = text
        return this
    }

    dynamicText(fn) {
        this._dynamicText = fn
        return this
    }

    setSize(size) {
        this._size = size
        return this
    }

    setColor(color) {
        this._color = color
        return this
    }

    show() {
        this._hidden = false
        return this
    }

    hide() {
        this._hidden = true
        return this
    }
}
