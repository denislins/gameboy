export default class Instruction {
  constructor(spec) {
    this.repr = spec.repr;
    this.cycles = spec.cycles;
    this.chain = spec.chain;
  }

  resolve(callback) {
    this.chain.reduce(callback, undefined);
  }
}
