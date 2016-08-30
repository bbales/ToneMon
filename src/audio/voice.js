import Str from '../util/str';

class Voice {
    constructor(actx) {
        this.id = Str.id();

        this.ctx = actx;
        this.osc = actx.createOscillator();
        this.osc.start()
        this.vca = this.ctx.createGain();
        this.vca.gain.value = 0;
        this.osc.connect(this.vca);

        this.vca.connect(this.ctx.destination);
        this.wave = 'triangle';
    }

    setWave(wave) {
        if (!_.includes(['sine', 'square', 'sawtooth', 'triangle', 'custom'], wave)) throw ('Voice (' + this.id + '): Invalid waveform');
        this.wave = wave;
        return this;
    }

    setFreqEnvelope(env, tc) {
        this.freqEnvelopeTc = tc || 0.5;
        this.freqEnvelope = env;
        return this;
    }

    setNote(freq) {
        switch (this.freqEnvelope) {
            case 'tween':
                // this.osc.frequency.value = freq;
                this.osc.frequency.setTargetAtTime(freq, this.ctx.currentTime, this.freqEnvelopeTc);
                break;
            default:
                this.osc.frequency.setValueAtTime(freq, 0);
                break;
        }

        if (this.osc.type !== this.wave) this.osc.type = this.wave;

        return this;
    }

    play(freq) {
        this.setNote(freq);
        this.vca.gain.value = 1;
    }

    stop() {
        this.vca.gain.value = 0;
    }
}

export default Voice;
