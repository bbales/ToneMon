import Notes from './notes'

export default class Sequencer {
    constructor() {
        // Voice array
        this._voices = []
        this._seq = []
        this._currentStep = 0
        this._currentSequenceNum = 0
        this._length = 8
        this._bpm = 120
    }

    // Connect a voice
    connect(voice) {
        this._voices.push(voice)
        return this
    }

    // Set bpm
    setBPM(bpm) {
        this._bpm = bpm;
        this.stop()
        this.play()
        return this
    }

    // Set sequencer length
    setLength(len) {
        this._length = len
        return this
    }

    // Start sequencer
    play() {
        clearInterval(this._interval)
        this._interval = setInterval(() => this.advanceSeq(), 60 * 1000 / this._bpm)
        return this
    }

    // Stop sequencer
    stop() {
        clearInterval(this._interval)
        return this
    }

    advanceSeq() {
        let note = this.seq._data[this._currentStep]
        if (note && this._prevNote && note.freq !== this._prevNote.freq) this._voices.map(o => o.stop())
        if (note) {
            this._voices.map(o => o.setNote(note))
            this._voices.map(o => o.play())
        }

        this._currentStep++
            if (this._currentStep >= this._length) this._currentStep = 0
        this._prevNote = note
    }

    // Write a note at a step
    writeNote(note, step) {
        this.seq._data[step] = note
        console.log(this.seq)
        return this
    }

    // Set the current sequence
    setSequence(num) {
        this._currentSequenceNum = num;
        if (!_.isObject(this._seq[num])) this._seq[num] = new Sequence(this._length)
        return this
    }

    // Get the current sequence
    get seq() {
        if (!_.isObject(this._seq[this._currentSequenceNum])) this._seq[this._currentSequenceNum] = new Sequence(this._length)
        return this._seq[this._currentSequenceNum]
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
