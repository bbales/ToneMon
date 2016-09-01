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
v1.setWave('sine').setFreqEnvelope('tween', 0.001);
keys.attach(v1);

let k1 = new Knob(canvas, 'OSC1 Shape');
k1.setPos(200, 150).setRadius(30).setMinMax(30, 200).setSnaps([{
    text: 'SQU',
    value: 'square'
}, {
    text: 'SIN',
    default: true,
    value: 'sine'
}, {
    text: 'TRI',
    value: 'triangle'
}, {
    text: 'SAW',
    value: 'sawtooth'
}]).change(function(v) {
    v1.setWave(v);
});


var actx2 = new window.AudioContext();
var v2 = new Voice(actx2)
v2.setWave('sawtooth').setFreqEnvelope('tween', 0.1).setOctave(2);
// keys.attach(v2);
