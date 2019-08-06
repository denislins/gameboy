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
    const currentMode = this.lcdStatus.getCurrentMode();

    if (currentMode !== newMode) {
      this.lcdStatus.changeMode(newMode);

      if (currentMode === 'pixelTransfer') {
        this.execPixelTransfer();
      } else if (currentMode === 'vblank') {
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
    const currentMode = this.lcdStatus.getCurrentMode();
    let shouldRequestInterrupt = false;

    if (currentMode === 'hblank') {
      shouldRequestInterrupt = this.lcdStatus.isHblankInterruptEnabled();
    } else if (currentMode === 'vblank') {
      shouldRequestInterrupt = this.lcdStatus.isVblankInterruptEnabled();
    } else if (currentMode === 'oamSearch') {
      shouldRequestInterrupt = this.lcdStatus.isOamSearchInterruptEnabled();
    }

    if (shouldRequestInterrupt) {
      Observer.trigger('interrupts.request', { type: 'lcd' });
    }
  }

  get currentRow() {
    return this.mmu.registers.read('scanline');
  }
}
