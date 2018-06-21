import ByteRegister from './byte.js';
import CompositeRegister from './composite.js';
import WordRegister from './word.js';

export default class RegisterSet {
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

  read(register) {
    return this.registers[register].read();
  }

  write(register, value) {
    return this.registers[register].write(value);
  }
}
