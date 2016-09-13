import Knob from '../knob'

export default class ShapeKnob extends Knob {
    constructor(canvas, voice) {
        super(canvas, voice._name + ' Shape')

        this.setRadius(20)
        this.setMinMax(30, 200)
        this.change(value => voice.setWave(value))
        this.setSnaps([{
            text: '◻',
            value: 'square'
        }, {
            text: '∿',
            value: 'sine'
        }, {
            text: '△',
            default: true,
            value: 'triangle'
        }, {
            text: '◺',
            value: 'sawtooth'
        }])
    }
}
