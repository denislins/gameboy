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
    this.resolver.add('storeRegister', register);
    return this;
  }

  rm(offset) {
    this.resolver.add('readMemory', offset);
    return this;
  }

  sda(offset) {
    this.resolver.add('saveDirectAddress', offset);
    return this;
  }

  rra(register) {
    this.resolver.add('readAddressAtRegister', register);
    return this;
  }

  sra(register, offset) {
    this.resolver.add('storeAddressAtRegister', register, offset);
    return this;
  }
}
