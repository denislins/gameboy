import MemoryRegister from './MemoryRegister.js';

export default class LcdControllerRegister extends MemoryRegister {
  isEnabled() {
    return this.testBit(7);
  }

  getWindowBaseAddress() {
    return this.testBit(6) ? 0x9800 : 0x9C00;
  }

  isWindowEnabled() {
    return this.testBit(5);
  }

  getTilesBaseAddress() {
    return this.testBit(4) ? 0x8800 : 0x8000;
  }

  getBackgroundBaseAddress() {
    return this.testBit(3) ? 0x9800 : 0x9C00;
  }

  getSpriteHeight() {
    return this.testBit(2) ? 8 : 16;
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
