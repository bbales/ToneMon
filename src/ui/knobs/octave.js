import Knob from '../knob'

export default class OctaveKnob extends Knob {
    constructor(canvas, voice) {
        super(canvas, voice._name + ' Octave')

        this.setRadius(15)
        this.setMinMax(40, 368)
        this.change(value => voice.setOctave(value))
        this.setSnaps([{
            text: '-3',
            value: 0
        }, {
            text: '-2',
            value: 1
        }, {
            text: '-1',
            value: 2
        }, {
            default: true,
            text: '0',
            value: 3
        }, {
            text: '1',
            value: 4
        }, {
            text: '2',
            value: 5
        }, {
            text: '3',
            value: 6
        }])
    }
}
