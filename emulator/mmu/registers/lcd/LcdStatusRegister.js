import AbstractMemoryRegister from '../AbstractMemoryRegister.js';

export default class LcdStatusRegister extends AbstractMemoryRegister {
  onInit() {
    this.address = 0xFF41;
    this.modes = ['hblank', 'vblank', 'oamSearch', 'pixelTransfer'];
  }

  getCurrentMode() {
    const mode = this.read() & 3;
    return this.modes[mode];
  }

  changeMode(modeStr) {
    const mode = this.modes.indexOf(modeStr);
    const newMode = (this.read() & 0xFC) | mode;

    this.write(newMode);
  }

  isHblankInterruptEnabled() {
    return this.testBit(3);
  }

  isVblankInterruptEnabled() {
    return this.testBit(4);
  }

  isOamSearchInterruptEnabled() {
    return this.testBit(5);
  }

  isScanlineCompareInterruptEnabled() {
    return this.testBit(6);
  }

  testBit(bit) {
    return this.read() & (1 << bit);
  }
}
