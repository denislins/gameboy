export default class BasicSquareChannelRegisters {
  constructor(mmu) {
    this.mmu = mmu;
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

  getEnvelopePeriod() {
    return this.read(2) & 7;
  }

  isEnvelopeAddModeEnabled() {
    return this.read(2) & 8;
  }

  // private

  read(address) {
    return this.mmu.forceRead(0xFF15 + address);
  }

  write(address, value) {
    return this.mmu.forceWrite(0xFF15 + address, value);
  }
}
