export default class Phaser {
  constructor(limit) {
    this.setLimit(limit);
    this.callbacks = { finished: () => {} };
  }

  setLimit(limit) {
    this.limit = limit;
    this.reset();
  }

  reset() {
    this.cycles = 0;
  }

  tick() {
    this.cycles += 4;

    if (this.callbacks[this.cycles]) {
      this.callbacks[this.cycles].call();
    }

    if (this.cycles >= this.limit) {
      this.callbacks.finished.call();
      this.reset();
    }
  }

  when(cycles, callback) {
    this.callbacks[cycles] = callback;
  }

  whenFinished(callback) {
    this.callbacks.finished = callback;
  }
}
