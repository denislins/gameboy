export default class SquareChannelRegisters {
  constructor(mmu, baseAddress) {
    this.mmu = mmu;
    this.baseAddress = baseAddress;
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
    const isChannelEnabled = this.read(4) & 0x80;
    const isDacEnabled = this.read(2) & 0xF8;

    return isChannelEnabled && isDacEnabled;
  }

  getVolume() {
    return this.read(2) >> 4;
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

  getSweepPeriod() {
    return (this.read(0) >> 4) & 7;
  }

  getSweepShift() {
    return this.read(0) & 7;
  }

  isSweepNegateEnabled() {
    return this.read(0) & 8;
  }

  getEnvelopePeriod() {
    return this.read(2) & 7;
  }

  isEnvelopeAddModeEnabled() {
    return this.read(2) & 8;
  }

  // private

  read(address) {
    return this.mmu.read(this.baseAddress + address);
  }

  write(address, value) {
    return this.mmu.write(this.baseAddress + address, value);
  }
}
