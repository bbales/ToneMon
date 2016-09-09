import UIObj from './uiobj'
import Notes from '../audio/notes'
import Tool from '../util/tool'

export default class Keys extends UIObj {
    constructor(canvas) {
        super(canvas)
        this.otype = 'keys'

        this.voices = []
        this.octaveIndex = 3
        this.lineWidth = 1

        this.x = 200
        this.y = 500

        this.height = 100
        this.width = 500
        this.keyWidth = this.width / 12

        this.octaves = Notes.all
    }

    draw() {
        var self = this
        this.ctx.strokeStyle = '#0EE'
        this.ctx.lineWidth = this.lineWidth

        this.octave.forEach(function(o, i) {
            self.ctx.beginPath()
            self.ctx.fillStyle = o.active ? '#044' : (o.note.length > 1 ? '#022' : '#033')
            self.ctx.fillRect(self.x + i * self.keyWidth, self.y, self.keyWidth, self.keyWidth * 5)
            self.ctx.rect(self.x + i * self.keyWidth, self.y, self.keyWidth, self.keyWidth * 5)
            self.ctx.stroke()
            self.ctx.closePath()
        })
    }

    mousemoveHandler(e) {
        this.resetKeys()
        if (!this.hitBox(e.rx, e.ry) || !this.playing) return

        // Find out which key is being clicked
        var note = this.octave[Math.floor((e.rx - this.x) / this.keyWidth)]
        note.active = true
        this.setNote(note)
    }

    mousedownHandler(e) {
        // Dont do anything if the click is not in the hit-box
        if (!this.hitBox(e.rx, e.ry)) return
        this.playNote();
        this.mousemoveHandler(e)
    }

    mouseupHandler(e) {
        this.resetKeys()
        this.stopNote()
    }

    resetKeys() {
        // Reset keys active states
        Tool.setAll(this.octave, 'active', false);
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

    setNote(note) {
        this.voices.map(o => o.setNote(note))
    }

    playNote() {
        this.playing = true
        this.voices.map(o => o.play())
    }

    stopNote() {
        this.playing = false
        this.voices.map(o => o.stop())
    }

    // Octave

    get octave() {
        return this.octaves[this.octaveIndex];
    }

    setOctave(oct) {
        this.octaveIndex = _.clamp(oct, 0, 6)
    }

    upOctave() {
        this.octaveIndex = _.clamp(this.octaveIndex + 1, 0, 6)
    }

    downOctave() {
        this.octaveIndex = _.clamp(this.octaveIndex - 1, 0, 6)
    }
}
