export default class Player {
  constructor() {
    this.context = new AudioContext();
    this.duration = 1 / 60;
    this.lastEnqueuedAt = undefined;
    this.samples = [];
    this.enqueued = 0;
  }

  addSamples(samples) {
    this.samples.push(...samples);
  }

  play() {
    this.enqueueFrame();
    this.lastEnqueuedAt = this.context.currentTime;
    this.enqueued++;
    this.samples = [];
  }

  // private

  enqueueFrame() {
    const source = this.context.createBufferSource();

    source.buffer = this.createBuffer();
    source.connect(this.context.destination);

    source.onended = () => {
      this.enqueued--;
    };

    const startAt = this.getStartTime();
    source.start(startAt);
  }

  createBuffer() {
    const buffer = this.context.createBuffer(1, this.samples.length, 44100);
    const data = buffer.getChannelData(0);

    this.samples.forEach((sample, index) => {
      data[index] = sample;
    });

    return buffer;
  }

  getStartTime() {
    if (this.lastEnqueuedAt === undefined) {
      return 0;
    }

    const timeSpent = this.context.currentTime - this.lastEnqueuedAt;

    if (this.enqueued <= 1) {
      return this.context.currentTime + (this.duration - timeSpent);
    } else {
      return this.lastEnqueuedAt + this.duration;
    }
  }
}
