import UIObj from './uiobj';

class Keys extends UIObj {
    constructor(canvas) {
        super(canvas);

        this.otype = 'keys';
        this.voices = [];
        this.octave = 3;
        this.lineWidth = 1;

        this.x = 100;
        this.y = 300;

        this.height = 100;
        this.width = 500;
        this.keyWidth = this.width / 12;

        this._genNotes();
    }

    // Generate note frequency pairs, should only be run once
    _genNotes() {
        var a = Math.pow(2, 1 / 12);
        var notes = ['a', 'as', 'b', 'c', 'cs', 'd', 'ds', 'e', 'f', 'fs', 'g', 'gs'];
        // Generate 6 octaves
        this.octaves = [];
        for (var i = 0; i < 6; i++) {
            // 12 notes per octave
            var octave = [];
            for (var j = 0; j < 12; j++) octave.push({
                'note': notes[j],
                'freq': step((i - 2) * 12 + j)
            });
            this.octaves.push(octave);
        }

        // Get frequency with reference to middle C
        function step(n) {
            return Math.round(440 * Math.pow(a, n));
        }
    }

    draw() {
        var self = this;
        this.ctx.strokeStyle = '#0EE';
        this.ctx.lineWidth = this.lineWidth;

        this.octaves[this.octave].forEach(function(o, i) {
            self.ctx.fillStyle = o.active ? '#022' : '#044';
            self.ctx.fillRect(self.x + i * self.keyWidth, self.y, self.keyWidth, self.keyWidth * 5);
            self.ctx.rect(self.x + i * self.keyWidth, self.y, self.keyWidth, self.keyWidth * 5);
            self.ctx.stroke();
        });
    }

    mousemoveHandler(e) {
        // Reset keys active states
        this.octaves[this.octave].forEach(function(o) {
            o.active = false;
        });

        if (!this.hitBox(e.pageX, e.pageY) || !this.playing) return;

        // Find out which key is being clicked
        var note = this.octaves[this.octave][Math.floor((e.x - this.x) / this.keyWidth)];
        note.active = true;

        this.playNote(note);
    }

    mousedownHandler(e) {
        if (!this.hitBox(e.pageX, e.pageY)) return;
        this.playing = true;
        this.mousemoveHandler(e);
    }

    mouseupHandler(e) {
        if (!this.hitBox(e.pageX, e.pageY)) return;
        this.playing = false;

        this.stopNote();
    }

    hitBox(x, y) {
        return x > this.x && x < (this.x + this.width) && y > this.y && y < (this.y + this.height);
    }

    attach(voice) {
        this.voices.push(voice);
    }

    detach(voice) {
        _.remove(this.voices, {
            'id': voice.id
        });
    }

    playNote(note) {
        console.log(note.note)
        this.voices.map(o => o.play.bind(o, note.freq)());
    }

    stopNote() {
        this.voices.map(o => o.stop.bind(o)());
    }

    setOctave(oct) {
        this.octave = _.clamp(oct, 0, 6);
    }

    upOctave() {
        this.octave = _.clamp(this.octave + 1, 0, 6);
    }

    downOctave() {
        this.octave = _.clamp(this.octave - 1, 0, 6);
    }
}

export default Keys;
