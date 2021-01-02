import BasicSquareChannelRegisters from './BasicSquareChannelRegisters.js';

export default class SweepSquareChannelRegisters extends BasicSquareChannelRegisters {
  constructor(mmu) {
    super(mmu);
    this.baseAddress = 0xFF10;
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
}
