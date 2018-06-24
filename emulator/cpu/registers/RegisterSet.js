import ByteRegister from './ByteRegister.js';
import CompositeRegister from './CompositeRegister.js';
import WordRegister from './WordRegister.js';

export default class RegisterSet {
  constructor() {
    this.registers = {};

    this.initByteRegisters();
    this.initCompositeRegisters();
    this.initWordRegisters();
  }

  initByteRegisters() {
    ['a', 'b', 'c', 'd', 'e', 'f', 'h', 'l'].forEach((register) => {
      this.registers[register] = new ByteRegister();
    });
  }

  initCompositeRegisters() {
    ['af', 'bc', 'de', 'hl'].forEach((register) => {
      const composition = register.split('').map(r => this.registers[r]);
      this.registers[register] = new CompositeRegister(...composition);
    });
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
