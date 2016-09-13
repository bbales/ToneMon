import Knob from '../knob'

export default class AttackKnob extends Knob {
    constructor(canvas, voice) {
        super(canvas, voice._name + 'Attack')

        this.setRadius(20).setMinMax(30, 330).change(p => {
            voice.setAttack(p * 4)
        })
    }
}
