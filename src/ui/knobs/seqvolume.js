import Knob from '../knob'
import Notes from '../../audio/notes'

export default class SequencerVolumeKnob extends Knob {
    constructor(canvas, sequencer, step, value = 1) {
        super(canvas, 'Volume')
        this.setMinMax(30, 330)
        this.setValue(value)
        this.setRadius(10)
        this._titleY = 30
        this.change(v => {
            sequencer.seq.setVolume(step, v)
        })

        this.setValue(0.75)
    }
}
