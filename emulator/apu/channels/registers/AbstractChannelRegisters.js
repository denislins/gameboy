export default class AbstractChannelRegisters {
  constructor(mmu) {
    this.mmu = mmu;
    this.baseAddress = this.getBaseAddress();
  }

  getFrequency() {
    const lowBits = this.read(3);
    const highBits = this.read(4) & 7;

    return (highBits << 8) | lowBits;
  }

  setFrequency(frequency) {
    this.write(3, frequency & 0xFF);

    const baseValue = this.read(4) & 0xF8;
    const highBits = baseValue | (frequency >> 8);

    this.write(4, highBits);
  }

  isChannelEnabled() {
    return this.read(4) & 0x80;
  }

  isLengthCounterEnabled() {
    return this.read(4) & 0x40;
  }

  disableChannel() {
    debugger;
    const value = this.read(4) | 0x80;
    this.write(4, value);
  }

  // private

  getBaseAddress() {
    throw new Error('Not implemented');
  }

  read(address) {
    return this.mmu.forceRead(this.baseAddress + address);
  }

  write(address, value) {
    return this.mmu.forceWrite(this.baseAddress + address, value);
  }
}
