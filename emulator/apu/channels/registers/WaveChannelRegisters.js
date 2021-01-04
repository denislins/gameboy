import AbstractChannelRegisters from './AbstractChannelRegisters.js';

export default class WaveChannelRegister extends AbstractChannelRegisters {
  constructor(mmu) {
    super(mmu);
    this.volumeAdjustments = [4, 0, 1, 2];
  }

  getLengthCounter() {
    return this.read(1);
  }

  setLengthCounter(counter) {
    this.write(1, counter);
  }

  getVolumeAdjustment() {
    const code = (this.read(3) & 0x7F) >> 5;
    return this.volumeAdjustments[code];
  }

  isChannelEnabled() {
    return super.isChannelEnabled() && (this.read(0) & 0x80);
  }

  // private

  getBaseAddress() {
    return 0xFF1A;
  }
}
