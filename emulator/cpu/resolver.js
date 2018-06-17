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
    let byte = this.readByte();
    const mask = 1 << 7;

    if ((byte & mask) !== 0) {
      byte = (~mask & byte) * -1;
    }

    return byte;
  }

  readWord() {
    const byte1 = this.readByte();
    const byte2 = this.readByte();

    return (byte2 << 8) | byte1;
  }

  readRegister(register) {
    return this.registers.get(register).getValue();
  }

  storeToRegister(register, value) {
    this.registers.get(register).setValue(value);
  }

  addToRegister(register, value) {
    value += this.readRegister(register);
    this.storeToRegister(register, value);
  }

  maskRegisterValue(register, value) {
    this.registers.get(register).mask(value);
  }

  storeValueToRegister(register, value) {
    this.storeToRegister(register, value);
  }

  readFromMemory(address) {
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
    const baseAddress = this.readRegister(register);
    const address = (baseAddress + (offset || 0)) & 0xFFFF;

    this.memory.set(address, value);
  }

  sumSignedByte(value) {
    const byte = this.readSignedByte();

    this.flags.set('z', false);
    this.flags.set('n', false);

    // TODO: need help

    if (byte >= 0) {
      this.flags.set('c', false);
    } else {

    }
  }

  incrementRegister(register, setFlags) {
    const currentValue = this.readRegister(register);

    this.addToRegister(register, 1);

    if (setFlags) {
      const newValue = this.readRegister(register);

      this.flags.set('z', newValue === 0);
      this.flags.set('n', false);
      this.flags.set('h', (currentValue & 0xF) === 0xF);
    }

    return currentValue;
  }

  decrementRegister(register, setFlags) {
    const currentValue = this.readRegister(register);

    this.addToRegister(register, -1);

    if (setFlags) {
      const newValue = this.readRegister(register);

      this.flags.set('z', newValue === 0);
      this.flags.set('n', true);
      this.flags.set('h', (currentValue & 0xF) === 0);
    }

    return currentValue;
  }

  push(value) {
    this.decrementRegister('sp');
    this.memory.set(this.readRegister('sp'), value >> 8);

    this.decrementRegister('sp');
    this.memory.set(this.readRegister('sp'), value & 0xFF);
  }

  pop() {
    const byte1 = this.incrementRegister('sp');
    const byte2 = this.incrementRegister('sp');

    return byte2 << 8 | byte1;
  }

  sumToRegisterValue(register, value) {
    const currentValue = this.readRegister(register);
    value += currentValue;

    this.flags.set('n', false);
    this.flags.set('z', (value & 0xFF) === 0);
    this.flags.set('h', (currentValue & 0xF) + (value & 0xF) > 0xF);
    this.flags.set('c', value > 0xFF);

    return value;
  }

  subtractFromRegisterValue(register, value) {
    const currentValue = this.readRegister(register);
    value = currentValue - value;

    this.flags.set('n', true);
    this.flags.set('z', (value & 0xFF) === 0);
    this.flags.set('h', (currentValue & 0xF) < (value & 0xF));
    this.flags.set('c', currentValue < value);

    return value;
  }

  sumToRegisterValueWithCarry(register, value) {
    const currentValue = this.readRegister(register);
    const carry = this.flags.get('c');

    value += currentValue + carry;

    this.flags.set('n', false);
    this.flags.set('z', (value & 0xFF) === 0);
    // TODO: understand why \/
    this.flags.set('h', (currentValue & 0xF) + (value & 0xF) + carry > 0xF);
    this.flags.set('c', value > 0xFF);

    return value;
  }

  subtractFromRegisterValueWithCarry(register, value) {
    const currentValue = this.readRegister(register);
    value = currentValue - value - carry;

    this.flags.set('n', true);
    this.flags.set('z', (value & 0xFF) === 0);
    this.flags.set('h', ((currentValue + carry) & 0xF) < (value & 0xF));
    this.flags.set('c', (currentValue + carry) < value);

    return value;
  }

  sumWordToRegisterValue(register, value) {
    const currentValue = this.readRegister(register);
    value += currentValue;

    this.flags.set('n', false);
    this.flags.set('h', (currentValue & 0xFFF) + (value & 0xFFF) > 0xFFF);
    this.flags.set('c', value > 0xFFFF);

    return value;
  }

  and(register) {
    const result = this.readRegister(register) & value;

    this.flags.set('z', result === 0);
    this.flags.set('n', false);
    this.flags.set('h', true);
    this.flags.set('c', false);

    return result;
  }

  or(register) {
    const result = this.readRegister(register) | value;

    this.flags.set('z', result === 0);
    this.flags.set('n', false);
    this.flags.set('h', false);
    this.flags.set('c', false);

    return result;
  }

  logicalXor(register, value) {
    const result = this.readRegister(register) ^ value;

    this.flags.set('z', result === 0);
    this.flags.set('n', false);
    this.flags.set('h', false);
    this.flags.set('c', false);

    return result;
  }

  incrementValue(value) {
    return value + 1;
  }

  decrementValue(value) {
    return value - 1;
  }

  swap(value) {
    const result = ((value & 0xF) << 4) | (value >> 4);

    this.flags.set('z', result === 0);
    this.flags.set('n', false);
    this.flags.set('h', false);
    this.flags.set('c', false);

    return result;
  }

  decimalAdjust(value) {
    let correction = 0;

    if (this.flags.get('h')) {
      correction |= 0x6;
    }

    if (this.flags.get('c')) {
      correction |= 0x60;
    }

    if (this.flags.get('n')) {
      value -= correction;
    } else {
      if ((value & 0xF) > 0x9) {
        correction |= 0x6;
      }

      if ((value >> 4) > 0x9) {
        correction |= 0x60;
      }

      value += correction;
    }

    this.flags.set('z', (value & 0xFF) === 0);
    this.flags.set('h', false);
    this.flags.set('c', value > 0xFF);
  }

  complementValue(value) {
    this.flags.set('n', true);
    this.flags.set('h', true);

    return ~value;
  }

  complementCarryFlag() {
    this.flags.set('n', false);
    this.flags.set('h', false);
    this.flags.set('c', !this.flags.get('c'));
  }

  setCarryFlag() {
    this.flags.set('n', false);
    this.flags.set('h', false);
    this.flags.set('c', true);
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

  rotateLeft(value) {
    const shifted = (value << 1) | (value >> 7);

    this.flags.set('z', (shifted & 0xFF) === 0);
    this.flags.set('n', false);
    this.flags.set('h', false);
    this.flags.set('c', (shifted & 0x1) === 1);

    return value;
  }

  rotateRight(value) {
    const shifted = (value & (1 << 7)) | (value >> 1);

    this.flags.set('z', value === 0);
    this.flags.set('n', false);
    this.flags.set('h', false);
    this.flags.set('c', (value & 0x1) === 1);

    return value;
  }

  rotateLeftUsingCarry(value) {
    const carry = this.flags.get('c') ? 1 : 0;
    const shifted = (value << 1) | carry;

    this.flags.set('z', (value & 0xFF) === 0);
    this.flags.set('n', false);
    this.flags.set('h', false);
    // these C flags are all screwed up
    this.flags.set('c', (shifted & 0x1) === 1);

    return value;
  }

  rotateRightUsingCarry(value) {
    const carry = this.flags.get('c') ? 1 : 0;
    const shifted = (value & (carry << 7)) | (value >> 1);

    this.flags.set('z', value === 0);
    this.flags.set('n', false);
    this.flags.set('h', false);
    this.flags.set('c', value & 0x1);

    return value;
  }

  shiftLeft(value) {
    value = value << 1;

    this.flags.set('z', (value & 0xFF) === 0);
    this.flags.set('n', false);
    this.flags.set('h', false);
    this.flags.set('c', value > 0xFF);

    return value;
  }

  arithmeticShiftRight(value) {
    value = (value & (1 << 7)) | (value >> 1);

    this.flags.set('z', value === 0);
    this.flags.set('n', false);
    this.flags.set('h', false);
    this.flags.set('c', value & 0x1);

    return value;
  }

  logicalShiftRight(value) {
    value = value >> 1;

    this.flags.set('z', value === 0);
    this.flags.set('n', false);
    this.flags.set('h', false);
    this.flags.set('c', value & 0x1);

    return value;
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

  sumWord(value, previousValue) {
    return (value + previousValue) & 0xFFFF;
  }
}
