export default class Midi {
  constructor(){
    
  }

  // check if the browser has access to midi, if so, continue on by running init();
  boot() {
    if(navigator.requestMIDIAccess){
      navigator.requestMIDIAccess()
        .then(this.init(), (e) => {
          console.log('no access to midi browser', e);
        })
    } else {
      console.log(`you're browser doesn't have access to web midi :(`);
    }
  }


  init() {
    console.log('we have midi from init yeah yeah')
  }

}
