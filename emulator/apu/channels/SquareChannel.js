import Phaser from '../../common/Phaser.js';
import Observer from '../../common/Observer.js';

export default class SquareChannel {
  constructor(mmu) {
    this.mmu = mmu;
    this.currentCycle = 0;
    this.lengthCounter = 0;

    this.initDutyCycles();
    this.initPhaser();
    this.initEventListeners();
  }

  reset() {
    this.resetPhaser();
  }

  tick() {
    this.phaser.tick();
  }

  execLengthCounter() {
    if (this.lengthCounter > 0 && this.isLenghtCounterEnabled()) {
      this.lengthCounter--;

      if (this.lengthCounter === 0) {
        const value = this.mmu.read(0xFF14) & 0x7F;
        this.mmu.write(0xFF14, value);
      }
    }
  }

  generateSample() {
    if (this.isEnabled() && this.isDacEnabled() && this.isDutyCycleActive()) {
      return 0.1;
    } else {
      return 0;
    }
  }

  // private

  initDutyCycles() {
    this.dutyCycles = [
      [false, false, false, false, false, false, false, true],
      [true, false, false, false, false, false, false, true],
      [true, false, false, false, false, true, true, true],
      [false, true, true, true, true, true, true, false],
    ];
  }

  initPhaser() {
    this.phaser = new Phaser(0);
    this.phaser.whenFinished(() => this.updateCurrentCycle());
  }

  initEventListeners() {
    Observer.on('apu.channels.controller.written', ({ value }) => {
      this.enable(value);
    });
  }

  updateCurrentCycle() {
    this.currentCycle = (this.currentCycle + 1) % 8;
    this.resetPhaser();
  }

  enable(value) {
    if (value & 0x80) {
      this.lengthCounter = 64;
      this.resetPhaser();
    }
  }

  resetPhaser() {
    const frequency = this.getFrequency();
    const timer = (2048 - frequency) * 16;

    this.phaser.setLimit(timer);
  }

  getFrequency() {
    const lowBits = this.mmu.read(0xFF13);
    const highBits = this.mmu.read(0xFF14) & 7;

    return (highBits << 8) | lowBits;
  }

  getVolume() {
    return this.mmu.read(0xFF12) >> 4;
  }

  isEnabled() {
    return this.mmu.read(0xFF14) & 0x80;
  }

  isDacEnabled() {
    return this.mmu.read(0xFF12) & 0xF8;
  }

  isLenghtCounterEnabled() {
    return this.mmu.read(0xFF14) & 0x40;
  }

  isDutyCycleActive() {
    const index = this.mmu.read(0xFF11) >> 6;
    const dutyCycle = this.dutyCycles[index];

    return dutyCycle[this.currentCycle];
  }
}
