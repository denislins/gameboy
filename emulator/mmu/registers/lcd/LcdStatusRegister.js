import AbstractMemoryRegister from '../AbstractMemoryRegister.js';

export default class LcdStatusRegister extends AbstractMemoryRegister {
  onInit() {
    this.address =  0xFF41;
    this.modes = ['hblank', 'vblank', 'oamSearch', 'dmaTransfer'];
  }

  getCurrentMode() {
    const mode = this.read() & 0b11;
    return this.modes[mode];
  }

  changeMode(modeStr) {
    const mode = this.modes.indexOf(modeStr);
    const newMode = (this.read() & 0b11111100) | mode;

    this.write(newMode);
  }
}
