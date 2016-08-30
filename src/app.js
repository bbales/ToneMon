import _ from 'lodash';
import Calc from './util/calc';
import Knob from './ui/knob';
import Canvas from './ui/canvas';
import Voice from './audio/voice';
import Keys from './ui/keys';

// UI
var canvas = new Canvas('canvas');
var keys = new Keys(canvas);

// Audio
var actx = new window.AudioContext();
var v1 = new Voice(actx)
v1.setWave('square').setFreqEnvelope('tween', 1);
keys.attach(v1);

var actx2 = new window.AudioContext();
var v2 = new Voice(actx2)
v2.setWave('sawtooth').setFreqEnvelope('tween', 0.1);
keys.attach(v2);

// Generate some knobs for twistin
for (let i = 1; i < 5; i++) {
    let k = new Knob(canvas);
    k.x = i * canvas.width() / 5;
    k.y = i * canvas.height() / 5;
    k.radius = 10 + 50 * Math.random();
    k.angle = 0;
}
