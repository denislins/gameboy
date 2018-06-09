import registers from '../registers.js';

export default class SaveAddress {
  constructor(register) {
    this.register = register;
  }

  execute(address) {
    ram.set(address, registers.get(this.register));
  }

  toString() {
    return `LD byte/word, ${this.register}`;
  }
}
