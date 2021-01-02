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

    const duration = frame.getSampleCount() / 44100;

    return this.lastEnqueuedAt + duration;
  }

  play(frame, startingTime) {
    const source = this.context.createBufferSource();

    source.buffer = this.createBuffer(frame);
    source.connect(this.context.destination);
    source.onended = () => { this.enqueuedFrames--; };
    source.start(startingTime);
  }

  createBuffer(frame) {
    const sampleCount = frame.getSampleCount();
    const buffer = this.context.createBuffer(2, sampleCount, 44100);

    frame.populateBuffer(buffer);

    return buffer;
  }
}
