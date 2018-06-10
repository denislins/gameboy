import Resolver from './resolver.js';

export default class Operation {
  constructor(repr) {
    this.repr = repr;
    this.resolver = new Resolver();
  }

  rb() {
    this.resolver.add('readByte');
    return this;
  }

  rw() {
    this.resolver.add('readWord');
    return this;
  }

  rr(register) {
    this.resolver.add('readRegister', register);
    return this;
  }

  sr(register) {
    this.resolver.add('storeToRegister', register);
    return this;
  }

  rm(offset) {
    this.resolver.add('readFromMemory', offset);
    return this;
  }

  sda(offset) {
    this.resolver.add('saveToddress', offset);
    return this;
  }

  rra(register) {
    this.resolver.add('readFromAddressAtRegister', register);
    return this;
  }

  sra(register, offset) {
    this.resolver.add('storeToAddressAtRegister', register, offset);
    return this;
  }

  sumb() {
    this.resolver.add('sumByte');
    return this;
  }

  inc(register) {
    this.resolver.add('incrementRegister', register);
    return this;
  }

  dec(register) {
    this.resolver.add('decrementRegister', register);
    return this;
  }

  sumr(register) {
    this.resolver.add('sumToRegister', register);
    return this;
  }

  subr(register) {
    this.resolver.add('subtractFromRegister', register);
    return this;
  }

  sumrc(register) {
    this.resolver.add('sumToRegisterWithCarry', register);
    return this;
  }

  subrc(register) {
    this.resolver.add('subtractFromRegisterWithCarry', register);
    return this;
  }
}
