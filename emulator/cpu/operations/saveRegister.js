import registers from '../registers.js';

export default class SaveRegister {
  constructor(register) {
    this.register = register;
  }

  execute(value) {
    registers.set(this.register, value);
  }

  toString() {
    return `LD ${this.register}, byte/word`;
  }
}
