// Styles
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
import Oscillator from './ui/oscillator'
import Notes from './audio/notes'

// UI
let canvas = new Canvas('canvas')
new Label(canvas, 'ⓉoneⓂon', 27).setPos(810, 50).setAlign('right').setFont('Courier New')
new Label(canvas, 'V0.1', 10).setPos(810, 70).setAlign('right')

// Audio with webkit shim
let actx = new(window.AudioContext || window.webkitAudioContext)

// Master volume knob
let master_gain_node = actx.createGain()
master_gain_node.connect(actx.destination)
new Knob(canvas, 'Master').setPos(630, 245).setRadius(10).setTitleY(28).setMinMax(30, 330).change(v => master_gain_node.gain.value = v).setValue(0.5)

// Synth voice(s)
let v1 = new Voice(actx, 'OSC1').setWave('sine').setFreqEnvelope('tween', 0.001).setOctave(1)
v1.vca.connect(master_gain_node)
let v2 = new Voice(actx, 'OSC2').setWave('square').setFreqEnvelope('tween', 0.001).setOctave(3)
v2.vca.connect(master_gain_node)

// Create the oscilloscope
let oScope = new Oscilloscope(canvas, actx, [v1, v2]).setPos(610, 110)

// Keys
// let keys = new Keys(canvas).setPos(200, 500).attach(v2).attach(v1)

// OSC1
let osc1 = new Oscillator(canvas, v1, 'OSC1').setPos(80, 45)

// OSC2
let osc2 = new Oscillator(canvas, v2, 'OSC2').setPos(80, 185)

// Sequencer
let sequencer = new Sequencer().connect(v1).connect(v2).setBPM(200)

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
new Switch(canvas, 'Seq Enable').setPos(100, 400).setDefault(0).change(v => sequencer[v ? 'play' : 'stop']())
new Knob(canvas, 'BPM').setPos(680, 245).setRadius(10).setTitleY(28).setMinMax(30, 330).change(v => sequencer.setBPM(v * 300))

// LEDs
_.times(8, i => {
    new Knobs.SequencerVolumeKnob(canvas, sequencer, i).setPos(200 + 65 * i, 550)
    new Knobs.SequencerNoteKnob(canvas, sequencer, i, 5).setPos(200 + 65 * i, 475)
    new Led(canvas).setPos(200 + 65 * i, 410).setColor('red').check(() => sequencer._currentStep == i)
})
