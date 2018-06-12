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

  rsb() {
    this.resolver.add('readSignedByte');
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

  ar(register) {
    this.resolver.add('addToRegister', register);
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

  sumsb() {
    this.resolver.add('sumSignedByte');
    return this;
  }

  incr(register) {
    this.resolver.add('incrementRegister', register);
    return this;
  }

  decr(register) {
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

  and(register) {
    this.resolver.add('logicalAnd', register);
    return this;
  }

  or(register) {
    this.resolver.add('logicalOr', register);
    return this;
  }

  xor(register) {
    this.resolver.add('logicalXor', register);
    return this;
  }

  inc() {
    this.resolver.add('incrementValue');
    return this;
  }

  dec(value) {
    this.resolver.add('decrementValue');
    return this;
  }

  swap() {
    this.resolver.add('swapValue');
    return this;
  }

  da() {
    this.resolver.add('decimalAdjust');
    return this;
  }

  cpl() {
    this.resolver.add('complementValue');
    return this;
  }

  ccf() {
    this.resolver.add('complementCarryFlag');
    return this;
  }

  scf() {
    this.resolver.add('setCarryFlag');
    return this;
  }

  nop() {
    this.resolver.add('noOperation');
    return this;
  }

  halt() {
    this.resolver.add('halt');
    return this;
  }

  stop() {
    this.resolver.add('stop');
    return this;
  }

  ti(enable) {
    this.resolver.add('toggleInterrupts', enable);
    return this;
  }

  rtl() {
    this.resolver.add('rotateLeft');
    return this;
  }

  rtr() {
    this.resolver.add('rotateRight');
    return this;
  }

  rtlc() {
    this.resolver.add('rotateLeftUsingCarry');
    return this;
  }

  rtrc() {
    this.resolver.add('rotateRightUsingCarry');
    return this;
  }

  shl() {
    this.resolver.add('shiftLeft');
    return this;
  }

  shra() {
    this.resolver.add('arithmeticShiftRight');
    return this;
  }

  shrl() {
    this.resolver.add('logicalShiftRight');
    return this;
  }

  bit(bit) {
    this.resolver.add('testBit', bit);
    return this;
  }

  setb(bit) {
    this.resolver.add('setBit', bit);
    return this;
  }

  resb(bit) {
    this.resolver.add('resetBit', bit);
    return this;
  }

  cf(flag, value) {
    this.resolver.add('checkFlag', flag, value);
    return this;
  }
}
