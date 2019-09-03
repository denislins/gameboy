export default class SquareChannelRegisters {
  constructor(mmu, baseAddress) {
    this.mmu = mmu;
    this.baseAddress = baseAddress;
  }

  read(address) {
    return this.mmu.read(this.baseAddress + address);
  }

  write(address, value) {
    return this.mmu.write(this.baseAddress + address, value);
  }

  getFrequency() {
    const lowBits = this.read(3);
    const highBits = this.read(4) & 7;

    return (highBits << 8) | lowBits;
  }

  isChannelEnabled() {
    return this.read(4) & 0x80;
  }

  getVolume() {
    return this.read(2) >> 4;
  }

  isDacEnabled() {
    return this.read(2) & 0xF8;
  }

  getActiveDutyCycle() {
    return this.read(1) >> 6;
  }

  isLengthCounterEnabled() {
    return this.read(4) & 0x40;
  }

  disableChannel() {
    const value = this.read(4) & 0x7F;
    this.write(4, value);
  }
}
