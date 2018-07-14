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
    this.registers.a = new ByteRegister(0x01);
    this.registers.b = new ByteRegister(0);
    this.registers.c = new ByteRegister(0x13);
    this.registers.d = new ByteRegister(0);
    this.registers.e = new ByteRegister(0xD8);
    this.registers.f = new ByteRegister(0xB0);
    this.registers.h = new ByteRegister(0x01);
    this.registers.l = new ByteRegister(0x4D);
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
    Object.values(this.registers).forEach(r => r.reset());
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
