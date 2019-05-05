import ByteRegister from './ByteRegister.js';
import FlagsRegister from './FlagsRegister.js';
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
    ['a', 'b', 'c', 'd', 'e', 'h', 'l'].forEach((register) => {
      this.registers[register] = new ByteRegister();
    });

    this.registers.f = new FlagsRegister();
  }

  initCompositeRegisters() {
    ['af', 'bc', 'de', 'hl'].forEach((register) => {
      const composition = register.split('').map(r => this.registers[r]);
      this.registers[register] = new CompositeRegister(...composition);
    });
  }

  initWordRegisters() {
    this.registers.pc = new WordRegister(0);
    this.registers.sp = new WordRegister(0xFFFE);
  }

  reset() {
    this.registers.pc.reset();
    this.registers.sp.reset();
  }

  get(register) {
    return this.registers[register];
  }

  read(register) {
    return this.get(register).read();
  }

  write(register, value) {
    return this.get(register).write(value);
  }
}
