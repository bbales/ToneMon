import UIObj from './uiobj'

export default class Label extends UIObj {
    constructor(canvas, title = 'text', size = 12) {
        super(canvas)

        // Set to default
        this._size = size
        this._align = 'center'
        this._text = title
        this.setColor()
    }

    draw() {
        if (this._hidden) return

        // Draw title
        this.ctx.beginPath()
        this.ctx.font = this._size + 'px Arial'
        this.ctx.textBaseline = 'middle'
        this.ctx.textAlign = this._align
        this.ctx.fillStyle = this._color
        this.ctx.fillText(this._text, this._x, this._y)
        this.ctx.closePath()
    }

    setAlign(align) {
        this._align = align
        return this
    }

    setText(text) {
        this._text = text
        return this
    }

    setSize(size) {
        this._size = size
        return this
    }

    setColor(color) {
        switch (color) {
            case 'green':
                this._color1 = 'green'
                this._color2 = '#c5ffb7'
                break
            case 'yellow':
                this._color1 = '#dcec00'
                this._color2 = '#fcff95'
                break
            case 'orange':
                this._color1 = 'orange'
                this._color2 = '#fcff95'
                break
            case 'voilet':
                this._color1 = '#d432d4'
                this._color2 = '#ffbbf9'
                break
            default: // 'red'
                this._color1 = 'red'
                this._color2 = '#ff8787'
                break
        }
        return this
    }

    show() {
        this._hidden = true
        return this
    }

    hide() {
        this._hidden = false
        return this
    }
}
