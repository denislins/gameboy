export default class Flags {
  constructor() {
    this.flags = ['z', 'n', 'h', 'c'];
    this.reset();
  }

  reset() {
    this.values = {};

    this.flags.forEach((flag) => {
      this.values[flag] = false;
    });
  }

  set(flag, value) {
    this.flags[flag] = value;
  }

  get(flag) {
    return this.flags[flag];
  }
}
