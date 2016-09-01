import Str from '../util/str';
import Notes from './notes';

class Voice {
    constructor(actx) {
        this.id = Str.id();

        this.ctx = actx;
        this.osc = actx.createOscillator();
        this.osc.start()
        this.vca = this.ctx.createGain();
        this.vca.gain.value = 0;
        this.osc.connect(this.vca);

        this.octave = 0;
        this.transpose = 0;

        this.vca.connect(this.ctx.destination);
        this.wave = 'triangle';
    }

    setWave(wave) {
        if (!_.includes(['sine', 'square', 'sawtooth', 'triangle', 'custom'], wave)) throw ('Voice (' + this.id + '): Invalid waveform');
        this.wave = wave;
        console.log(wave)
        return this;
    }

    setFreqEnvelope(env, tc) {
        this.freqEnvelopeTc = tc || 0.5;
        this.freqEnvelope = env;
        return this;
    }

    setNote(note) {
        // Update waveform
        if (this.osc.type !== this.wave) this.osc.type = this.wave;

        // Transpose note
        note = Notes.transpose(note, this.octave * 12 + this.transpose);

        // Set based on frequency envelope
        switch (this.freqEnvelope) {
            case 'tween':
                // this.osc.frequency.value = freq;
                this.osc.frequency.setTargetAtTime(note.freq, this.ctx.currentTime, this.freqEnvelopeTc);
                break;
            default:
                this.osc.frequency.setValueAtTime(note.freq, 0);
        }

        return this;
    }

    // Control

    play(note) {
        this.setNote(note);
        this.vca.gain.value = 1;
    }

    stop() {
        this.vca.gain.value = 0;
    }

    // Full Octave Transpose

    setOctave(oct) {
        this.octave = _.clamp(oct, 0, 11);
        return this;
    }

    upOctave() {
        this.octave = _.clamp(this.octave + 1, 0, 11);
    }

    downOctave() {
        this.octave = _.clamp(this.octave - 1, 0, 11);
    }

    // Transpose

    setTranspose(delta) {
        this.transpose = _.clamp(delta, -11, 12);
        return this;
    }

    upTranspose() {
        this.transpose = _.clamp(this.transpose + 1, -11, 12);
    }

    downTranspose() {
        this.transpose = _.clamp(this.transpose - 1, -11, 12);
    }
}

export default Voice;
