import BasicSquareChannel from './BasicSquareChannel.js';
import SweepSquareChannelRegisters from './registers/SweepSquareChannelRegisters.js';

export default class SweepSquareChannel extends BasicSquareChannel {
  constructor(mmu) {
    super(mmu);

    this.sweepFrequency = 0;
    this.sweepPeriod = 0;
  }

  execFrequencySweep() {
    if (--this.sweepPeriod <= 0) {
      this.resetSweepPeriod();

      if (this.registers.getSweepPeriod() > 0) {
        const newFrequency = this.calculateFrequencySweep();

        if (newFrequency < 2048) {
          this.sweepFrequency = 2048;
          this.registers.setFrequency(newFrequency);
          this.calculateFrequencySweep();
        }
      }
    }
  }

  // private

  initRegisters(mmu) {
    this.registers = new SweepSquareChannelRegisters(mmu);
  }

  getRegisterWrittenTopic() {
    return 'apu.registers.sweepSquare.written';
  }

  resetSweepRegisters() {
    this.sweepFrequency = this.registers.getFrequency();
    this.resetSweepPeriod();

    if (this.registers.getSweepShift() > 0) {
      this.calculateFrequencySweep();
    }
  }

  resetSweepPeriod() {
    this.sweepPeriod = this.registers.getSweepPeriod();

    // https://gist.github.com/drhelius/3652407#file-game-boy-sound-operation-L431
    if (this.sweepPeriod === 0) {
      this.sweepPeriod = 8;
    }
  }

  calculateFrequencySweep() {
    let newFrequency = this.sweepPeriod >> this.registers.getSweepShift();

    if (this.registers.isSweepNegateEnabled()) {
      newFrequency = this.sweepPeriod - newFrequency;
    } else {
      newFrequency = this.sweepPeriod + newFrequency;
    }

    if (newFrequency > 2047) {
      this.registers.disableChannel();
    }

    return newFrequency;
  }
}
