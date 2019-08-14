export default class Player {
  constructor() {
    this.context = new AudioContext();
    this.resetBuffer();
  }

  addSamples(samples) {
    samples.forEach((sample, index) => {
      const data = this.buffer.getChannelData(index);
      data[this.samples] = sample;
    });

    if (++this.samples === 44100) {
      this.play();
    }
  }

  // private

  resetBuffer() {
    this.buffer = this.context.createBuffer(1, 44100, 44100);
    this.samples = 0;
  }

  play() {
    const source = this.context.createBufferSource();

    source.buffer = this.buffer;
    source.connect(this.context.destination);
    source.start();

    this.resetBuffer();
  }
}
