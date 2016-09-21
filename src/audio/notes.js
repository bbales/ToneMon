var _noteArray;
var _flatArray;

export default class Notes {

    // This only has to be called once
    static setup() {
        if (!this._setup) {
            _noteArray = _genOctaves(12)
            _flatArray = _.flatten(_noteArray)
            this._setup = true
        }

        // Generate note frequency pairs, should only be run once
        function _genOctaves(num) {
            // Default to 6 octaves
            num = num || 6

            // Lettered notes
            const notes = ['a', 'as', 'b', 'c', 'cs', 'd', 'ds', 'e', 'f', 'fs', 'g', 'gs']

            // 'a' value for formula
            let a = Math.pow(2, 1 / 12)

            // Generate [num] octaves
            for (var octaves = []; octaves.push([]) < num;);

            // Generate notes in each octave
            octaves.forEach((octave, i) => {
                for (let j = 0; j < 12; j++) octave.push({
                    'note': notes[j],
                    'freq': step((i - num / 2) * 12 + j)
                })
            })

            return octaves

            // Get frequency with reference to middle C
            function step(n) {
                return Math.round(440 * Math.pow(a, n))
            }
        }
    }

    // Getter for all octaves
    static get all() {
        if (!this._setup) this.setup()
        return _.cloneDeep(_noteArray)
    }

    static note(str, octave = 0) {
        // example: c5 or cs3
        if ((_.includes(str, 's') && str.length == 3) || (!_.includes(str, 's') && str.length == 2)) {
            octave = parseInt(str[str.length - 1])
            str = str.substring(0, str.length - 1)
        }
        let note = _.find(_noteArray[octave], {
            'note': str
        })

        note.octave = octave
        return note
    }

    static transpose(note, delta) {
        // Find note in flattened array
        let i = _.findIndex(_flatArray, {
            'freq': note.freq
        })

        // Ensure index exists
        if (_.isUndefined(i)) throw ('Note does not exist')

        // Calculate new index
        i = i + delta

        // Index error
        if (i >= _flatArray.length - 1 || i < 0) throw ('Note out of bounds')

        // Return the transposed note
        return _flatArray[i]
    }
}
