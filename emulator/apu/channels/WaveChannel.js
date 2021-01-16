import Phaser from '../../common/Phaser.js';
import Observer from '../../common/Observer.js';
import WaveChannelRegisters from './registers/WaveChannelRegisters.js';

export default class WaveChannel {
  constructor(mmu) {
    this.mmu = mmu;
    this.registers = new WaveChannelRegisters(mmu);

    this.volume = 0;
    this.currentPosition = 0;

    this.initPhaser();
    this.initEventListeners();
  }

  reset() {
    this.volume = 0;
    this.lengthCounter = 0;
    this.currentPosition = 0;

    this.resetPhaser();
  }

  tick() {
    this.phaser.tick();
  }

  execLengthCounter() {
    if (!this.registers.isLengthCounterEnabled()) {
      return;
    }

    const lengthCounter = this.registers.getLengthCounter();

    if (lengthCounter > 0) {
      this.registers.setLengthCounter(--lengthCounter);

      if (lengthCounter === 0) {
        this.registers.disableChannel();
      }
    }
  }

  execFrequencySweep() {
    // not supported
  }

  execVolumeEnvelope() {
    // not supported
  }

  generateSample() {
    if (this.registers.isChannelEnabled()) {
      return this.volume / 45;
    }

    return 0;
  }

  // private

  initPhaser() {
    this.phaser = new Phaser(0);
    this.phaser.whenFinished(() => this.updateSample());
  }

  initEventListeners() {
    Observer.on('apu.registers.wave.written', ({ register, value }) => {
      this.enable(value);
    });
  }

  resetPhaser() {
    const frequency = this.registers.getFrequency();
    const timer = (2048 - frequency) * 2;

    this.phaser.setLimit(timer);
  }

  updateSample() {
    this.currentPosition = (this.currentPosition + 1) % 32;

    const sample = this.getSample();
    const volumeAdjustment = this.registers.getVolumeAdjustment();

    this.volume = sample >> volumeAdjustment;
    this.resetPhaser();
  }

  getSample() {
    const address = 0xFF30 + Math.floor(this.currentPosition / 2);
    const value = this.mmu.forceRead(address);

    if (value % 2 === 0) {
      return value >> 4;
    }

    return value & 0xF;
  }

  enable(value) {
    if (value & 0x80) {
      this.resetLengthCounter();
      this.resetPhaser();
      this.currentPosition = 0;
    }
  }

  resetLengthCounter() {
    const lengthCounter = this.registers.getLengthCounter();

    if (lengthCounter === 0) {
      this.registers.setLengthCounter(255);
    }
  }
}
