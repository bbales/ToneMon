import Knob from '../knob'
import Notes from '../../audio/notes'

export default class SequencerNoteKnob extends Knob {
    constructor(canvas, sequencer, step, octave = 5) {
        super(canvas, 'Step ' + (step + 1))
        let defaultNote = sequencer.seq._data[step]
        this.setRadius(15)
        this.change(v => {
            sequencer.writeNote(Notes.note(v, defaultNote.octave), step)
        })
        this.setSnaps([{
            value: 'a',
            text: 'a'
        }, {
            value: 'as',
            text: 'a#'
        }, {
            value: 'b',
            text: 'b'
        }, {
            value: 'c',
            text: 'c'
        }, {
            value: 'cs',
            text: 'c#'
        }, {
            value: 'd',
            text: 'd'
        }, {
            value: 'ds',
            text: 'd#'
        }, {
            value: 'e',
            text: 'e'
        }, {
            value: 'f',
            text: 'f'
        }, {
            value: 'fs',
            text: 'f#'
        }, {
            value: 'g',
            text: 'g'
        }, {
            value: 'gs',
            text: 'g#'
        }], defaultNote.note)
    }
}
