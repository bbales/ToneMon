import _ from 'lodash';
import Knob from './ui/knob';
import Canvas from './ui/canvas';

var canvas = new Canvas('canvas');

for (let i = 1; i < 5; i++) {
    let k = new Knob(canvas.ctx);
    k.x = i * canvas.width() / 5;
    k.y = i * canvas.height() / 5;
    k.angle = Math.random() * 360;
    canvas.objs.push(k);
}

canvas.objs.map(e => e.draw.bind(e)());
