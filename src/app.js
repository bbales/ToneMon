import _ from 'lodash'
import './styles/main.scss'; // import compiled scss file into webpack bundle
import Calc from './util/calc'
import Knob from './ui/knob'
import Canvas from './ui/canvas'
import Voice from './audio/voice'
import Keys from './ui/keys'
import Led from './ui/led'
import Switch from './ui/switch'
import Oscilloscope from './ui/oscilloscope';

// UI
var canvas = new Canvas('canvas')
var keys = new Keys(canvas)

// Audio
var actx = new window.AudioContext()

// Synth voice(s)
var v1 = new Voice(actx).setWave('sine').setFreqEnvelope('tween', 0.001).setOctave(2)

// Create the oscilloscope
const voices = [v1]
let oScope = new Oscilloscope(canvas, actx, voices).setPos(500, 100)

// Keys
keys.attach(v1)

// Knobs
var k1 = new Knob(canvas, 'OSC1 Shape').setPos(200, 150).setRadius(20).setMinMax(30, 200).setSnaps([{
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
}]).change(value => v1.setWave(value))

var osc1_atk = new Knob(canvas, 'OSC1 Attack').setPos(300, 150).setRadius(20).setMinMax(30, 330).change(p => {
    v1.setAttack(p * 4)
});

var osc1_rel = new Knob(canvas, 'OSC1 Release').setPos(400, 150).setRadius(20).setMinMax(30, 330).change(p => {
    v1.setRelease(p * 4)
});

// LEDs
var colors = ['red', 'green', 'yellow', 'violet', 'orange'];
for (var i = 0; i < 5; i++) {
    var led1 = new Led(canvas);
    led1.setPos(200 + 55 * i, 50);
    led1.setColor(colors[i])
}
