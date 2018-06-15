import flags from './flags.js';
import memory from '../memory/memory.js';
import registers from './registers/set.js';
import rom from '../rom.js';

export default class Resolver {
  constructor() {
    this.flags = flags;
    this.memory = memory;
    this.registers = registers;
    this.chain = [];
  }

  add(operation, ...args) {
    this.chain.push({ operation, args });
  }

  resolve(value) {
    this.resolved = false;

    let args;

    for (let piece of this.chain) {
      if (!this[piece.operation]) {
        throw new Error(`inexistent operation: ${piece.operation}`)
      }

      args = [...piece.args, value];
      value = this[piece.operation](...args);

      if (this.resolved) {
        break;
      }
    }

    return value;
  }

  readByte() {
    return rom.shift();
  }

  readSignedByte() {
    let byte = rom.shift();
    const mask = 1 << 7;

    if ((byte & mask) !== 0) {
      byte = (~mask & byte) * -1;
    }

    return byte;
  }

  readWord() {
    const byte1 = rom.shift();
    const byte2 = rom.shift();

    return (byte1 << 8) | byte2;
  }

  readRegister(register) {
    return this.registers.get(register).getValue();
  }

  storeToRegister(register, offset, value) {
    this.registers.get(register).setValue(value);
  }

  addToRegister(register, value) {
    this.registers.get(register).sumValue(value);
  }

  sva(register, value) {
    // ('storeValueToRegister', register, value);
  }

  readFromMemory(offset, address) {
    if (offset) {
      address += offset;
    }

    return this.memory.get(address);
  }

  storeToAddress(offset, value) {
    let address;

    if (offset) {
      address = (this.readByte() + offset) & 0xFFFF;
    } else {
      address = this.readWord();
    }

    this.memory.set(address, value);
  }

  readFromAddressAtRegister(register) {
    const address = this.readRegister(register);
    return this.memory.get(address);
  }

  storeToAddressAtRegister(register, offset, value) {
    const address = this.readRegister(register) + (offset || 0);
    this.memory.set(address, value);
  }

  sumsb() {
    // ('sumSignedByte');
  }

  incrementRegister(register) {
    const currentValue = this.readRegister(register);

    this.addToRegister(register, 1);
    const newValue = this.readRegister(register);

    this.flags.set('z', newValue === 0);
    this.flags.set('n', false);
    // this.flags.set('h', true); TODO

    return currentValue;
  }

  decrementRegister(register) {
    const currentValue = this.readRegister(register);

    this.addToRegister(register, -1);

    return currentValue;
  }

  push() {
    // ('push');
  }

  pop() {
    // ('pop');
  }

  sumToRegister(register, value) {
    return (this.readRegister(register) + value) & 0xFF;
  }

  subtractFromRegister(register, value) {
    return (this.readRegister(register) - value) & 0xFF;
  }

  sumToRegisterWithCarry(register, value) {
    const carry = this.flags.get('c');
    return (this.readRegister(register) + value + carry) & 0xFF;
  }

  subtractFromRegisterWithCarry(register, value) {
    const carry = this.flags.get('c');
    return (this.readRegister(register) - value - carry) & 0xFF;
  }

  and(register) {
    return this.readRegister(register) & value;
  }

  or(register) {
    return this.readRegister(register) | value;
  }

  logicalXor(register, value) {
    return this.readRegister(register) ^ value;
  }

  inc() {
    // ('incrementValue');
  }

  dec(value) {
    // ('decrementValue');
  }

  swap() {
    // ('swapValue');
  }

  da() {
    // ('decimalAdjust');
  }

  cpl() {
    // ('complementValue');
  }

  ccf() {
    // ('complementCarryFlag');
  }

  scf() {
    // ('setCarryFlag');
  }

  nop() {

  }

  halt() {
    // ('halt');
  }

  stop() {
    // ('stop');
  }

  toggleInterrupts(enable) {
    // TODO
  }

  rtl() {
    // ('rotateLeft');
  }

  rtr() {
    // ('rotateRight');
  }

  rotateLeftUsingCarry() {
    // TODO
  }

  rtrc() {
    // ('rotateRightUsingCarry');
  }

  shl() {
    // ('shiftLeft');
  }

  shra() {
    // ('arithmeticShiftRight');
  }

  shrl() {
    // ('logicalShiftRight');
  }

  testBit(bit, value) {
    const mask = 1 << bit;

    this.flags.set('z', (value & mask) === 0);
    this.flags.set('n', false);
    this.flags.set('h', true);
  }

  setBit(bit, value) {
    return (value | (1 << bit)) & 0xFF;
  }

  resetBit(bit) {
    return (value & ~(1 << bit)) & 0xFF;
  }

  checkFlag(flag, value) {
    if (this.flags.get(flag) !== value) {
      this.resolved = true;
    }
  }
}
