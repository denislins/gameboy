import Observer from '../Observer.js';
import Ppu from './Ppu.js';

export default class Gpu {
  constructor(mmu) {
    this.mmu = mmu;
    this.ppu = new Ppu(this.mmu);
    this.lcdStatus = this.mmu.registers.get('lcdStatus');
  }

  reset() {
    this.pixels = [];
    this.cycles = 0;

    this.mmu.registers.write('scanline', 0);
    this.changeMode('oamSearch');
  }

  tick(cpuCycles) {
    this.cycles += cpuCycles;

    if (this.cycles >= 456) {
      this.cycles = this.cycles % 456;

      this.incrementCurrentRow();
      this.compareScanlineInterrupt();
    }

    const newMode = this.getNewMode();
    this.changeMode(newMode);
  }

  incrementCurrentRow() {
    const nextRow = (this.currentRow + 1) % 154;
    this.mmu.registers.write('scanline', nextRow);
  }

  compareScanlineInterrupt() {
    const value = this.lcdStatus.read();
    const comparedRow = this.mmu.registers.read('scanlineCompare');

    if (this.currentRow === comparedRow) {
      this.lcdStatus.write(value | 4);

      if (this.lcdStatus.isScanlineCompareInterruptEnabled()) {
        Observer.trigger('interrupts.request', { type: 'lcd' });
      }
    } else {
      this.lcdStatus.write(value & ~4);
    }
  }

  getNewMode() {
    if (this.currentRow > 143) {
      return 'vblank';
    } else if (this.cycles <= 80) {
      return 'oamSearch';
    } else if (this.cycles <= 252) {
      return 'pixelTransfer';
    }

    return 'hblank';
  }

  changeMode(newMode) {
    if (this.currentMode !== newMode) {
      this.lcdStatus.changeMode(newMode);

      if (this.currentMode === 'pixelTransfer') {
        this.execPixelTransfer();
      } else if (this.currentMode === 'vblank') {
        Observer.trigger('interrupts.request', { type: 'vblank' });
      }

      this.requestModeChangedInterrupt();
    }
  }

  execPixelTransfer() {
    if (this.currentRow === 0) {
      this.pixels = [];
    }

    const rowPixels = this.ppu.draw(this.currentRow);

    // destructuring is about 4x slower
    Array.prototype.push.apply(this.pixels, rowPixels);
  }

  requestModeChangedInterrupt() {
    let shouldRequestInterrupt = false;

    switch (this.currentMode) {
      case 'hblank':
        shouldRequestInterrupt = this.lcdStatus.isHblankInterruptEnabled();
        break;

      case 'vblank':
        shouldRequestInterrupt = this.lcdStatus.isVblankInterruptEnabled();
        break;

      case 'oamSearch':
        shouldRequestInterrupt = this.lcdStatus.isOamSearchInterruptEnabled();
        break;
    }

    if (shouldRequestInterrupt) {
      Observer.trigger('interrupts.request', { type: 'lcd' });
    }
  }

  get currentMode() {
    return this.lcdStatus.getCurrentMode();
  }

  get currentRow() {
    return this.mmu.registers.read('scanline');
  }
}
