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

    }

    setNote(freq) {
        this.osc.frequency.value = freq;
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
