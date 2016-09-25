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
        clearInterval(this._interval)
        this._interval = setInterval(() => this.advanceSeq(), 60 * 1000 / this._bpm)
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
        this._voices.map(o => o.stop())
        return this
    }

    // Move current step pointer to next available step
    advanceSeq() {
        let note = this.seq.getNote(this._currentStep)
        if (note && this._prevNote && note.freq !== this._prevNote.freq) this._voices.map(o => o.stop())
        if (note) {
            this._voices.map(o => o.setNote(note))
            this._voices.map(o => o.play())
        }

        if (++this._currentStep >= this._length) this._currentStep = 0
        this._prevNote = note
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
        for (this._data = []; this._data.push([]) < this._length;);
    }

    // Set note at step in sequence
    setNote(step, note) {
        console.log(step)
        this._data[step].note = note
    }

    // Set volume of note at step in sequence
    setVolume(step, volume) {
        this._data[step].volume = volume
    }

    // Clear note and volume at step in sequence
    clearNote(step) {
        delete this._data[step].note
        delete this._data[step].volume
    }

    // Get the note data at a given step
    getNote(step) {
        return this._data[step].note
    }

    // Get the volume data at a given step
    getVolume(step) {
        return this._data[step].volume
    }
}
