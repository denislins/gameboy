import BasicSquareChannelRegisters from './BasicSquareChannelRegisters.js';

export default class SweepSquareChannelRegisters extends BasicSquareChannelRegisters {
  getSweepPeriod() {
    return (this.read(0) >> 4) & 7;
  }

  getSweepShift() {
    return this.read(0) & 7;
  }

  isSweepNegateEnabled() {
    return this.read(0) & 8;
  }

  // private

  getBaseAddress() {
    return 0xFF10;
  }
}
