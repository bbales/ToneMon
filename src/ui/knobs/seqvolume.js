import Knob from '../knob'
import Notes from '../../audio/notes'

export default class SequencerVolumeKnob extends Knob {
    constructor(canvas, sequencer, step) {
        super(canvas, 'Note ' + (step + 1))
        let defaultNote = sequencer.seq._data[step]
        this.setRadius(15)
        this.change(v => {
            sequencer.writeNote(Notes.note(v, defaultNote.octave), step)
        })
    }
}
