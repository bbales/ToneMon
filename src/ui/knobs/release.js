import Knob from '../knob'

export default class ReleaseKnob extends Knob {
    constructor(canvas, voice) {
        super(canvas, voice._name + ' Release')

        this.setRadius(20)
        this.setMinMax(30, 330)
        this.change(p => {
            voice.setRelease(p * 4)
        })
    }
}
