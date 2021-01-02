export default class Player {
  constructor() {
    this.context = undefined;
    this.enqueuedFrames = 0;
    this.lastEnqueuedAt = undefined;
  }

  reset() {
    this.context = new (window.AudioContext || window.webkitAudioContext)();

    this.enqueuedFrames = 0;
    this.lastEnqueuedAt = undefined;
  }

  enqueue(samples) {
    const startingTime = this.getFrameStartingTime(samples);

    this.play(samples, startingTime);

    this.enqueuedFrames++;
    this.lastEnqueuedAt = startingTime;
  }

  // private

  getFrameStartingTime(samples) {
    if (!this.lastEnqueuedAt) {
      return this.context.currentTime;
    }

    const duration = samples.length / 44100;

    return this.lastEnqueuedAt + duration;
  }

  play(samples, startingTime) {
    const source = this.context.createBufferSource();

    source.buffer = this.createBuffer(samples);
    source.connect(this.context.destination);
    source.onended = () => { this.enqueuedFrames--; };
    source.start(startingTime);
  }

  createBuffer(samples) {
    const buffer = this.context.createBuffer(1, samples.length, 44100);
    const data = buffer.getChannelData(0);

    samples.forEach((sample, index) => {
      data[index] = sample;
    });

    return buffer;
  }
}
