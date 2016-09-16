/*
Purpose: This class is for creating an Oscilloscope.
Paramaters:
  - CANVAS: The canvas object - allows the oscilloscope to be added to the canvas
  - AUDIOCONTEXT: Used to create the `Analyser` node that analyses the incoming audio.
  - VOICES: Any voices that you want to be shown in the oScope are passed in as an array.
    - The voice class now has a method that connects itself to the oscilloscope.
*/

import UIObj from './uiobj'

export default class Oscilloscope extends UIObj {
    constructor(canvas, audioContext, voices) {
        super(canvas)

        this._actx = audioContext
        this._width = 200
        this._height = 100

        // Set up scope (fft, data stuffs.)
        this._oScope = this._actx.createAnalyser()
        this._oScope.fftSize = 2048
        this._dataArray = new Uint8Array(this._oScope.frequencyBinCount)

        // loop through the voices and connect to the scope.
        voices.forEach(voice => voice.connectOscilloscope(this._oScope))
    }

    draw() {
        // Get time domain data
        this._oScope.getByteTimeDomainData(this._dataArray)

        // the style of the osc.
        this.ctx.fillStyle = 'rgb(10, 200, 200)'
        this.ctx.fillRect(this._x, this._y, this._width, this._height)
        this.ctx.lineWidth = 2
        this.ctx.strokeStyle = 'rgb(255, 255, 0)'

        this.ctx.beginPath()

        this.sliceWidth = this._width * 1.0 / this._oScope.frequencyBinCount
        this.sliceX = 0

        // draw the osc from moment to moment.
        for (let i = 0; i < this._oScope.frequencyBinCount; i++) {
            let sliceY = (this._dataArray[i] / (128.0)) * this._height / 2
            this.ctx[i ? 'lineTo' : 'moveTo'](this._x + this.sliceX, this._y + sliceY)
            this.sliceX += this.sliceWidth
        }

        this.ctx.stroke()
    }

}
