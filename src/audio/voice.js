import Tool from '../util/tool'
import Notes from './notes'
import OscScope from '../ui/oscilloscope';

export default class Voice {
    constructor(actx, name) {
        this.id = Tool.id()
        this._name = name;

        // AudioContext
        this.ctx = actx

        // Main oscillator
        this.osc = actx.createOscillator()
        this.osc.start()

        // Amplifier
        this.vca = this.ctx.createGain()
        this.vca.gain.value = 0
        this.osc.connect(this.vca)
        this.vca.connect(this.ctx.destination)

        // Octave and _transpose properties
        this._octave = 0
        this._transpose = 0

        this._attack = 0;
        this._release = 0;
        this._note = {
            freq: -1
        }

        this._enabled = 1
    }

    setWave(wave) {
        if (!_.includes(['sine', 'square', 'sawtooth', 'triangle', 'custom'], wave)) throw ('Voice (' + this.id + '): Invalid waveform')
        this._wave = wave
        return this
    }

    setFreqEnvelope(env, tc) {
        this.freqEnvelopeTc = tc || 0.5
        this.freqEnvelope = env
        return this
    }

    setNote(note) {
        // Update waveform
        if (this.osc.type !== this._wave) this.osc.type = this._wave

        // Copy note as property
        this._note = _.clone(note);

        // Transpose note
        note = Notes.transpose(note, this._octave * 12 + this._transpose)

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

    play() {
        if (this._playing) return
        this._playing = true;

        // Attack
        this.vca.gain.cancelScheduledValues(this.ctx.currentTime - 1);
        this.vca.gain.linearRampToValueAtTime(this._enabled * 0.0005, this.ctx.currentTime)
        this.vca.gain.linearRampToValueAtTime(this._enabled * 0.5, this.ctx.currentTime + 0.03 + this._attack)
    }

    stop() {
        if (!this._playing) return
        this._playing = false

        // Release
        this.vca.gain.cancelScheduledValues(this.ctx.currentTime - 1);
        this.vca.gain.setValueAtTime(this._enabled * this.vca.gain.value, this.ctx.currentTime)
        this.vca.gain.linearRampToValueAtTime(this._enabled * 0.0005, this.ctx.currentTime + 0.03 + this._release)
    }

    enable(setting) {
        this._enabled = setting ? 1 : 0;
    }

    // Full Octave Transpose

    setOctave(oct) {
        this._octave = _.clamp(oct, 0, 11)
        return this
    }

    upOctave() {
        this._octave = _.clamp(this._octave + 1, 0, 11)
    }

    downOctave() {
        this._octave = _.clamp(this._octave - 1, 0, 11)
    }

    // Transpose

    setTranspose(delta) {
        this._transpose = _.clamp(delta, -11, 12)
        return this
    }

    upTranspose() {
        this._transpose = _.clamp(this._transpose + 1, -11, 12)
    }

    downTranspose() {
        this._transpose = _.clamp(this._transpose - 1, -11, 12)
    }

    // Attack and release

    setAttack(t) {
        this._attack = t
        return this
    }

    setRelease(t) {
        this._release = t
        return this
    }

    // Oscilloscope

    connectOscilloscope(scope) {
        this.vca.connect(scope)
    }
}
