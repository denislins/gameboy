import AbstractMemoryRegister from '../AbstractMemoryRegister.js';

export default class TimerControllerRegister extends AbstractMemoryRegister {
  onInit() {
    this.address = 0xFF07;
  }

  getClockFrequency() {
    return this.read() & 3;
  }

  isTimerEnabled() {
    return this.read() & 4;
  }
}
