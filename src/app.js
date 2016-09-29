// CSS
import './styles/main.scss'

// External deps
import _ from 'lodash'

// Local deps
import './util/protos'
import * as Knobs from './ui/knobs/'
import Knob from './ui/knob'
import Canvas from './ui/canvas'
import Voice from './audio/voice'
import Sequencer from './audio/sequencer'
import Keys from './ui/keys'
import Led from './ui/led'
import Switch from './ui/switch'
import Oscilloscope from './ui/oscilloscope'
import Label from './ui/label'

import Notes from './audio/notes'

// UI
var canvas = new Canvas('canvas')
    // var keys = new Keys(canvas).setPos(200, 500)

var label1 = new Label(canvas, 'Hi', 10).setPos(200, 300)

// Audio
var actx = new window.AudioContext()

// Synth voice(s)
var v1 = new Voice(actx, 'OSC1').setWave('sine').setFreqEnvelope('tween', 0.001).setOctave(1)
var v2 = new Voice(actx, 'OSC2').setWave('square').setFreqEnvelope('tween', 0.001).setOctave(3)

var sequencer = new Sequencer().connect(v1).connect(v2).setBPM(200)

sequencer.seq.setNote(0, Notes.note('a5'))
sequencer.seq.setNote(1, Notes.note('b4'))
sequencer.seq.setNote(2, Notes.note('c6'))
sequencer.seq.setNote(3, Notes.note('d5'))
sequencer.seq.setNote(4, Notes.note('e4'))
sequencer.seq.setNote(5, Notes.note('f6'))
sequencer.seq.setNote(6, Notes.note('g5'))
sequencer.seq.setNote(7, Notes.note('a4'))

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
var seq_enable = new Switch(canvas, 'Seq Enable').setPos(100, 400).setDefault(0).change(v => sequencer[v ? 'play' : 'stop']())
var seq_bpm = new Knob(canvas, 'BPM').setPos(107, 500).setRadius(10).setMinMax(30, 330).change(v => sequencer.setBPM(v * 300))
seq_bpm._titleY = 22

// LEDs
var colors = ['red', 'green', 'yellow', 'violet', 'orange'];
_.times(8, (i) => {
    var led1 = new Led(canvas).setPos(200 + 65 * i, 410).setColor(colors[i])
    var volume_knob = new Knobs.SequencerVolumeKnob(canvas, sequencer, i).setPos(200 + 65 * i, 550)
    var note_knob = new Knobs.SequencerNoteKnob(canvas, sequencer, i, 5).setPos(200 + 65 * i, 475)

    // Assign check function
    led1.check(() => {
        return sequencer._currentStep == i
    })
})
