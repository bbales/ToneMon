import Str from '../util/str'

export default class UIObj {
    constructor(canvas) {
        this.id = Str.id()
        this.canvas = canvas
        this.ctx = canvas.ctx
        this.canvas.objs.push(this)
    }

    remove() {
        _.remove(this.canvas.items, {
            'id': this.id
        })
    }

    mousemoveHandler() {}
    mouseupHandler() {}
    mousedownHandler() {}
}
