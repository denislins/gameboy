import Observer from '../Observer.js';

export default class Timer {
  constructor(mmu) {
    this.mmu = mmu;
    this.timerCounter = 0;
    this.dividerCounter = 0;

    this.initRegisters();
    this.initEventHandlers();
  }

  initRegisters() {
    this.controller = this.mmu.registers.get('timerController');
    this.timerRegister = this.mmu.registers.get('timerCounter');
    this.dividerRegister = this.mmu.registers.get('timerDivider');
  }

  initEventHandlers() {
    Observer.on('mmu.registers.timerController.written', (params) => {
      this.resetTimerCounter(params);
    });

    Observer.on('mmu.registers.timerDivider.written', () => {
      this.timerCounter = 0;
    });
  }

  tick(cpuCycles) {
    this.updateDividerRegister(cpuCycles);
    this.updateCounterWithModulator();

    if (this.controller.isTimerEnabled()) {
      this.updateCounterRegister(cpuCycles);
    }
  }

  updateDividerRegister(cpuCycles) {
    this.dividerCounter += cpuCycles;

    if (this.dividerCounter >= 256) {
      const newValue = this.dividerRegister.read() + 1;

      this.dividerRegister.write(newValue);
      this.dividerCounter = this.dividerCounter % 256;
    }
  }

  updateCounterWithModulator() {
    if (this.updateCounterFlag) {
      const modulator = this.mmu.registers.read('timerModulator');

      this.timerRegister.write(modulator);
      this.updateCounterFlag = false;
    }
  }

  updateCounterRegister(cpuCycles) {
    this.timerCounter += cpuCycles;

    while (this.timerCounter >= this.timerThreshold) {
      this.timerCounter = this.timerCounter % this.timerThreshold;

      const nextValue = this.timerRegister.read() + 1;

      if (nextValue > 255) {
        Observer.trigger('interrupts.request', { type: 'timer' });
        this.updateCounterFlag = true;
      }

      this.timerRegister.write(nextValue);
    }
  }

  resetTimerCounter({ newValue, previousValue }) {
    if ((newValue & 3) !== (previousValue & 3)) {
      this.timerCounter = this.timerCounter % this.timerThreshold;
    }
  }

  get timerThreshold() {
    return this.controller.getClockFrequencyInCycles();
  }
}

