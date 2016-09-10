import UIObj from './uiobj';

export default class Oscilloscope extends UIObj {
  constructor(canvas, audioSource) {
    super(canvas)
    console.log(canvas, audioSource);

    this.width = 200;
    this.height = 100;
    this.ctx.clearRect(0, 0, this.width, this.height);

    this.oscScope = audioSource.ctx.createAnalyser();
    this.oscScope.fftSize = 2048;
    this.bufferLength = this.oscScope.frequencyBinCount;
    this.dataArray = new Uint8Array(this.bufferLength);
    this.oscScope.getByteTimeDomainData(this.dataArray);

  }


  draw() {
    // the animation loop
    let drawVisual = requestAnimationFrame(this.draw.bind(this));

    // ?
    this.oscScope.getByteTimeDomainData(this.dataArray);

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