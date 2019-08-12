import Observer from '../Observer.js';
import Phaser from '../common/Phaser.js';
import Ppu from './Ppu.js';

export default class Gpu {
  constructor(mmu) {
    this.mmu = mmu;

    this.scanline = mmu.registers.get('scanline');
    this.lcdStatus = mmu.registers.get('lcdStatus');

    this.ppu = new Ppu(this.mmu);
    this.pixels = [];

    this.initPhaser();
  }

  tick() {
    this.phaser.tick();
  }

  // private

  initPhaser() {
    this.phaser = new Phaser(456);
    this.phaser.when(80, () => this.updateMode());
    this.phaser.when(252, () => this.updateMode());
    this.phaser.whenFinished(() => this.updateScanline());
  }

  updateMode() {
    const newMode = this.getNewMode();
    const currentMode = this.getCurrentMode();

    if (currentMode !== newMode) {
      if (newMode === 'pixelTransfer') {
        this.execPixelTransfer();
      } else if (newMode === 'vblank') {
        Observer.trigger('interrupts.request', { type: 'vblank' });
      }

      this.requestModeChangedInterrupt(newMode);
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

  updateScanline() {
    this.incrementCurrentRow();
    this.compareScanlineInterrupt();
    this.updateMode();
  }

  execPixelTransfer() {
    const row = this.getCurrentRow();
    const rowPixels = this.ppu.draw(row);

    if (row === 0) {
      this.pixels = [];
    }

    // destructuring is about 4x slower
    Array.prototype.push.apply(this.pixels, rowPixels);
  }

  requestModeChangedInterrupt(mode) {
    let shouldRequestInterrupt = false;

    if (mode === 'hblank') {
      shouldRequestInterrupt = this.lcdStatus.isHblankInterruptEnabled();
    } else if (mode === 'vblank') {
      shouldRequestInterrupt = this.lcdStatus.isVblankInterruptEnabled();
    } else if (mode === 'oamSearch') {
      shouldRequestInterrupt = this.lcdStatus.isOamSearchInterruptEnabled();
    }

    if (shouldRequestInterrupt) {
      Observer.trigger('interrupts.request', { type: 'lcd' });
    }
  }

  incrementCurrentRow() {
    const currentRow = this.getCurrentRow();
    const nextRow = (currentRow + 1) % 154;

    this.scanline.write(nextRow);

    return nextRow;
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

  getCurrentMode() {
    return this.lcdStatus.getCurrentMode();
  }

  getCurrentRow() {
    return this.scanline.read();
  }
}
