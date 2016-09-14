export default class Calc {
    // Degrees to Radians
    static d2r(angle) {
        return angle * (Math.PI / 180)
    }

    // More comprehensible angle to weird atan2 angle (ugh)
    static nd2r(angle) {
        return this.d2r(((angle > 180) ? angle - 360 : angle) + 90)
    }

    // Radians to Degrees
    static r2d(angle) {
        return angle * (180 / Math.PI)
    }

    // Get hypotneuse
    static hyp(opp, adj) {
        return Math.sqrt(opp * opp + adj * adj)
    }
}

Object.defineProperty(MouseEvent.prototype, 'rx', {
    'get': function() {
        return this.pageX - this.target.offsetLeft - this.target.offsetParent.offsetLeft;
    }
});

Object.defineProperty(MouseEvent.prototype, 'ry', {
    'get': function() {
        return this.pageY - this.target.offsetTop - this.target.offsetParent.offsetTop;
    }
});

CanvasRenderingContext2D.prototype.drawRoundRect = function drawRoundRect(x, y, width, height, radius = 5) {
    this.beginPath();
    this.moveTo(x + radius, y);
    this.lineTo(x + width - radius, y);
    this.quadraticCurveTo(x + width, y, x + width, y + radius);
    this.lineTo(x + width, y + height - radius);
    this.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    this.lineTo(x + radius, y + height);
    this.quadraticCurveTo(x, y + height, x, y + height - radius);
    this.lineTo(x, y + radius);
    this.quadraticCurveTo(x, y, x + radius, y);
    this.closePath();
}
