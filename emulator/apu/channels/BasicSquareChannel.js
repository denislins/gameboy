import Phaser from '../../common/Phaser.js';
import Observer from '../../common/Observer.js';
import BasicSquareChannelRegisters from './registers/BasicSquareChannelRegisters.js';

export default class BasicSquareChannel {
  constructor(mmu) {
    this.currentCycle = 0;
    this.lengthCounter = 64;
    this.volume = 0;
    this.envelopePeriod = 0;
    this.isEnvelopeEnabled = false;

    this.initRegisters(mmu);
    this.initDutyCycles();
    this.initPhaser();
    this.initEventListeners();
  }

  reset() {
    this.currentCycle = 0;
    this.lengthCounter = 64;
    this.volume = 0;
    this.envelopePeriod = 0;
    this.isEnvelopeEnabled = false;

    this.resetPhaser();
  }

  tick() {
    this.phaser.tick();
  }

  execLengthCounter() {
    if (this.registers.isLengthCounterEnabled() && this.lengthCounter > 0) {
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
    }

    return 0;
  }

  // private

  initRegisters(mmu) {
    this.registers = new BasicSquareChannelRegisters(mmu);
  }

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
    const topic = this.getRegisterWrittenTopic();

    Observer.on(topic, ({ register, value }) => {
      if (register === 'nrx4' && (value & 0x80)) {
        this.enableChannel();
      } else if (register === 'nrx1') {
        this.reloadLengthCounter();
      }
    });
  }

  getRegisterWrittenTopic() {
    return 'apu.registers.basicSquare.written';
  }

  updateCurrentCycle() {
    this.currentCycle = (this.currentCycle + 1) % 8;
    this.resetPhaser();
  }

  enableChannel() {
    this.resetLengthCounter();
    this.resetPhaser();
    this.resetSweepRegisters();

    this.volume = this.registers.getVolume();
    this.envelopePeriod = this.registers.getEnvelopePeriod();

    this.isEnvelopeEnabled = true;
  }

  resetPhaser() {
    const frequency = this.registers.getFrequency();
    const timer = (2048 - frequency) * 4;

    this.phaser.setLimit(timer);
  }

  resetSweepRegisters() {
    // not supported
  }

  isDutyCycleActive() {
    const index = this.registers.getActiveDutyCycle();
    const dutyCycle = this.dutyCycles[index];

    return dutyCycle[this.currentCycle];
  }

  reloadLengthCounter() {
    this.lengthCounter = 64 - this.registers.getLengthCounter();
  }

  resetLengthCounter() {
    if (this.lengthCounter === 0) {
      this.lengthCounter = 64;
    }
  }
}
