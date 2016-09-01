import UIObj from './uiobj'
import Notes from '../audio/notes'

export default class Keys extends UIObj {
    constructor(canvas) {
        super(canvas)

        this.otype = 'keys'
        this.voices = []
        this.octave = 3
        this.lineWidth = 1

        this.x = 100
        this.y = 300

        this.height = 100
        this.width = 500
        this.keyWidth = this.width / 12

        this.octaves = Notes.all
    }

    draw() {
        let self = this
        this.ctx.strokeStyle = '#0EE'
        this.ctx.lineWidth = this.lineWidth

        this.octaves[this.octave].forEach(function(o, i) {
            self.ctx.fillStyle = o.active ? '#044' : (o.note.length > 1 ? '#022' : '#033')
            self.ctx.fillRect(self.x + i * self.keyWidth, self.y, self.keyWidth, self.keyWidth * 5)
            self.ctx.rect(self.x + i * self.keyWidth, self.y, self.keyWidth, self.keyWidth * 5)
            self.ctx.stroke()
        })
    }

    mousemoveHandler(e) {
        this.resetKeys()
        if (!this.hitBox(e.pageX, e.pageY) || !this.playing) return

        // Find out which key is being clicked
        let note = this.octaves[this.octave][Math.floor((e.x - this.x) / this.keyWidth)]
        note.active = true

        this.playNote(note)
    }

    mousedownHandler(e) {
        if (!this.hitBox(e.pageX, e.pageY)) return
        this.playing = true
        this.mousemoveHandler(e)
    }

    mouseupHandler(e) {
        this.playing = false
        this.resetKeys()
        this.stopNote()
    }

    resetKeys() {
        // Reset keys active states
        this.octaves[this.octave].forEach(function(o) {
            o.active = false
        })
    }

    hitBox(x, y) {
        return x > this.x && x < (this.x + this.width) && y > this.y && y < (this.y + this.height)
    }

    attach(voice) {
        this.voices.push(voice)
    }

    detach(voice) {
        _.remove(this.voices, {
            'id': voice.id
        })
    }

    playNote(note) {
        this.voices.map(o => o.play.bind(o, note)())
    }

    stopNote() {
        this.voices.map(o => o.stop.bind(o)())
    }

    setOctave(oct) {
        this.octave = _.clamp(oct, 0, 6)
    }

    upOctave() {
        this.octave = _.clamp(this.octave + 1, 0, 6)
    }

    downOctave() {
        this.octave = _.clamp(this.octave - 1, 0, 6)
    }
}
