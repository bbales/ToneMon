export default class Calc {
    // Degrees to Radians
    static d2r(angle) {
        return angle * (Math.PI / 180)
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
