import ByteRegister from './byte.js';
import CompositeRegister from './composite.js';
import WordRegister from './word.js';

class RegisterSet {
  constructor() {
    this.registers = {};

    this.initByteRegisters();
    this.initCompositeRegisters();
    this.initWordRegisters();
  }

  initByteRegisters() {
    for (let register of ['a', 'b', 'c', 'd', 'e', 'f', 'h', 'l']) {
      this.registers[register] = new ByteRegister();
    }
  }

  initCompositeRegisters() {
    let composition;

    for (let register of ['af', 'bc', 'de', 'hl']) {
      composition = register.split('').map(r => this.registers[r]);
      this.registers[register] = new CompositeRegister(...composition);
    }
  }

  initWordRegisters() {
    this.registers.pc = new WordRegister();
    this.registers.sp = new WordRegister();
  }

  get(register) {
    return this.registers[register];
  }
}

export default new RegisterSet();
