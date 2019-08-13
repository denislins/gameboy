import Observer from '../common/Observer.js';
import Phaser from '../common/Phaser.js';
import Ppu from './Ppu.js';

export default class Gpu {
  constructor(mmu) {
    this.mmu = mmu;

    this.ppu = new Ppu(this.mmu);
    this.pixels = [];

    this.initRegisters();
    this.initPhaser();
  }

  tick() {
    this.phaser.tick();
  }

  // private

  initRegisters() {
    this.scanline = this.mmu.registers.get('scanline');
    this.lcdStatus = this.mmu.registers.get('lcdStatus');
  }

  initPhaser() {
    this.phaser = new Phaser(456);
    this.phaser.when(80, cycles => this.updateMode(cycles));
    this.phaser.when(252, cycles => this.updateMode(cycles));
    this.phaser.whenFinished(() => this.updateScanline());
  }

  updateMode(cycles) {
    const newMode = this.getNewMode(cycles);
    const currentMode = this.getCurrentMode();

    if (currentMode !== newMode) {
      this.lcdStatus.changeMode(newMode);

      if (newMode === 'pixelTransfer') {
        this.execPixelTransfer();
      } else if (newMode === 'vblank') {
        this.execVblank();
      }

      this.requestModeChangedInterrupt(newMode);
    }
  }

  getNewMode(cycles) {
    const currentRow = this.getCurrentRow();

    if (currentRow > 143) {
      return 'vblank';
    } else if (cycles === 80) {
      return 'pixelTransfer';
    } else if (cycles === 252) {
      return 'hblank';
    }

    return 'oamSearch';
  }

  updateScanline() {
    const currentRow = this.incrementCurrentRow();

    this.compareScanlineInterrupt(currentRow);
    this.updateMode(456);
  }

  execPixelTransfer() {
    const row = this.getCurrentRow();
    const rowPixels = this.ppu.draw(row);

    // destructuring is about 4x slower
    Array.prototype.push.apply(this.pixels, rowPixels);
  }

  execVblank() {
    Observer.trigger('interrupts.request', { type: 'vblank' });
    Observer.trigger('gpu.frameRendered', { pixels: this.pixels });

    this.pixels = [];
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

  compareScanlineInterrupt(currentRow) {
    const value = this.lcdStatus.read();
    const comparedRow = this.mmu.registers.read('scanlineCompare');

    if (currentRow === comparedRow) {
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
