import Phaser from '../../common/Phaser.js';
import Observer from '../../common/Observer.js';
import SquareChannelRegisters from './registers/SquareChannelRegisters.js';

export default class SquareChannel {
  constructor(mmu) {
    this.registers = new SquareChannelRegisters(mmu, 0xFF10);
    this.currentCycle = 0;
    this.lengthCounter = 0;
    this.volume = 0;

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
    if (this.lengthCounter > 0 && this.registers.isLengthCounterEnabled()) {
      this.lengthCounter--;

      if (this.lengthCounter === 0) {
        this.registers.disableChannel();
      }
    }
  }

  execFrequencySweep() {

  }

  generateSample() {
    if (this.registers.isChannelEnabled() && this.registers.isDacEnabled() && this.isDutyCycleActive()) {
      return this.volume / 15;
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
      this.volume = this.registers.getVolume();
      this.resetPhaser();
    }
  }

  resetPhaser() {
    const frequency = this.registers.getFrequency();
    const timer = (2048 - frequency) * 16;

    this.phaser.setLimit(timer);
  }

  isDutyCycleActive() {
    const index = this.registers.getActiveDutyCycle();
    const dutyCycle = this.dutyCycles[index];

    return dutyCycle[this.currentCycle];
  }
}
