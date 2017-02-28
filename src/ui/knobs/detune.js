import Knob from '../knob'

export default class DetuneKnob extends Knob {
    constructor(canvas, voice) {
        super(canvas, voice._name + ' Detune')

        this.setRadius(20)
        this.setMinMax(30, 330)
        this.change(p => {
            voice.setTranspose(p * 4)
        })
    }
}
