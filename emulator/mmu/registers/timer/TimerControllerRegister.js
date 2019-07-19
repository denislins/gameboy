import AbstractMemoryRegister from '../AbstractMemoryRegister.js';

export default class TimerControllerRegister extends AbstractMemoryRegister {
  onInit() {
    this.address = 0xFF07;
    this.frequencies = [1024, 16, 64, 256];
  }

  writeFromBus(value) {
    if ((value & 3) === (this.read() & 3)) {
      return;
    }

    this.write(value);

    window.timer.timerCounter = window.timer.timerCounter % this.getClockFrequencyInCycles();
  }

  getClockFrequencyInCycles() {
    const index = this.read() & 3;
    return this.frequencies[index];
  }

  isTimerEnabled() {
    return this.read() & 4;
  }
}
