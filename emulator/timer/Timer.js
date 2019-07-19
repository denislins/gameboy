export default class Timer {
  constructor(mmu) {
    this.mmu = mmu;
    this.timerCounter = 0;
    this.dividerCounter = 0;
    this.initRegisters();
  }

  initRegisters() {
    this.controller = this.mmu.registers.get('timerController');
    this.timerRegister = this.mmu.registers.get('timerCounter');
    this.dividerRegister = this.mmu.registers.get('timerDivider');
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
        this.mmu.requestInterrupt('timer');
        this.updateCounterFlag = true;
      }

      this.timerRegister.write(nextValue);
    }
  }

  get timerThreshold() {
    return this.controller.getClockFrequencyInCycles();
  }
}

