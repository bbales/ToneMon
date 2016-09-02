import _ from 'lodash'
import Calc from './util/calc'
import Knob from './ui/knob'
import Canvas from './ui/canvas'
import Voice from './audio/voice'
import Keys from './ui/keys'
import Led from './ui/led'
import Switch from './ui/switch'

// UI
var canvas = new Canvas('canvas')
var keys = new Keys(canvas)

// Audio
var actx = new window.AudioContext()
var v1 = new Voice(actx)
v1.setWave('sine').setFreqEnvelope('tween', 0.001).setOctave(2)
keys.attach(v1)

let k1 = new Knob(canvas, 'OSC1 Shape')
k1.setPos(200, 150).setRadius(30).setMinMax(30, 200).setSnaps([{
    text: '◻',
    value: 'square'
}, {
    text: '∿',
    value: 'sine'
}, {
    text: '△',
    default: true,
    value: 'triangle'
}, {
    text: '◺',
    value: 'sawtooth'
}]).change(v1.setWave.bind(v1));


// var actx2 = new window.AudioContext()
// var v2 = new Voice(actx2)
// v2.setWave('sawtooth').setFreqEnvelope('tween', 0.1).setOctave(2)
// keys.attach(v2)
//
// let k2 = new Knob(canvas, 'OSC2 Shape')
// k2.setPos(400, 150).setRadius(30).setMinMax(30, 200).setSnaps([{
//     text: '◻',
//     value: 'square'
// }, {
//     text: '∿',
//     default: true,
//     value: 'sine'
// }, {
//     text: '△',
//     value: 'triangle'
// }, {
//     text: '◺',
//     value: 'sawtooth'
// }]).change(v2.setWave.bind(v2));

var colors = ['red', 'green', 'yellow', 'violet', 'orange'];
for (var i = 0; i < 5; i++) {
    var led1 = new Led(canvas);
    led1.setPos(200 + 55 * i, 50);
    led1.setColor(colors[i])
}
