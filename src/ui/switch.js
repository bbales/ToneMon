import UIObj from './uiobj'

export default class Switch extends UIObj {
    constructor(canvas, title) {
        super(canvas)

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
