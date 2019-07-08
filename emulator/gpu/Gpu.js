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
    this.changeMode('oamSearch');
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
    if (this.currentRow > 143) {
      return 'vblank';
    } else if (this.cycles <= 80) {
      return 'oamSearch';
    } else if (this.cycles <= 252) {
      return 'dmaTransfer';
    }

    return 'hblank';
  }

  changeMode(newMode) {
    if (this.currentMode !== newMode) {
      this.stat.changeMode(newMode);

      if (this.currentMode === 'dmaTransfer') {
        this.execDmaTransfer();
      }
    }
  }

  execDmaTransfer() {
    if (this.currentRow === 0) {
      this.pixels = [];
    }

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
