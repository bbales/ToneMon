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

    // Calculate event relative x and y
    static rx(e) {
        return e.pageX - e.target.offsetLeft - e.target.offsetParent.offsetLeft;
    }

    static ry(e) {
        return e.pageY - e.target.offsetTop - e.target.offsetParent.offsetTop;
    }

    static addOffsetCoord(e) {
        e.rx = this.rx(e);
        e.ry = this.ry(e);
        return e;
    }
}
