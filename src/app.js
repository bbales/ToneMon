// CSS
import './styles/main.scss'

// External deps
import _ from 'lodash'

// Local deps
import './util/protos'
import * as Knobs from './ui/knobs/knobs'
import Knob from './ui/knob'
import Canvas from './ui/canvas'
import Voice from './audio/voice'
import Sequencer from './audio/sequencer'
import Keys from './ui/keys'
import Led from './ui/led'
import Switch from './ui/switch'
import Oscilloscope from './ui/oscilloscope'

import Notes from './audio/notes'
Notes.all

// UI
var canvas = new Canvas('canvas')
    // var keys = new Keys(canvas).setPos(200, 500)

// Audio
var actx = new window.AudioContext()

// Synth voice(s)
var v1 = new Voice(actx, 'OSC1').setWave('sine').setFreqEnvelope('tween', 0.001).setOctave(1)
var v2 = new Voice(actx, 'OSC2').setWave('square').setFreqEnvelope('tween', 0.001).setOctave(3)

var sequencer = new Sequencer().connect(v1).connect(v2).setBPM(190).play()

sequencer.writeNote(Notes.note('c5'), 0)
sequencer.writeNote(Notes.note('c4'), 1)
sequencer.writeNote(Notes.note('c6'), 2)
sequencer.writeNote(Notes.note('cs5'), 3)
sequencer.writeNote(Notes.note('c4'), 4)
sequencer.writeNote(Notes.note('c6'), 5)
sequencer.writeNote(Notes.note('c5'), 6)
sequencer.writeNote(Notes.note('c4'), 7)

// Create the oscilloscope
let oScope = new Oscilloscope(canvas, actx, [v1, v2]).setPos(600, 150)

// Keys
// keys.attach(v1)
// keys.attach(v2)

// OSC1
var osc1_shape = new Knobs.ShapeKnob(canvas, v1).setPos(200, 150)
var osc1_atk = new Knobs.AttackKnob(canvas, v1).setPos(300, 150)
var osc1_rel = new Knobs.ReleaseKnob(canvas, v1).setPos(400, 150)
var osc1_octave = new Knobs.OctaveKnob(canvas, v1).setPos(500, 150)
var osc1_enable = new Switch(canvas, 'OSC1 Enable').setPos(100, 135).change(v => v1.enable(v))

// OSC2
var osc2_shape = new Knobs.ShapeKnob(canvas, v2).setPos(200, 250)
var osc2_atk = new Knobs.AttackKnob(canvas, v2).setPos(300, 250);
var osc2_rel = new Knobs.ReleaseKnob(canvas, v2).setPos(400, 250);
var osc2_octave = new Knobs.OctaveKnob(canvas, v2).setPos(500, 250)
var osc2_enable = new Switch(canvas, 'OSC2 Enable').setPos(100, 235).change(v => v2.enable(v))

// LEDs
var colors = ['red', 'green', 'yellow', 'violet', 'orange'];
for (var i = 0; i < 8; i++) {
    var led1 = new Led(canvas)
    var led1_octave = new Knob(canvas, 'Step' + (i + 1) + ' Note').setPos(200 + 65 * i, 450).setRadius(10)

    var led1_note = new Knob(canvas, 'Step' + (i + 1) + ' Octave').setPos(200 + 65 * i, 540).setRadius(10).change(value => {
        console.log(Notes.note(value))
        sequencer.writeNote(Notes.note(value, 5), index)
    }).setSnaps([{
        value: 'a',
        text: 'a'
    }, {
        value: 'as',
        text: 'a#'
    }, {
        value: 'b',
        text: 'b'
    }, {
        value: 'c',
        text: 'c'
    }, {
        value: 'cs',
        text: 'c#'
    }, {
        value: 'd',
        text: 'd'
    }, {
        value: 'ds',
        text: 'd#'
    }, {
        value: 'e',
        text: 'e'
    }, {
        value: 'f',
        text: 'f'
    }, {
        value: 'fs',
        text: 'f#'
    }, {
        value: 'g',
        text: 'g'
    }, {
        value: 'gs',
        text: 'g#'
    }])
    led1.setPos(200 + 65 * i, 400)
    led1.setColor(colors[i])

    // Sandbox index
    let index = i

    // Assign check function
    led1.check(() => {
        return sequencer._currentStep == index
    })
}
