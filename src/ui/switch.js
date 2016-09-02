import UIObj from './uiobj'

export default class Switch extends UIObj {
    constructor(canvas, title) {
        super(canvas)
        this.otype = 'switch'

    }

    draw() {

    }

    on() {
        this._on = true
        return this;
    }

    off() {
        this._on = false
        return this;
    }
}
