import Knob from '../knob'

export default class ReleaseKnob extends Knob {
    constructor(canvas, voice) {
        super(canvas, voice._name + 'Release')

        this.setRadius(20).setMinMax(30, 330).change(p => {
            voice.setRelease(p * 4)
        })
    }
}
