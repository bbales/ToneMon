import UIObj from './uiobj';
import Calc from '../util/calc';

class Knob extends UIObj {
    constructor(canvas) {
        super(canvas);

        this.otype = 'knob'
        this.x = 0;
        this.y = 0;
        this.angle = 270;
        this.radius = 50;
        this.lineWidth = 5;

        console.log('knob init')
    }

    draw() {
        // Draw Circle
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        this.ctx.lineWidth = this.lineWidth;
        this.ctx.strokeStyle = '#F00';
        this.ctx.stroke();

        // Draw indicator
        this.ctx.beginPath();
        this.ctx.moveTo(this.x, this.y);

        var rise = this.y + this.radius * Math.sin(Calc.d2r(this.angle + 90));
        var run = this.x + this.radius * Math.cos(Calc.d2r(this.angle + 90));

        this.ctx.lineTo(run, rise);
        this.ctx.stroke();
    }

    hitBox(x, y) {
        // Check if the coord is within the radius of the Circle
        var deltax = Math.abs(this.x - x);
        var deltay = Math.abs(this.y - y);

        // Calculate hypotneuse
        var hypot = Calc.hyp(deltax, deltay);

        return hypot <= this.radius + this.lineWidth;
    }

    mousemoveHandler(e) {
        if (this.twistin) this.angle = -1 * Calc.r2d(Math.atan2(e.pageX - this.x, e.pageY - this.y));
    }

    mouseupHandler(e) {
        this.twistin = false;
    }

    mousedownHandler(e) {
        if (this.hitBox(e.pageX, e.pageY)) this.twistin = true;
    }
}

export default Knob
