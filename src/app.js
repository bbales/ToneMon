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

import Midi from './midi/index.js';
var midiBox = new Midi();

midiBox.boot();

// UI
var canvas = new Canvas('canvas')
    // var keys = new Keys(canvas).setPos(200, 500)

// Audio
var actx = new window.AudioContext()

// Synth voice(s)
var v1 = new Voice(actx, 'OSC1').setWave('sine').setFreqEnvelope('tween', 0.001).setOctave(1)
var v2 = new Voice(actx, 'OSC2').setWave('square').setFreqEnvelope('tween', 0.001).setOctave(3)

var sequencer = new Sequencer().connect(v1).connect(v2).setBPM(200).play()

sequencer.writeNote(Notes.note('a5'), 0)
sequencer.writeNote(Notes.note('b4'), 1)
sequencer.writeNote(Notes.note('c6'), 2)
sequencer.writeNote(Notes.note('d5'), 3)
sequencer.writeNote(Notes.note('e4'), 4)
sequencer.writeNote(Notes.note('f6'), 5)
sequencer.writeNote(Notes.note('g5'), 6)
sequencer.writeNote(Notes.note('a4'), 7)

// Create the oscilloscope
let oScope = new Oscilloscope(canvas, actx, [v1, v2]).setPos(600, 80)

// Keys
// keys.attach(v1)
// keys.attach(v2)

// OSC1
var osc1_shape = new Knobs.ShapeKnob(canvas, v1).setPos(200, 70)
var osc1_atk = new Knobs.AttackKnob(canvas, v1).setPos(300, 70)
var osc1_rel = new Knobs.ReleaseKnob(canvas, v1).setPos(400, 70)
var osc1_octave = new Knobs.OctaveKnob(canvas, v1).setPos(500, 70)
var osc1_enable = new Switch(canvas, 'OSC1 Enable').setPos(100, 55).change(v => v1.enable(v))

// OSC2
var osc2_shape = new Knobs.ShapeKnob(canvas, v2).setPos(200, 170)
var osc2_atk = new Knobs.AttackKnob(canvas, v2).setPos(300, 170);
var osc2_rel = new Knobs.ReleaseKnob(canvas, v2).setPos(400, 170);
var osc2_octave = new Knobs.OctaveKnob(canvas, v2).setPos(500, 170)
var osc2_enable = new Switch(canvas, 'OSC2 Enable').setPos(100, 155).change(v => v2.enable(v))

// Sequencer enable
var seq_enable = new Switch(canvas, 'Seq Enable').setPos(100, 300).change(v => {
    sequencer[v ? 'play' : 'stop']()
})
var seq_bpm = new Knob(canvas, 'BPM').setPos(200, 300).setRadius(10).setMinMax(30, 330).change(v => {
    sequencer.setBPM(v * 300)
})

// LEDs
var colors = ['red', 'green', 'yellow', 'violet', 'orange'];
for (var i = 0; i < 8; i++) {
    // Sandbox index
    let index = i
    var led1 = new Led(canvas)
        // var led1_octave = new Knob(canvas, 'Step' + (i + 1) + ' Note').setPos(200 + 65 * i, 450).setRadius(10)
    var led1_octave = new Knobs.SequencerNoteKnob(canvas, sequencer, index, 5).setPos(200 + 65 * i, 540)
    led1.setPos(200 + 65 * i, 400)
    led1.setColor(colors[i])


    // Assign check function
    led1.check(() => {
        return sequencer._currentStep == index
    })
}
