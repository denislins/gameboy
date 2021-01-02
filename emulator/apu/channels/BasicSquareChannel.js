import Phaser from '../../common/Phaser.js';
import Observer from '../../common/Observer.js';
import BasicSquareChannelRegisters from './registers/BasicSquareChannelRegisters.js';

export default class BasicSquareChannel {
  constructor(mmu) {
    this.registers = new BasicSquareChannelRegisters(mmu);
    this.currentCycle = 0;
    this.lengthCounter = 0;
    this.volume = 0;

    this.isEnvelopeEnabled = false;
    this.envelopePeriod = 0;

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
    // not supported
  }

  execVolumeEnvelope() {
    if (--this.envelopePeriod <= 0) {
      this.calculateVolumeEnvelope();

      if (this.volume === 0 || this.volume === 15) {
        this.isEnvelopeEnabled = false;
      }
    }
  }

  calculateVolumeEnvelope() {
    const addMode = this.registers.isEnvelopeAddModeEnabled();

    if (addMode && this.volume < 15) {
      this.volume++;
    }

    if (!addMode && this.volume > 0) {
      this.volume--;
    }
  }

  generateSample() {
    if (this.registers.isChannelEnabled() && this.isDutyCycleActive()) {
      return this.volume / 45;
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
      this.resetLengthCounter();
      this.resetPhaser();

      this.volume = this.registers.getVolume();
      this.envelopePeriod = this.registers.getEnvelopePeriod();

      this.isEnvelopeEnabled = true;
    }
  }

  resetPhaser() {
    const frequency = this.registers.getFrequency();
    const timer = (2048 - frequency) * 4;

    this.phaser.setLimit(timer);
  }

  isDutyCycleActive() {
    const index = this.registers.getActiveDutyCycle();
    const dutyCycle = this.dutyCycles[index];

    return dutyCycle[this.currentCycle];
  }

  resetLengthCounter() {
    if (this.lengthCounter === 0) {
      this.lengthCounter = 64;
    }
  }
}
