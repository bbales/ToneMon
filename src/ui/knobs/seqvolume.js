import Knob from '../knob'
import Notes from '../../audio/notes'

export default class SequencerVolumeKnob extends Knob {
    constructor(canvas, sequencer, step) {
        super(canvas, 'Volume')
        this.setRadius(15)
        this.change(v => {
            sequencer.seq.setNote(step, Notes.note(v, sequencer.seq.getNote(step).octave))
        })
    }
}
