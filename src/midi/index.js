export default class Midi {
  constructor(){
  }

  // check if the browser has access to midi, if so, continue on by running init();
  boot() {
    if(navigator.requestMIDIAccess){
      navigator.requestMIDIAccess()
        .then(this.init.bind(this))
    } else {
      console.log(`you're browser doesn't have access to web midi :(`);
    }
  }


  init(midiAccess) {
    console.log(midiAccess)
    const midi = midiAccess;
    const inputs = midi.inputs.values(); 
    for (let input = inputs.next(); input && !input.done; input = inputs.next()) {
      // on receiving a midi message, fire off the MidiMessage function.
      input.value.onmidimessage = this.onMIDIMessage;
    }
  }

  onMIDIMessage(m) {
    console.log('midi data:', m.data )
  }

}

