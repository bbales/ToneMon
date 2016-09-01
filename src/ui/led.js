import UIObj from './uiobj'

export default class Led extends UIObj {
    constructor(canvas, title) {
        super(canvas)

        this._color1 = '#d432d4';
        this._color2 = '#ffbbf9';

        this._colorOff1 = '#212121';
        this._colorOff2 = '#5a5a5a';
    }

    draw() {
        // Setup
        this.ctx.lineWidth = 2
        this.ctx.strokeStyle = 'black'

        // Draw outer circle
        this.ctx.beginPath();
        this.ctx.arc(this._x, this._y, 10, 0, 2 * Math.PI);
        this.ctx.stroke();
        this.ctx.closePath();

        // Draw inner circle
        this.ctx.shadowOffsetX = 0
        this.ctx.shadowOffsetY = 0
        this.ctx.shadowBlur = 15
        var grd = this.ctx.createRadialGradient(this._x, this._y, 2, this._x + 2, this._y + 2, 8);
        if (!this._on) {
            grd.addColorStop(1, this._color1);
            grd.addColorStop(0, this._color2);
            this.ctx.shadowColor = this._color1;
        } else {
            grd.addColorStop(1, this._colorOff1);
            grd.addColorStop(0, this._colorOff2);
            this.ctx.shadowColor = this._colorOff2;
        }
        this.ctx.fillStyle = grd;
        this.ctx.beginPath();
        this.ctx.arc(this._x, this._y, 8, 0, 2 * Math.PI);
        this.ctx.fill();
        this.ctx.closePath();

        this.ctx.shadowBlur = 0;

    }

    setColor(color) {
        switch (color) {
            case 'red':
                this._color1 = 'red';
                this._color2 = '#ff8787';
                break;
            case 'green':
                this._color1 = 'green';
                this._color2 = '#c5ffb7';
                break;
            case 'yellow':
                this._color1 = '#dcec00';
                this._color2 = '#fcff95';
                break;
            case 'orange':
                this._color1 = 'orange';
                this._color2 = '#fcff95';
                break;
            case 'voilet':
                this._color1 = '#d432d4';
                this._color2 = '#ffbbf9';
                break;
        }
        return this;
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
