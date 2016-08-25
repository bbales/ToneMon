var _ = require('lodash')
var Knob = require('./ui/knob').Knob
var Canvas = require('./ui/canvas').Canvas

var canvas = new Canvas('canvas');

for (var i = 1; i < 5; i++) {
    var k = new Knob(canvas.ctx);
    k.x = i * canvas.width() / 5;
    k.y = i * canvas.height() / 5;
    k.angle = Math.random() * 360;
    canvas.objs.push(k);
}

canvas.objs.map(function(e) {
    e.draw.bind(e)();
});
