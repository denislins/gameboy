export default class Player {
  constructor() {
    this.context = new AudioContext();
    this.resetSamples();
  }

  addSamples(samples) {
    samples.forEach((sample, index) => {
      this.samples[index].push(sample);
    });
  }

  play() {
    const source = this.context.createBufferSource();

    source.buffer = this.createBuffer();
    source.connect(this.context.destination);
    source.start();

    this.resetSamples();
  }

  // private

  resetSamples() {
    this.samples = [[]];
  }

  createBuffer() {
    const duration = this.samples[0].length;
    const buffer = this.context.createBuffer(1, duration, 44100);

    this.samples.forEach((samples, channel) => {
      const data = buffer.getChannelData(channel);

      samples.forEach((sample, index) => {
        data[index] = sample;
      });
    });

    return buffer;
  }
}
