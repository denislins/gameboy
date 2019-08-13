import Observer from '../common/Observer.js';
import Phaser from '../common/Phaser.js';

export default class Timer {
  constructor(mmu) {
    this.mmu = mmu;

    this.initRegisters();
    this.initEventHandlers();
    this.initTimerPhaser();
    this.initDividerPhaser();
  }

  tick() {
    this.dividerPhaser.tick();
    this.updateCounterWithModulator();

    if (this.controller.isTimerEnabled()) {
      this.timerPhaser.tick();
    }
  }

  // private

  initRegisters() {
    this.controller = this.mmu.registers.get('timerController');
    this.timerRegister = this.mmu.registers.get('timerCounter');
    this.dividerRegister = this.mmu.registers.get('timerDivider');
  }

  initEventHandlers() {
    Observer.on('mmu.registers.timerController.written', ({ newValue, previousValue }) => {
      this.updateCounterThreshold(newValue, previousValue);
    });

    Observer.on('mmu.registers.timerDivider.written', () => {
      this.timerPhaser.reset();
    });
  }

  initTimerPhaser() {
    this.timerPhaser = new Phaser(1024);
    this.timerPhaser.whenFinished(() => this.updateCounterRegister());
  }

  initDividerPhaser() {
    this.dividerPhaser = new Phaser(256);
    this.dividerPhaser.whenFinished(() => this.updateDividerRegister());
  }

  updateCounterRegister() {
    const nextValue = this.timerRegister.read() + 1;

    if (nextValue > 255) {
      Observer.trigger('interrupts.request', { type: 'timer' });
      this.updateCounterFlag = true;
    }

    this.timerRegister.write(nextValue);
  }

  updateDividerRegister() {
    const newValue = this.dividerRegister.read() + 1;
    this.dividerRegister.write(newValue);
  }

  updateCounterWithModulator() {
    if (this.updateCounterFlag) {
      const modulator = this.mmu.registers.read('timerModulator');

      this.timerRegister.write(modulator);
      this.updateCounterFlag = false;
    }
  }

  updateCounterThreshold(newValue, previousValue) {
    if ((newValue & 3) !== (previousValue & 3)) {
      const threshold = this.controller.getClockFrequencyInCycles();
      this.timerPhaser.setLimit(threshold);
    }
  }
}
