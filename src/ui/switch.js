import UIObj from './uiobj'
import Calc from '../util/calc'

export default class Switch extends UIObj {
    constructor(canvas, title, numPositions) {
        super(canvas)

        this._numPositions = numPositions
        this._title = title
    }

    draw() {
        // Draw bg

        this.ctx.lineWidth = 6;
        this.ctx.shadowColor = 'black';
        this.ctx.strokeStyle = "rgba(0,0,0,1)";
        this.ctx.shadowBlur = 15;
        this.ctx.shadowOffsetX = 0;
        this.ctx.shadowOffsetY = 0;
        this.ctx.drawRoundRect(this.ctx, this._x, this._y, this._width, this._height, 10)
        this.ctx.stroke();

        if (this._numPositions == 3) {
            // Three position

        } else {
            // Two position

        }


    }
}
