import Ppu from './Ppu.js';

export default class Gpu {
  constructor(mmu) {
    this.mmu = mmu;
    this.ppu = new Ppu(this.mmu);
    this.stat = this.mmu.registers.get('stat');
  }

  reset() {
    this.pixels = [];
    this.cycles = 0;
  }

  tick(cpuCycles) {
    this.cycles += cpuCycles;

    if (this.cycles > 456) {
      this.cycles = this.cycles % 456;
      this.incrementCurrentRow();
    }

    const newMode = this.getNewMode();
    this.changeMode(newMode);
  }

  incrementCurrentRow() {
    const nextRow = (this.currentRow + 1) % 154;
    this.mmu.registers.write('ly', nextRow);
  }

  getNewMode() {
    if (this.currentRow > 143 && this.currentRow < 154) {
      return 'vblank';
    }

    if (this.cycles <= 80) {
      return 'oamSearch';
    } else if (this.cycles <= 252) {
      return 'dmaTransfer';
    }

    return 'hblank';
  }

  changeMode(newMode) {
    if (this.currentMode === newMode) {
      return null;
    }

    this.stat.changeMode(newMode);

    if (this.currentMode === 'oamSearch') {
      this.execOamSearch();
    } else if (this.currentMode === 'dmaTransfer') {
      this.execDmaTransfer();
    } else if (this.currentMode === 'vblank') {
      this.screen = this.pixels;
    }
  }

  getScreen() {
    const screen = this.screen;

    this.screen = [];

    return screen;
  }

  execOamSearch() {
    if (this.currentRow === 0) {
      this.pixels = [];
    }
  }

  execDmaTransfer() {
    const rowPixels = this.ppu.draw(this.currentRow);
    this.pixels.push(...rowPixels);
  }

  get currentMode() {
    return this.stat.getCurrentMode();
  }

  get currentRow() {
    return this.mmu.registers.read('ly');
  }
}
