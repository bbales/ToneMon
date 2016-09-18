import Knob from '../knob'

export default class ShapeKnob extends Knob {
    constructor(canvas, voice) {
        super(canvas, voice._name + ' Shape')

        this.setRadius(20)
        this.setMinMax(30, 200)
        this.change(value => voice.setWave(value))
        this.setSnaps([{
            text: '◻',
            default: (voice._wave == 'square'),
            value: 'square'
        }, {
            text: '∿',
            default: (voice._wave == 'sine'),
            value: 'sine'
        }, {
            text: '△',
            default: (voice._wave == 'triangle'),
            value: 'triangle'
        }, {
            text: '◺',
            default: (voice._wave == 'sawtooth'),
            value: 'sawtooth'
        }])
    }
}
