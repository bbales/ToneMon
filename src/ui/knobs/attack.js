import Knob from '../knob'

export default class AttackKnob extends Knob {
    constructor(canvas, voice) {
        super(canvas, voice._name + ' Attack')

        this.setRadius(20)
        this.setMinMax(30, 330)
        this.change(p => {
            voice.setAttack(p * 4)
        })
    }
}
