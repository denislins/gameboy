export default class Instruction {
  constructor(spec) {
    this.repr = spec.repr;
    this.cycles = spec.cycles;
    this.baseCycles = spec.baseCycles;
    this.chain = spec.chain;
    this.requirements = spec.requirements;
  }

  resolve(callback) {
    this.chain.reduce(callback, undefined);
  }
}
