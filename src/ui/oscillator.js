import * as Knobs from './knobs/'
import Knob from './knob'
import Led from './led'
import Switch from './switch'
import Label from './label'
import Rectangle from './rectangle'

export default class Oscillator {
    constructor(canvas, voice, title = 'OSC') {
        this._x = 0
        this._y = 0
        this._title = title
        this._voice = voice

        this._titleLabel = new Label(canvas, this._title, 14).setAlign('left').setColor('#bfbfbf')
        this._rect = new Rectangle(canvas, 490, 105, 5).setColor('#403c3c')
        this._shape = new Knobs.ShapeKnob(canvas, this._voice)
        this._atk = new Knobs.AttackKnob(canvas, this._voice)
        this._rel = new Knobs.ReleaseKnob(canvas, this._voice)
        this._octave = new Knobs.OctaveKnob(canvas, this._voice)
        this._enable = new Switch(canvas, this._title + ' Enable').change(v => {
            this._voice.enable(v)
            let knobs = [this._shape, this._atk, this._rel, this._octave]
            knobs.forEach(o => o[v ? 'enable' : 'disable']())
        })
    }

    setPos(x, y) {
        this._x = x
        this._y = y

        // Set obj positions
        this._titleLabel.setPos(this._x, this._y)
        this._rect.setPos(this._x, this._y + 12)
        this._shape.setPos(this._x + 140, this._y + 57)
        this._atk.setPos(this._x + 240, this._y + 57)
        this._rel.setPos(this._x + 340, this._y + 57)
        this._octave.setPos(this._x + 440, this._y + 57)
        this._enable.setPos(this._x + 40, this._y + 42)

        return this
    }
}
