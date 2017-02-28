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

        // Setup defaults
        this._actx = audioContext
        this._width = 200
        this._height = 100

        // Set up scope (fft, data stuffs.)
        this._oScope = this._actx.createAnalyser()
        this._oScope.fftSize = 2048
        this._dataArray = new Uint8Array(this._oScope.frequencyBinCount)

        // Loop through the voices and connect to the scope.
        voices.forEach(voice => voice.connectOscilloscope(this._oScope))
    }

    draw() {
        // Get time domain data
        this._oScope.getByteTimeDomainData(this._dataArray)

        // the style of the osc.
        this.ctx.lineWidth = 2
        this.ctx.shadowBlur = 10
        this.ctx.shadowColor = this.ctx.fillStyle = '#83d8ff'
        this.ctx.fillRect(this._x, this._y, this._width, this._height)

        // Calculate individual slice width and intialize x container
        this.sliceWidth = this._width / this._oScope.frequencyBinCount
        this.sliceX = 0

        // draw the osc from moment to moment.
        this.ctx.beginPath()
        this.ctx.shadowColor = this.ctx.strokeStyle = 'white'
        for (let i = 0; i < this._oScope.frequencyBinCount; i++) {
            let sliceY = ((this._dataArray[i] + 128) / (256)) * this._height / 2
            this.ctx[i ? 'lineTo' : 'moveTo'](this._x + this.sliceX, this._y + sliceY)
            this.sliceX += this.sliceWidth
        }
        this.ctx.stroke()

        // Reset blur
        this.ctx.shadowBlur = 0
    }
}
