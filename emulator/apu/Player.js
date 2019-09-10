export default class Player {
  constructor() {
    this.context = new AudioContext();
    this.samples = [];
    this.enqueued = 0;
  }

  addSamples(samples) {
    this.samples.push(...samples);

    if (this.samples.length >= 4096) {
      this.play();
    }
  }

  // private

  play() {
    const source = this.context.createBufferSource();

    source.onended = () => {
      if (--this.enqueued <= 0) {
        console.log('wrong', this.enqueued);
      }
    };

    source.buffer = this.createBuffer();
    source.connect(this.context.destination);
    source.start();

    this.enqueued++;
    this.samples = [];
  }

  createBuffer() {
    const buffer = this.context.createBuffer(1, 4096, 44100);
    const data = buffer.getChannelData(0);

    for (let index = 0; index < 4096; index++) {
      data[index] = this.samples[index];
    }

    return buffer;
  }
}
