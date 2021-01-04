export default class Phaser {
  constructor(limit) {
    this.callbacks = { finished: () => {} };

    this.reset();
    this.setLimit(limit);
  }

  reset() {
    this.cycles = 0;
  }

  setCycles(cycles) {
    this.cycles = 0;
  }

  setLimit(limit) {
    this.limit = limit;
    this.cycles = 0;
  }

  tick() {
    this.cycles += 4;

    if (this.callbacks[this.cycles]) {
      this.callbacks[this.cycles](this.cycles);
    }

    if (this.cycles >= this.limit) {
      this.callbacks.finished.call();
      this.cycles = this.cycles % this.limit;
    }
  }

  when(cycles, callback) {
    this.callbacks[cycles] = callback;
  }

  whenFinished(callback) {
    this.callbacks.finished = callback;
  }
}
