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
import Rectangle from './ui/rectangle'

import Notes from './audio/notes'

// UI
var canvas = new Canvas('canvas')

var title_label = new Label(canvas, 'ⓉoneⓂon', 27).setPos(810, 50).setAlign('right').setFont('Courier New')
var title_label = new Label(canvas, 'V0.1', 10).setPos(810, 70).setAlign('right')

// Audio
var actx = new window.AudioContext()

// Synth voice(s)
var v1 = new Voice(actx, 'OSC1').setWave('sine').setFreqEnvelope('tween', 0.001).setOctave(1)
var v2 = new Voice(actx, 'OSC2').setWave('square').setFreqEnvelope('tween', 0.001).setOctave(3)

// Create the oscilloscope
let oScope = new Oscilloscope(canvas, actx, [v1, v2]).setPos(610, 110)

// Keys
// var keys = new Keys(canvas).setPos(200, 500).attach(v2).attach(v1)

// OSC1
let osc1_x = 80
let osc1_y = 45

var title_label = new Label(canvas, 'OSC 1', 14).setPos(osc1_x, osc1_y).setAlign('left').setColor('#bfbfbf')
let osc1_rect = new Rectangle(canvas, 490, 105, 5).setPos(osc1_x, osc1_y + 12).setColor('#403c3c')
var osc1_shape = new Knobs.ShapeKnob(canvas, v1).setPos(osc1_x + 140, osc1_y + 57)
var osc1_atk = new Knobs.AttackKnob(canvas, v1).setPos(osc1_x + 240, osc1_y + 57)
var osc1_rel = new Knobs.ReleaseKnob(canvas, v1).setPos(osc1_x + 340, osc1_y + 57)
var osc1_octave = new Knobs.OctaveKnob(canvas, v1).setPos(osc1_x + 440, osc1_y + 57)
var osc1_enable = new Switch(canvas, 'OSC1 Enable').setPos(osc1_x + 40, osc1_y + 42).change(v => {
    v1.enable(v)
    let knobs = [osc1_shape, osc1_atk, osc1_rel, osc1_octave]
    knobs.map(o => o[v ? 'enable' : 'disable']())
})

// OSC2

let osc2_x = 80
let osc2_y = 185

var title_label = new Label(canvas, 'OSC 2', 14).setPos(osc2_x, osc2_y).setAlign('left').setColor('#bfbfbf')
let osc2_rect = new Rectangle(canvas, 490, 105, 5).setPos(osc2_x, osc2_y + 12).setColor('#403c3c')
var osc2_shape = new Knobs.ShapeKnob(canvas, v2).setPos(osc2_x + 140, osc2_y + 57)
var osc2_atk = new Knobs.AttackKnob(canvas, v2).setPos(osc2_x + 240, osc2_y + 57)
var osc2_rel = new Knobs.ReleaseKnob(canvas, v2).setPos(osc2_x + 340, osc2_y + 57)
var osc2_octave = new Knobs.OctaveKnob(canvas, v2).setPos(osc2_x + 440, osc2_y + 57)
var osc2_enable = new Switch(canvas, 'OSC2 Enable').setPos(osc2_x + 40, osc2_y + 42).change(v => {
    v2.enable(v)
    let knobs = [osc2_shape, osc2_atk, osc2_rel, osc2_octave]
    knobs.map(o => o[v ? 'enable' : 'disable']())
})

// Sequencer
var sequencer = new Sequencer().connect(v1).connect(v2).setBPM(200)

// Default notes
sequencer.seq.setNote(0, Notes.note('a5'))
sequencer.seq.setNote(1, Notes.note('b4'))
sequencer.seq.setNote(2, Notes.note('c6'))
sequencer.seq.setNote(3, Notes.note('d5'))
sequencer.seq.setNote(4, Notes.note('e4'))
sequencer.seq.setNote(5, Notes.note('f6'))
sequencer.seq.setNote(6, Notes.note('g5'))
sequencer.seq.setNote(7, Notes.note('a4'))

// Sequencer enable
var seq_enable = new Switch(canvas, 'Seq Enable').setPos(100, 400).setDefault(0).change(v => sequencer[v ? 'play' : 'stop']())
var seq_bpm = new Knob(canvas, 'BPM').setPos(107, 500).setRadius(10).setTitleY(22).setMinMax(30, 330).change(v => sequencer.setBPM(v * 300))

// LEDs
var colors = ['red', 'green', 'yellow', 'violet', 'orange'];
_.times(8, (i) => {
    var led1 = new Led(canvas).setPos(200 + 65 * i, 410).setColor('red')
    var volume_knob = new Knobs.SequencerVolumeKnob(canvas, sequencer, i).setPos(200 + 65 * i, 550)
    var note_knob = new Knobs.SequencerNoteKnob(canvas, sequencer, i, 5).setPos(200 + 65 * i, 475)

    // Assign check function
    led1.check(() => {
        return sequencer._currentStep == i
    })
})
