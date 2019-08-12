export default class SquareChannel {
  constructor(mmu) {
    this.mmu = mmu;
  }

  generateSample() {
    if (this.isEnabled() && this.isDacEnabled()) {
      const volume = this.mmu.read(0xFF12) >> 4;
      return Math.random() * 2 - 1;
    } else {
      return 0;
    }
  }

  isEnabled() {
    return this.mmu.read(0xFF14) & 0x80;
  }

  isDacEnabled() {
    return this.mmu.read(0xFF12) & 0xF8;
  }
}
