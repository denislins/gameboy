class Flags {
  constructor() {
    this.flags = ['z', 'n', 'h', 'c'];
    this.reset();
  }

  reset() {
    this.values = {};
    this.flags.forEach(f => { this.values[f] = false });
  }

  set(flag, value) {
    this.flags[flag] = value;
  }

  get(flag) {
    return this.flags[flag];
  }
}

export default new Flags();
