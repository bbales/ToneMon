import Str from '../util/str'
import Notes from './notes'

export default class Voice {
    constructor(actx) {
        this.id = Str.id()

        this.ctx = actx
        this.osc = actx.createOscillator()
        this.osc.start()
        this.vca = this.ctx.createGain()
        this.vca.gain.value = 0
        this.osc.connect(this.vca)

        this.octave = 0
        this.transpose = 0

        this._attack = 1;
        this._release = 1;
        this._note = {
            freq: -1
        }

        this.vca.connect(this.ctx.destination)
        this.wave = 'triangle'
    }

    setWave(wave) {
        if (!_.includes(['sine', 'square', 'sawtooth', 'triangle', 'custom'], wave)) throw ('Voice (' + this.id + '): Invalid waveform')
        this.wave = wave
        return this
    }

    setFreqEnvelope(env, tc) {
        this.freqEnvelopeTc = tc || 0.5
        this.freqEnvelope = env
        return this
    }

    setNote(note) {
        // Update waveform
        if (this.osc.type !== this.wave) this.osc.type = this.wave

        this._note = _.clone(note);

        // Transpose note
        note = Notes.transpose(note, this.octave * 12 + this.transpose)

        // Set based on frequency envelope
        switch (this.freqEnvelope) {
            case 'tween':
                this.osc.frequency.setTargetAtTime(note.freq, this.ctx.currentTime, this.freqEnvelopeTc);
                break;
            default:
                this.osc.frequency.setValueAtTime(note.freq, 0)
        }

        return this
    }

    // Control

    play(note) {
        if (this._playing && note.freq == this._note.freq) return
        this._playing = true;
        this.setNote(note)

        // Attack
        this.vca.gain.cancelScheduledValues(this.ctx.currentTime - 1);
        this.vca.gain.linearRampToValueAtTime(0.001, this.ctx.currentTime + 0.001)
        this.vca.gain.linearRampToValueAtTime(1, this.ctx.currentTime + 0.001 + this._attack)
    }

    stop() {
        if (!this._playing) return
        this._playing = false

        // Release
        this.vca.gain.cancelScheduledValues(this.ctx.currentTime - 1);
        this.vca.gain.setValueAtTime(this.vca.gain.value, this.ctx.currentTime)
        this.vca.gain.linearRampToValueAtTime(0.001, this.ctx.currentTime + this._release)
    }

    // Full Octave Transpose

    setOctave(oct) {
        this.octave = _.clamp(oct, 0, 11)
        return this
    }

    upOctave() {
        this.octave = _.clamp(this.octave + 1, 0, 11)
    }

    downOctave() {
        this.octave = _.clamp(this.octave - 1, 0, 11)
    }

    // Transpose

    setTranspose(delta) {
        this.transpose = _.clamp(delta, -11, 12)
        return this
    }

    upTranspose() {
        this.transpose = _.clamp(this.transpose + 1, -11, 12)
    }

    downTranspose() {
        this.transpose = _.clamp(this.transpose - 1, -11, 12)
    }

    // Attack and release

    setAttack(t) {
        this._attack = 1;
    }

    setRelease(t) {
        this._release = 1;
    }
}
