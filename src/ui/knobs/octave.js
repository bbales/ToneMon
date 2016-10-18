import Knob from '../knob'

export default class OctaveKnob extends Knob {
    constructor(canvas, voice) {
        super(canvas, voice._name + ' Octave')

        this.setRadius(15)
        this.setMinMax(40, 368)
        this.change(value => voice.setOctave(value))
        this.setSnaps([{
            default: (voice._octave == -1),
            text: '-3',
            value: -3
        }, {
            default: (voice._octave == 1),
            text: '-2',
            value: 1
        }, {
            default: (voice._octave == 2),
            text: '-1',
            value: 2
        }, {
            default: (voice._octave == 3),
            text: '0',
            value: 3
        }, {
            default: (voice._octave == 4),
            text: '1',
            value: 4
        }, {
            default: (voice._octave == 5),
            text: '2',
            value: 5
        }, {
            default: (voice._octave == 6),
            text: '3',
            value: 6
        }])
    }
}
