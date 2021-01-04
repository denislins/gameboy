import Phaser from '../common/Phaser.js';

export default class FrameSequencer {
  constructor() {
    this.callbacks = {
      lengthCounter: () => {},
      volumeEnvelope: () => {},
      frequencySweep: () => {},
    };

    this.phaser = new Phaser(262144);
    this.phaser.when(32768, () => {
      this.callbacks.lengthCounter();
    });

    this.phaser.when(98304, () => {
      this.callbacks.frequencySweep();
      this.callbacks.lengthCounter();
    });

    this.phaser.when(163840, () => {
      this.callbacks.lengthCounter();
    });

    this.phaser.when(229376, () => {
      this.callbacks.frequencySweep();
      this.callbacks.lengthCounter();
    });

    this.phaser.whenFinished(() => {
      this.callbacks.volumeEnvelope();
    });
  }

  tick() {
    this.phaser.tick();
  }

  reset() {
    const cycles = this.phaser.cycles % 32768;
    this.phaser.setCycles(cycles);
  }

  onLengthCounter(callback) {
    this.callbacks.lengthCounter = callback;
  }

  onVolumeEnvelope(callback) {
    this.callbacks.volumeEnvelope = callback;
  }

  onFrequencySweep(callback) {
    this.callbacks.frequencySweep = callback;
  }
}
