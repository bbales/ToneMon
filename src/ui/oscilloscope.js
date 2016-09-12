/*
Purpose: This class is for creating an Oscilloscope.
Paramaters:
  - CANVAS: The canvas object - allows the oscilloscope to be added to the canvas
  - AUDIOCONTEXT: Used to create the `Analyser` node that analyses the incoming audio.
  - VOICES: Any voices that you want to be shown in the oScope are passed in as an array.
    - The voice class now has a method that connects itself to the oscilloscope.
*/


import UIObj from './uiobj';

export default class Oscilloscope extends UIObj {
  constructor(canvas, audioContext, voices) {
    super(canvas)

    // create the oscilloscope box.
    this.width = 200;
    this.height = 100;

    // Setup and config (fft, data stuffs.)
    this.oScope = audioContext.createAnalyser();
    this.oScope.fftSize = 2048;
    this.bufferLength = this.oScope.frequencyBinCount;
    this.dataArray = new Uint8Array(this.bufferLength);
    this.oScope.getByteTimeDomainData(this.dataArray);

    // loop through the voices and connect to the scope.
    voices.forEach(voice => voice.connectOscilloscope(this.oScope));
  }


  draw() {
    // the animation loop
    let drawVisual = requestAnimationFrame(this.draw.bind(this));

    this.oScope.getByteTimeDomainData(this.dataArray);

    // the style of the osc.
    this.ctx.fillStyle = 'rgb(10, 200, 200)';
    this.ctx.fillRect(0, 0, this.width, this.height);
    this.ctx.lineWidth = 2;
    this.ctx.strokeStyle = 'rgb(255, 255, 0)';

    this.ctx.beginPath();

    this.sliceWidth = this.width * 1.0 / this.bufferLength;
    this.sliceX = 0;

    // draw the osc from moment to moment.
    for (let i = 0; i < this.bufferLength; i++) {
      let v = this.dataArray[i] / 128.0;
      let sliceY = v * this.height / 2;

      if (i === 0) {
        this.ctx.moveTo(this.sliceX, sliceY);
      } else {
        this.ctx.lineTo(this.sliceX, sliceY);
      }

      this.sliceX += this.sliceWidth;
    }

    this.ctx.lineTo(this.ctx.width, this.ctx.height / 2);
    this.ctx.stroke();
  }

}