export default class InstructionChain {
  constructor() {
    this.operations = [];
  }

  add(operation, ...args) {
    this.operations.push({ operation, args });
  }

  resolve(callback) {
    this.operations.reduce(callback, undefined);
  }
}
