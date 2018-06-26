import SpriteFilter from './sprites/SpriteFilter.js';

export default class Gpu {
  constructor(mmu) {
    this.mmu = mmu;
  }

  tick(cpuCycles) {
    const cycles = cpuCycles % 456;

    if (this.mmu.registers.read('ly') > 143) {
      this.execVBlank();
    } else if (cycles <= 80 && this.step !== 'oamsearch') {
      this.execOamSearch();
    } else if (cycles > 80 && cycles <= 252 && this.step !== 'pixeltransfer') {
      this.execPixelTransfer();
    } else if (cycles > 252) {
      this.execHBlank();
    }
  }

  execOamSearch() {
    this.step = 'oamsearch';

    const filter = new SpriteFilter(this.mmu);
    this.sprites = filter.getVisibleSprites();
  }

  execPixelTransfer() {
    this.step = 'pixeltransfer';
  }

  execHBlank() {
    this.step = 'hblank';

    const ly = this.mmu.registers.read('ly');
    this.mmu.registers.write('ly', ly + 1);
  }

  execVBlank() {
    this.step = 'vblank';

    const ly = this.mmu.registers.read('ly');
    this.mmu.registers.write('ly', (ly + 1) % 154);
  }
}
