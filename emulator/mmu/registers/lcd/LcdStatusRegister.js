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
    const newMode = (this.read() & 0b11111100) | mode;

    this.write(newMode);
  }
}
