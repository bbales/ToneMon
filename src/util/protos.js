// Canvas offset coordinates
Object.defineProperty(MouseEvent.prototype, 'rx', {
    get: function() {
        return this.pageX - this.target.offsetLeft - this.target.offsetParent.offsetLeft
    }
})
Object.defineProperty(MouseEvent.prototype, 'ry', {
    get: function() {
        return this.pageY - this.target.offsetTop - this.target.offsetParent.offsetTop
    }
})

// Add rounded rectangle functionality to canvas
CanvasRenderingContext2D.prototype.roundRect = function(x, y, width, height, radius = 5) {
    this.beginPath()
    this.moveTo(x + radius, y)
    this.lineTo(x + width - radius, y)
    this.quadraticCurveTo(x + width, y, x + width, y + radius)
    this.lineTo(x + width, y + height - radius)
    this.quadraticCurveTo(x + width, y + height, x + width - radius, y + height)
    this.lineTo(x + radius, y + height)
    this.quadraticCurveTo(x, y + height, x, y + height - radius)
    this.lineTo(x, y + radius)
    this.quadraticCurveTo(x, y, x + radius, y)
    this.closePath()
}
