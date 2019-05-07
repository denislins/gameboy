import InstructionChain from './InstructionChain.js';

export default class Instruction {
  constructor(cycles, repr) {
    this.cycles = cycles;
    this.repr = repr;
    this.chain = new InstructionChain();
  }

  rb() {
    this.chain.add('readByte');
    return this;
  }

  rsb() {
    this.chain.add('readSignedByte');
    return this;
  }

  rw() {
    this.chain.add('readWord');
    return this;
  }

  rr(register) {
    this.chain.add('readRegister', register);
    return this;
  }

  sr(register) {
    this.chain.add('storeToRegister', register);
    return this;
  }

  ar(register) {
    this.chain.add('addToRegister', register);
    return this;
  }

  sva(register, value) {
    this.chain.add('storeValueToRegister', register, value);
    return this;
  }

  rm() {
    this.chain.add('readFromMemory');
    return this;
  }

  sbda(offset) {
    this.chain.add('storeByteToAddress', offset);
    return this;
  }

  swda() {
    this.chain.add('storeWordToAddress');
    return this;
  }

  rra(register) {
    this.chain.add('readFromAddressAtRegister', register);
    return this;
  }

  sra(register, offset) {
    this.chain.add('storeToAddressAtRegister', register, offset);
    return this;
  }

  sumsb() {
    this.chain.add('sumSignedByte');
    return this;
  }

  incr(register, setFlags = true) {
    this.chain.add('incrementRegister', register, setFlags);
    return this;
  }

  decr(register, setFlags = true) {
    this.chain.add('decrementRegister', register, setFlags);
    return this;
  }

  push() {
    this.chain.add('push');
    return this;
  }

  pop() {
    this.chain.add('pop');
    return this;
  }

  sumr(register) {
    this.chain.add('sumToRegisterValue', register);
    return this;
  }

  subr(register) {
    this.chain.add('subtractFromRegisterValue', register);
    return this;
  }

  sumrc(register) {
    this.chain.add('sumToRegisterValueWithCarry', register);
    return this;
  }

  subrc(register) {
    this.chain.add('subtractFromRegisterValueWithCarry', register);
    return this;
  }

  sumwr(register) {
    this.chain.add('sumWordToRegisterValue', register);
    return this;
  }

  and(register) {
    this.chain.add('logicalAnd', register);
    return this;
  }

  or(register) {
    this.chain.add('logicalOr', register);
    return this;
  }

  xor(register) {
    this.chain.add('logicalXor', register);
    return this;
  }

  inc() {
    this.chain.add('incrementValue');
    return this;
  }

  dec() {
    this.chain.add('decrementValue');
    return this;
  }

  swap() {
    this.chain.add('swap');
    return this;
  }

  da() {
    this.chain.add('decimalAdjust');
    return this;
  }

  cpl() {
    this.chain.add('complementValue');
    return this;
  }

  ccf() {
    this.chain.add('complementCarryFlag');
    return this;
  }

  scf() {
    this.chain.add('setCarryFlag');
    return this;
  }

  nop() {
    this.chain.add('noOperation');
    return this;
  }

  halt() {
    this.chain.add('halt');
    return this;
  }

  stop() {
    this.chain.add('stop');
    return this;
  }

  ti(enable) {
    this.chain.add('toggleInterrupts', enable);
    return this;
  }

  rtl() {
    this.chain.add('rotateLeft');
    return this;
  }

  rtr() {
    this.chain.add('rotateRight');
    return this;
  }

  rtlc() {
    this.chain.add('rotateLeftUsingCarry');
    return this;
  }

  rtrc() {
    this.chain.add('rotateRightUsingCarry');
    return this;
  }

  shl() {
    this.chain.add('shiftLeft');
    return this;
  }

  shra() {
    this.chain.add('arithmeticShiftRight');
    return this;
  }

  shrl() {
    this.chain.add('logicalShiftRight');
    return this;
  }

  bit(bit) {
    this.chain.add('testBit', bit);
    return this;
  }

  setb(bit) {
    this.chain.add('setBit', bit);
    return this;
  }

  resb(bit) {
    this.chain.add('resetBit', bit);
    return this;
  }

  cfl(flag, value, jump = 0) {
    this.chain.add('checkFlag', flag, value, jump);
    return this;
  }

  sumw(value) {
    this.chain.add('sumWord', value);
    return this;
  }

  nia() {
    this.chain.add('nextInstructionAddress');
    return this;
  }
}
