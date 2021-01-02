export default class Frame {
  constructor() {
    this.samples = {
      sweepSquare: [],
      basicSquare: [],
    };
  }

  push(samples) {
    this.samples.sweepSquare.push(samples[0]);
    this.samples.basicSquare.push(samples[1]);
  }

  getSampleCount() {
    return this.samples.sweepSquare.length;
  }

  populateBuffer(buffer) {
    this.populateChannel(buffer.getChannelData(0), this.samples.sweepSquare);
    this.populateChannel(buffer.getChannelData(1), this.samples.basicSquare);
  }

  // private

  populateChannel(channel, samples) {
    samples.forEach((sample, index) => {
      channel[index] = sample;
    });
  }
}
