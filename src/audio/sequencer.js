import Tool from '../util/tool'
import Notes from './notes'

export default class Sequencer {
    constructor(actx, name) {
        this.id = Tool.id()
        this._name = name;

        // AudioContext
        this.ctx = actx

        // Voice array
        this_.voices = []

        this._currentStep = 0
        this._length = 8
    }

    // Connect a voice
    connect(voice) {
        this._voices.push(voice)
    }

    // Set bpm
    setBPM(bpm) {

    }

    // Set sequencer length
    setLength(len) {
        this._length = len
    }

    // Start sequencer
    play() {

    }

    // Stop sequencer
    stop() {

    }

    // Write a note at a step
    writeNote(note, step) {

    }

    // Set the current sequence
    setSequence(num) {
        if (!_.isObject(this._seq[num])) this._seq[num] = new Sequence()
    }

    // Get the current sequence
    getSequence() {

    }
}

class Sequence {
    constructor(len) {
        this._length = len
        this._data = [];

        // Fill with empty notes
        for (let i = 0; i < this._length; i++) this._data.push(false);
    }

    setNote(note, step) {
        this._data[step] = note
    }

    clearNote(step) {
        this._data[step] = false
    }
}
