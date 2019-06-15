import MemoryRegister from './MemoryRegister.js';

export default class LcdControllerRegister extends MemoryRegister {
  constructor(mmu) {
    super(mmu, 0xFF40);
  }

  isDisplayEnabled() {
    return this.testBit(7);
  }

  getWindowBaseAddress() {
    return this.testBit(6) ? 0x9C00 : 0x9800;
  }

  isWindowEnabled() {
    return this.testBit(5);
  }

  getTilesBaseAddress() {
    return this.testBit(4) ? 0x8000 : 0x8800;
  }

  getBackgroundBaseAddress() {
    return this.testBit(3) ? 0x9C00 : 0x9800;
  }

  getSpriteHeight() {
    return this.testBit(2) ? 16 : 8;
  }

  areSpritesEnabled() {
    return this.testBit(1);
  }

  isBackgroundEnabled() {
    return this.testBit(0);
  }

  testBit(bit) {
    return this.read() & (1 << bit);
  }
}
