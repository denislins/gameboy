export default class Player {
  constructor() {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    this.context = new AudioContext();
  }

  play(samples) {
    const source = this.context.createBufferSource();

    source.buffer = this.createBuffer(samples);
    source.connect(this.context.destination);
    source.start(0);
  }

  // private

  createBuffer(samples) {
    const buffer = this.context.createBuffer(1, samples.length, 44100);
    const data = buffer.getChannelData(0);

    samples.forEach((sample, index) => {
      data[index] = sample;
    });

    return buffer;
  }
}
