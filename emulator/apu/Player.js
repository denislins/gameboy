export default class Player {
  constructor() {
    this.context = undefined;
    this.enqueuedFrames = 0;
    this.lastEnqueuedAt = undefined;
  }

  reset() {
    this.context = new (window.AudioContext || window.webkitAudioContext)();
  }

  enqueue(frame) {
    const startingTime = this.getFrameStartingTime(frame);

    this.play(frame, startingTime);

    this.enqueuedFrames++;
    this.lastEnqueuedAt = startingTime;
  }

  // private

  getFrameStartingTime(frame) {
    if (!this.lastEnqueuedAt) {
      return this.context.currentTime;
    }

    const duration = frame[0].length / 44100;

    return this.lastEnqueuedAt + duration;
  }

  play(frame, startingTime) {
    frame.forEach((samples, index) => {
      if (index === 0) {
        this.playChannel(samples, startingTime, () => { this.enqueuedFrames--; });
      } else {
        this.playChannel(samples, startingTime);
      }
    });
  }

  playChannel(samples, startingTime, onEndedCallback) {
    const source = this.context.createBufferSource();

    source.buffer = this.createBuffer(samples);
    source.connect(this.context.destination);

    if (onEndedCallback) {
      source.onended = onEndedCallback;
    }

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
