import Ppu from './Ppu.js';
import SpriteFilter from './sprites/SpriteFilter.js';

export default class Gpu {
  constructor(mmu) {
    this.mmu = mmu;
    this.ppu = new Ppu(this.mmu);
  }

  tick(cpuCycles) {
    const cycles = cpuCycles % 456;
    const currentRow = this.mmu.registers.read('ly');

    if (currentRow === 0) {
      this.startFrame();
    }

    if (currentRow > 144) {
      this.execVBlank();
    } else if (cycles <= 80) {
      this.execOamSearch();
    } else if (cycles > 80 && cycles <= 252) {
      this.execPixelTransfer();
    } else if (cycles > 252) {
      this.execHBlank();
    }
  }

  startFrame() {
    this.pixels = [];
  }

  execOamSearch() {
    if (this.step === 'oamsearch') return;

    this.step = 'oamsearch';
  }

  execPixelTransfer() {
    if (this.step === 'pixeltransfer') return;

    this.step = 'pixeltransfer';

    const currentRow = this.mmu.registers.read('ly');
    const rowPixels = this.ppu.draw(currentRow);

    this.pixels.push(...rowPixels);
  }

  execHBlank() {
    if (this.step === 'hblank') return;

    this.step = 'hblank';

    const currentRow = this.mmu.registers.read('ly');
    this.mmu.registers.write('ly', currentRow + 1);
  }

  execVBlank() {
    if (this.step === 'vblank') return;

    this.step = 'vblank';

    const currentRow = this.mmu.registers.read('ly');
    this.mmu.registers.write('ly', (currentRow + 1) % 154);
  }
}
